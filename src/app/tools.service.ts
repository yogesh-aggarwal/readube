import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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
}
