import { Component, OnInit } from "@angular/core";

import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { ToolsService } from "../../tools.service";
import { DataService } from "src/app/data.service";
import { StaticDataService } from "src/app/static.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent extends ToolsService implements OnInit {
  newRavels: any;
  userRecommendations: any;

  constructor(
    private apollo: Apollo,
    private dataService: DataService,
    private staticDataService: StaticDataService
  ) {
    super();
  }

  getNewRavels() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.homeQuery.newRavels,
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.newRavels = data["getNewRavels"];
      });
  }

  getUserRecommendations() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.homeQuery.userRecommendations,
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.userRecommendations = data["getUserRecommendations"];
      });
  }

  ngOnInit() {
    this.getNewRavels();
    this.getUserRecommendations();
  }
}
