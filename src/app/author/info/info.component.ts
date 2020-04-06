import { Component, OnInit, Input } from "@angular/core";

//& API
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

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

  constructor(private apollo: Apollo) {}

  getUserProfile() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getUser(args: { _id: "${this.id}" }) { 
            _id
            data {
              name
              bio
              profileImg
              coverImg
              stats {
                reach
                appreciations
              }
              memberOf {
                _id
                name
              }
              followers {
                _id
              }
              following {
                _id
              }
              posts {
                posts {
                  _id
                }
              }
              socialLinks
            }
          }
        }
      `,
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
