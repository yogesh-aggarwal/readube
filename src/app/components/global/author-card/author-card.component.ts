import { Component, OnInit, Input } from "@angular/core";
import { ToolsService } from "src/app/tools.service";

@Component({
  selector: "author-card",
  templateUrl: "./author-card.component.html",
  styleUrls: ["./author-card.component.scss"],
})
export class AuthorCardComponent extends ToolsService implements OnInit {
  @Input()
  card: any;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
