import { Component, OnInit } from "@angular/core";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { ToolsService } from "../../services/tools.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent extends ToolsService implements OnInit {
  profile: any;
  constructor(private apollo: Apollo) {
    super();
  }

  getUserProfile() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getUser(args: { _id: "${this.currentUser}" }) {
              _id
              data {
                profileImg
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(({ data }) => {
        this.profile = data["getUser"];
      });
  }

  ngOnInit() {
    this.getUserProfile();
  }
}
