import { Component, OnInit, Input } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { StaticDataService } from "src/app/services/static.service";

@Component({
  selector: "author-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit {
  @Input()
  id: any;

  stories: any;
  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {}

  getStories() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.authorQuery.story(this.id),
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.stories = data["getUser"]["data"]["stories"];
      });
  }

  ngOnInit() {
    this.getStories();
  }
}
