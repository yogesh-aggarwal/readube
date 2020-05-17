import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  publish: ReplaySubject<any> = new ReplaySubject();

  constructor() {
    this.publish.next({ publish: false });
  }
}
