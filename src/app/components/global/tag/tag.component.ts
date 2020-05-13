import { Component, Input } from "@angular/core";

@Component({
  selector: "tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.scss"],
})
export class TagComponent {
  @Input()
  tag: String;
  constructor() {}
}
