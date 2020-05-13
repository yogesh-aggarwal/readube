import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  currentUser: any;
  constructor() {
    this.getCurrentUserId();
  }

  getCardDate(timestamp) {
    let date = new Date(Number(timestamp));
    return `${date.getUTCDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getUTCFullYear()}`;
  }

  parsePosts(posts) {
    posts.forEach((post) => {
      post.dateUpdated = this.getCardDate(post.dateUpdated);
    });
    return posts;
  }

  getCurrentUserId() {
    this.currentUser = "5e8476a0d955be31f8ffeb05";
    return this.currentUser;
  }

  isObjEmpty(obj: Object | object) {
    return !Object.keys(obj);
  }

  isLoggedinUser(uid) {
    return uid == this.getCurrentUserId();
  }
}
