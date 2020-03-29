import { Component, OnInit } from "@angular/core";
import { DataSyncService } from '../data-sync.service';

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"]
})
export class TrendingComponent extends DataSyncService implements OnInit {
  constructor() {super()}

  ngOnInit(): void {
    this.getTrending();
  }
}
