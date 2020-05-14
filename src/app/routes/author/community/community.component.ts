import { Component, OnInit, Input } from "@angular/core";
import { Apollo } from "apollo-angular";
import { StaticDataService } from "src/app/services/static.service";
import { CommunityPost } from "src/app/services/interface.service";

@Component({
  selector: "author-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"],
})
export class CommunityComponent implements OnInit {
  @Input()
  id: any;
  posts: Array<CommunityPost>;

  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: this.staticDataService.authorQuery.community(this.id),
      })
      .valueChanges.subscribe(({ data }) => {
        this.posts = data["getUser"]["data"]["community"];
      });
  }
}
