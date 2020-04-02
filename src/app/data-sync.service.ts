import { Injectable } from "@angular/core";
import { ToolsService } from "./tools.service";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class DataSyncService extends ToolsService {
  newRavels: any;
  userRecommendations: any;
  trending: any;
  explore: any;

  constructor() {
    super();
  }

  async query(query, _callback, method = "GET") {
    const xhr = new XMLHttpRequest();
    try {
      xhr.open(method, `http://localhost/?query=${query}`, true);
      xhr.onload = function() {
        if (this.status === 200) {
          _callback(this);
        }
      };
      xhr.send();
    } catch {}
  }

  private parsePosts(posts) {
    posts.forEach(post => {
      post.dateUpdated = this.getCardDate(post.dateUpdated);
    });
    return posts;
  }

  async getNewRavels() {
    this.query(
      `{ getNewRavels { _id, title, thumbnail, readTime, dateUpdated, tags credit { author { _id, data { name, profileImg } } } } }`,
      ({ responseText }) => {
        const posts = JSON.parse(responseText)["data"]["getNewRavels"];
        this.newRavels = this.parsePosts(posts);
        return this.newRavels;
      }
    );
  }

  async getUserRecommendations() {
    this.query(
      `{ getUserRecommendations { _id, title, thumbnail, readTime, dateUpdated, tags credit { author { _id, data { name, profileImg } } } } }`,
      ({ responseText }) => {
        const posts = JSON.parse(responseText)["data"][
          "getUserRecommendations"
        ];
        this.userRecommendations = this.parsePosts(posts);
        return this.userRecommendations;
      }
    );
  }

  async getTrending() {}

  async getExplore() {}
}
