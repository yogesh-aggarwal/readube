import { Component, OnInit, Input } from "@angular/core";

//& API
import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

@Component({
  selector: "author-ravel",
  templateUrl: "./ravel.component.html",
  styleUrls: ["./ravel.component.scss"],
})
export class RavelComponent implements OnInit {
  @Input()
  id: any;
  categories: any;
  constructor(private apollo: Apollo) {}

  getCategories() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getUser(args: { _id: "${this.id}" }) {
            _id
            data {
              posts {
                categories {
                  name
                  posts {
                    _id
                    title
                    thumbnail
                    readTime
                    dateUpdated
                    tags
                  }
                }
              }
            }
          }
        }
        `,
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.categories = data["getUser"]["data"]["posts"]["categories"];
      });
  }

  ngOnInit() {
    this.getCategories();
  }
}
