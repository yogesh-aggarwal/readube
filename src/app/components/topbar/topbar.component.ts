import { Component, OnInit } from "@angular/core";
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { ToolsService } from "../../services/tools.service";
import { Router, NavigationEnd } from "@angular/router";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent extends ToolsService implements OnInit {
  currentRoute: string;
  profile: any;
  publishEnabled: boolean = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private dataService: DataService
  ) {
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

  publish() {
    this.dataService.article.next({
      publishArticle: true,
      haveContent: true,
      working: true,
    });
  }

  ngOnInit() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.currentRoute = route.url.split("/")[1];
      }
    });
    this.getUserProfile();

    this.dataService.article.subscribe(({ haveContent, working }) => {
      this.publishEnabled = haveContent && !working;
    });
  }
}
