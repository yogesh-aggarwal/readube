import { Component, OnInit } from "@angular/core";
import { DataSyncService } from "../data-sync.service";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"]
})

/*
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

*/
export class TrendingComponent extends DataSyncService implements OnInit {
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
        console.log(this.trending);
      });
  }

  ngOnInit(): void {
    this.getTrending();
  }
}
