import { Component, OnInit, Input } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { StaticDataService } from "src/app/static.service";

@Component({
  selector: "author-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {
  @Input()
  id: any;
  collections: any;

  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {}

  getCollections() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.authorQuery.collection(this.id),
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.collections = data["getUser"]["data"]["collections"];
        this.collections.forEach((collection: any) => {
          collection.readTime = `${collection.posts.length} posts`;
          delete collection.posts;
        });
      });
  }

  ngOnInit() {
    this.getCollections();
  }
}
