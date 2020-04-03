import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ToolsService } from '../tools.service';

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"]
})
export class ExploreComponent extends ToolsService implements OnInit {
  explore: any;

  constructor(private apollo: Apollo) {
    super();
  }

  getExplore() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getExplore {
              tags
              publications {
                name
                followers {
                  _id
                }
                members {
                  _id
                }
                featuredImg
              }
              creators {
                _id
                data {
                  name
                  followers {
                    _id
                  }
                  profileImg
                  coverImg
                }
              }
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
          }
        `
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.explore = data["getExplore"];
      });
  }

  ngOnInit(): void {
    this.getExplore();
  }
}
