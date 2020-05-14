import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  currentUser: any;
  months: Array<string> = ["Jan", "Feb"];

  constructor() {
    this.getCurrentUserId();
  }

  getHoursMinutes(timestamp: string | number | Date): string {
    const date = new Date(+timestamp);
    return date.getHours() + ":" + date.getMinutes();
  }

  getCardDate(timestamp: number | string | Date, time = false): string {
    let date = new Date(+timestamp);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;
  }

  parsePosts(posts) {
    posts.forEach((post) => {
      post.dateUpdated = this.getCardDate(post.dateUpdated);
    });
    return posts;
  }

  getMonth(index) {
    return this.months[index];
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
