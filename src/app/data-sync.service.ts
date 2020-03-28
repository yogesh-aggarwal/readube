import { Injectable } from "@angular/core";
import { ToolsService } from "./tools.service";

@Injectable({
  providedIn: "root"
})
export class DataSyncService extends ToolsService {
  newRavels: any;
  userRecommendations: any;

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

  private async getHome(func, data, quantity = 3) {
    this.query(
      `query { ${func}(args: {uid: "", quantity: ${quantity}}) {_id, title, thumbnail, tags, datePublished, readTime, credit {author}} }`,
      async req => {
        const posts = JSON.parse(req.responseText)["data"][func];
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
              author = JSON.parse(reqUser.responseText)["data"]["getUser"][
                "data"
              ];
              posts[postIndex].credit.author = author;
            }
          );
        }
        switch (data) {
          case "newRavels":
            this.newRavels = posts;
            break;
          case "userRecommendations":
            this.userRecommendations = posts;
            break;

          default:
            break;
        }
      }
    );
  }

  async getNewRavels() {
    return await this.getHome("getNewRavels", "newRavels");
  }

  async getUserRecommendations() {
    return await this.getHome("getUserRecommendations", "userRecommendations");
  }
}
