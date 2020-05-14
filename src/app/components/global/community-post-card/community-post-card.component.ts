import { Component, OnInit, Input } from "@angular/core";
import { CommunityPost } from "src/app/services/interface.service";
import { ToolsService } from "src/app/services/tools.service";

@Component({
  selector: "community-post-card",
  templateUrl: "./community-post-card.component.html",
  styleUrls: ["./community-post-card.component.scss"],
})
export class CommunityPostCardComponent extends ToolsService implements OnInit {
  @Input("post")
  post: CommunityPost;

  ngOnInit(): void {}
}
