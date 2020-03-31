import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "publication-card",
  templateUrl: "./publication-card.component.html",
  styleUrls: ["./publication-card.component.scss"]
})
export class PublicationCardComponent implements OnInit {
  @Input()
  card: any;
  constructor() {}

  ngOnInit(): void {}
}
