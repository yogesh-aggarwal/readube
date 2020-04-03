import { Component, OnInit } from "@angular/core";

import gql from "graphql-tag";
import { Apollo } from "apollo-angular";
import { ToolsService } from '../tools.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent extends ToolsService implements OnInit {
  newRavels: any;
  userRecommendations: any;

  constructor(private apollo: Apollo) {
    super();
  }

  getNewRavels() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getNewRavels {
              _id
              title
              thumbnail
              readTime
              dateUpdated
              tags
              credit {
                author {
                  _id
                  data {
                    name
                    profileImg
                  }
                }
              }
            }
          }
        `
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.newRavels = data["getNewRavels"];
      });
  }

  getUserRecommendations() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getUserRecommendations {
              _id
              title
              thumbnail
              readTime
              dateUpdated
              tags
              credit {
                author {
                  _id
                  data {
                    name
                    profileImg
                  }
                }
              }
            }
          }
        `
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
