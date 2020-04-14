import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: "author-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit {
  @Input()
  id: any;

  stories: any;
  constructor(private apollo: Apollo) {}

  getStories() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getUser(args: { _id: "${this.id}" }) {
            _id
            data {
              stories {
                _id
                content
              }
            }
          }
        }
        `,
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.stories = data["getUser"]["data"]["stories"];

      });
  }

  ngOnInit() {
    this.getStories();
  }
}
