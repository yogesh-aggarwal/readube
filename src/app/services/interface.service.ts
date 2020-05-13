import { Injectable } from "@angular/core";

export interface Post {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  readTime?: string;
  comments?: Array<string>;
  tags?: Array<string>;
  stats?: Array<string>;
  credit?: Array<string>;
  datePublished?: number | Date | String;
  dateUpdated?: number | Date | String;
}

export interface Collection {
  _id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  tags?: Array<string>;
  posts?: Array<Post>;
  dateCreated?: Date | String;
  dateUpdated?: Date | String;
}

@Injectable({
  providedIn: "root",
})
export class InterfaceService {
  constructor() {}
}
