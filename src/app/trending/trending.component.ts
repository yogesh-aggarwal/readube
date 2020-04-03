import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ToolsService } from "../tools.service";

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"]
})
export class TrendingComponent extends ToolsService implements OnInit {
  trending: any;

  constructor(private apollo: Apollo) {
    super();
  }

  getTrending() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getTrending {
              _id
              tags
              categories {
                name
                posts {
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
              creators {
                _id
                data {
                  name
                  profileImg
                  coverImg
                  posts {
                    featuredPosts {
                      title
                      thumbnail
                    }
                  }
                }
              }
            }
          }
        `
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.trending = data["getTrending"];
      });
  }

  ngOnInit(): void {
    this.getTrending();
  }
}
