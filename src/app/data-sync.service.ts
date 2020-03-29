import { Injectable } from "@angular/core";
import { ToolsService } from "./tools.service";

@Injectable({
  providedIn: "root"
})
export class DataSyncService extends ToolsService {
  newRavels: any;
  userRecommendations: any;
  trending;

  constructor() {
    super();
  }

  async query(query, _callback, method = "GET") {
    const xhr = new XMLHttpRequest();
    try {
      xhr.open(method, `http://localhost/?query=${query}`, true);
      xhr.onload = function() {
        if (this.status === 200) {
          _callback(this);
        }
      };
      xhr.send();
    } catch {}
  }

  private async postIdDataToObject(posts, _callback?) {
    var author;
    for (let postIndex of posts) {
      await this.query(
        `query { getUser(args: {_id: "${postIndex.credit.author}"}) {data {name, profileImg}} }`,
        reqUser => {
          //& Published date
          postIndex.datePublished = this.getCardDate(postIndex.datePublished);
          //& Updated date
          postIndex.dateUpdated = this.getCardDate(postIndex.dateUpdated);
          //& Author
          author = JSON.parse(reqUser.responseText)["data"]["getUser"]["data"];
          postIndex.credit.author = author;
        }
      );
      if (_callback) _callback(posts);
      return posts;
    }
  }

  private async getHome(func, data, quantity = 3) {
    this.query(
      `query { ${func}(args: {uid: "", quantity: ${quantity}}) {_id, title, thumbnail, tags, datePublished, readTime, credit {author}} }`,
      req => {
        this.postIdDataToObject(
          JSON.parse(req.responseText)["data"][func],
          r => {
            switch (data) {
              case "newRavels":
                this.newRavels = r;
                break;
              case "userRecommendations":
                this.userRecommendations = r;
                break;

              default:
                break;
            }
          }
        );
      }
    );
  }

  async getNewRavels() {
    return await this.getHome("getNewRavels", "newRavels");
  }

  async getUserRecommendations() {
    return await this.getHome("getUserRecommendations", "userRecommendations");
  }

  async getTrending() {
    this.query(
      `query { getTrending {tags, featured {topics, posts}, featuredCreators, date} }`,
      async req => {
        const res = JSON.parse(req.responseText)["data"]["getTrending"];

        const categoryPosts = res["featured"]["posts"];

        let final = [];
        for (let categoryPost of categoryPosts) {
          let finalCategoryPost = [];
          for (let post of categoryPost) {
            await this.query(
              `query { getPost(args: { _id: "${post}" } ) { _id, title, thumbnail, tags, datePublished, readTime, credit {author} } }`,
              res => {
                this.postIdDataToObject(
                  [JSON.parse(res.responseText)["data"]["getPost"]],
                  r => {
                    finalCategoryPost.push(r[0]);
                  }
                );
              }
            );
          }
          final.push(finalCategoryPost);
        }
        res["featured"]["posts"] = final;

        let creators = [];
        for (let creator of res["featuredCreators"]) {
          await this.query(
            `query { getFeaturedUser(args:{_id:"${creator}"}) {_id, data {name, profileImg, posts {featuredPosts}}} }`,
            res => {
              creators.push(
                JSON.parse(res.responseText)["data"]["getFeaturedUser"]
              );
              console.log(creators);
            }
          );
        }
        res["featuredCreators"] = creators;
        this.trending = res;
        console.log(this.trending);
      }
    );
  }
}
