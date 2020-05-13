import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { StaticDataService } from "src/app/services/static.service";
import { Collection } from "src/app/services/interface.service";
import { ToolsService } from "src/app/services/tools.service";

@Component({
  selector: "app-collection-view",
  templateUrl: "./collection-view.component.html",
  styleUrls: ["./collection-view.component.scss"],
})
export class CollectionViewComponent extends ToolsService implements OnInit {
  id: string;
  collection: Collection = {};

  constructor(
    private apollo: Apollo,
    private router: Router,
    private staticDataService: StaticDataService
  ) {
    super();
  }

  getCollection() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.collection.collection(this.id),
      })
      .valueChanges.subscribe(({ data }) => {
        this.collection = data["getCollection"];
        console.log(this.collection);
      });
  }

  getDate(timestamp: any) {
    let date = new Date(+timestamp);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;
  }

  ngOnInit(): void {
    this.id = this.router.url.split("/")[2];
    this.getCollection();
  }
}
