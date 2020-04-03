import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.scss"]
})
export class AuthorComponent implements OnInit {
  routes = {
    ravel: true,
    collection: false,
    community: false,
    story: false,
    merchandise: false
  };

  constructor() {}

  ngOnInit(): void {}
}
