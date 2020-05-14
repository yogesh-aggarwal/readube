import { Component, OnInit, Input } from "@angular/core";
import { CommunityPost } from "src/app/services/interface.service";

@Component({
  selector: "community-post-card",
  templateUrl: "./community-post-card.component.html",
  styleUrls: ["./community-post-card.component.scss"],
})
export class CommunityPostCardComponent implements OnInit {
  @Input("post")
  post: CommunityPost;
  constructor() {}

  ngOnInit(): void {}
}
