import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { StaticDataService } from "src/app/static.service";

@Component({
  selector: "app-collection-view",
  templateUrl: "./collection-view.component.html",
  styleUrls: ["./collection-view.component.scss"],
})
export class CollectionViewComponent implements OnInit {
  id: string;
  collection: any;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private staticDataService: StaticDataService
  ) {}

  getCollection() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.collection.collection(this.id),
      })
      .valueChanges.subscribe(({ data }) => {
        this.collection = data["getCollection"];
      });
  }

  ngOnInit(): void {
    this.id = this.router.url.split("/")[2];
    this.getCollection();
  }
}
