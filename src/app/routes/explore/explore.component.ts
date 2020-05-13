import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ToolsService } from "../../tools.service";
import { StaticDataService } from "src/app/static.service";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"],
})
export class ExploreComponent extends ToolsService implements OnInit {
  explore: any;

  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {
    super();
  }

  getExplore() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.exploreQuery.explore,
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.explore = data["getExplore"];
      });
  }

  ngOnInit(): void {
    this.getExplore();
  }
}
