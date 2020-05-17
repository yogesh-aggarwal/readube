import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  article: ReplaySubject<any> = new ReplaySubject();

  constructor() {
    this.article.next({
      publishArticle: false,
      haveContent: false,
      working: false,
    });
  }
}
