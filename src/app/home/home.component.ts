import { Component, OnInit } from "@angular/core";
import { DataSyncService } from "../data-sync.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent extends DataSyncService implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getNewRavels();
    this.getUserRecommendations();

    this
  }
}
