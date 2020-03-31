import { Component, OnInit } from "@angular/core";
import { DataSyncService } from "../data-sync.service";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"]
})
export class ExploreComponent extends DataSyncService implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getExplore();
  }
}
