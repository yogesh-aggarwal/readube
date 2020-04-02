import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ToolsService {
  constructor() {}

  getCardDate(timestamp) {
    let date = new Date(Number(timestamp));
    return `${date.getUTCDate()} ${date.toLocaleString("default", {
      month: "short"
    })}, ${date.getUTCFullYear()}`;
  }

  parsePosts(posts) {
    posts.forEach(post => {
      post.dateUpdated = this.getCardDate(post.dateUpdated);
    });
    return posts;
  }
}
