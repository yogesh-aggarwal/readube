import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ToolsService } from "../../services/tools.service";
import { StaticDataService } from "src/app/services/static.service";

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"],
})
export class TrendingComponent extends ToolsService implements OnInit {
  trending: any;

  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {
    super();
  }

  getTrending() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.trendingQuery.trending,
      })
      .valueChanges.subscribe(({ data }) => {
        this.trending = data["getTrending"];
      });
  }

  ngOnInit(): void {
    this.getTrending();
  }
}
