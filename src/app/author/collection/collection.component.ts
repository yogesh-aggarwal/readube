import { Component, OnInit, Input } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "author-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {
  @Input()
  id: any;
  collections: any;

  constructor(private apollo: Apollo) {}

  getCollections() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getUser(args: { _id: "${this.id}" }) {
            _id
            data {
              collections {
                title
                thumbnail
                dateUpdated
                tags
                posts {
                  _id
                }
              }
            }
          }
        }
        `,
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.collections = data["getUser"]["data"]["collections"];
        this.collections.forEach((collection) => {
          collection.readTime = `${collection.posts.length} posts`;
          delete collection.posts;
        });
      });
  }

  ngOnInit() {
    this.getCollections();
  }
}
