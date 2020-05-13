import { Component, OnInit, Input } from "@angular/core";

//& API
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { StaticDataService } from "src/app/static.service";

@Component({
  selector: "author-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
  @Input()
  id: any;
  profile: any;

  pubShow = 1;

  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {}

  getUserProfile() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.authorQuery.info(this.id),
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.profile = data["getUser"];
        delete this.profile.data.stats.__typename;
      });
  }

  ngOnInit() {
    this.getUserProfile();
  }
}
