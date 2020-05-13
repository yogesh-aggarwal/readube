import { Component, OnInit, Input } from "@angular/core";
import { Apollo } from "apollo-angular";
import { StaticDataService } from "src/app/services/static.service";

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
        query: this.staticDataService.authorQuery.collections(this.id),
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.collections = data["getUser"]["data"]["collections"];
        this.collections.forEach((collection: any) => {
          collection.route = ["/collection", collection._id];
          collection.readTime = `${collection.posts.length} posts`;
        });
      });
  }

  ngOnInit() {
    this.getCollections();
  }
}
