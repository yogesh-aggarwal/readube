import { Injectable } from "@angular/core";
import { ToolsService } from "./tools.service";

@Injectable({
  providedIn: "root"
})
export class DataSyncService extends ToolsService {
  newRavels: any;
  userRecommendations: any;
  trending: any;
  explore: any;

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
    for (let postIndex in posts) {
      await this.query(
        `query { getUser(args: {_id: "${posts[postIndex].credit.author}"}) {data {name, profileImg}} }`,
        reqUser => {
          //& Published date
          posts[postIndex].datePublished = this.getCardDate(
            posts[postIndex].datePublished
          );
          //& Updated date
          posts[postIndex].dateUpdated = this.getCardDate(
            posts[postIndex].dateUpdated
          );
          //& Author
          author = JSON.parse(reqUser.responseText)["data"]["getUser"]["data"];
          posts[postIndex].credit.author = author;
        }
      );
      if (Number(postIndex) == posts.length - 1) {
        if (_callback) _callback(posts);
        return posts;
      }
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
        for (let creator in res["featuredCreators"]) {
          await this.query(
            `query { getFeaturedUser(args:{_id:"${res["featuredCreators"][creator]}"}) {_id, data {name, profileImg, posts {featuredPosts}}} }`,
            async r => {
              let fCreator = JSON.parse(r.responseText)["data"][
                "getFeaturedUser"
              ];
              let posts = [];
              for (let post of fCreator["data"]["posts"]["featuredPosts"]) {
                await this.query(
                  ` query { getPost(args: { _id: "${post}" }) { _id, title, thumbnail, tags } } `,
                  post => {
                    posts.push(
                      JSON.parse(post.responseText)["data"]["getPost"]
                    );
                  }
                );
              }
              fCreator["data"]["posts"]["featuredPosts"] = posts;

              creators.push(fCreator);

              if (Number(creator) == creator.length - 1) {
                res["featuredCreators"] = creators;
                this.trending = res;
                console.log(this.trending);
              }
            }
          );
        }
      }
    );
  }

  async getExplore() {
    this.query(
      `query { getExplore { tags, publications, creators, posts } }`,
      async req => {
        const data = JSON.parse(req.responseText)["data"]["getExplore"];

        //& Getting posts
        let posts = [];
        for (let post of data.posts) {
          await this.query(
            `query { getPost(args: { _id: "${post}" }) {_id, title, thumbnail, tags, datePublished, readTime, credit {author}} }`,
            async r => {
              post = JSON.parse(r.responseText)["data"]["getPost"];
              await this.postIdDataToObject([post], post => {
                posts.push(post[0]);
              });
            }
          );
        }
        data["posts"] = posts;

        //& Getting publications
        let publications = [];
        for (let publication of data.publications) {
          await this.query(
            `query { getPublication(args: { _id: "${publication}" }) { _id, name, followers, members, featuredImg } }`,
            r => {
              publication = JSON.parse(r.responseText)["data"][
                "getPublication"
              ];
              publication["followers"] = publication["followers"].length;
              publication["members"] = publication["members"].length;
              publications.push(publication);
            }
          );
        }
        data["publications"] = publications;

        //& Getting creators
        let creators = [];
        for (let creator of data.creators) {
          await this.query(
            `query { getUser(args: { _id: "${creator}" }) { _id, data { name, followers, profileImg, coverImg } } }`,
            r => {
              creator = JSON.parse(r.responseText)["data"]["getUser"];
              creators.push({
                _id: creator._id,
                name: creator["data"]["name"],
                followers: creator["data"]["followers"].length,
                profileImg: creator["data"]["profileImg"],
                coverImg: creator["data"]["coverImg"],
              });
            }
          );
        }
        data["creators"] = creators;

        this.explore = data;
        console.log(data);
      }
    );
  }
}
