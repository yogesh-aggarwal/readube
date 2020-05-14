import { Injectable } from "@angular/core";

export interface User {}

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
  datePublished?: number | Date | string;
  dateUpdated?: number | Date | string;
}

export interface CommunityPost {
  _id?: string;
  content?: string;
  owner?: User;
  datePublished?: number | Date | string;
}

export interface Collection {
  _id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  tags?: Array<string>;
  posts?: Array<Post>;
  dateCreated?: Date | string;
  dateUpdated?: Date | string;
}

@Injectable({
  providedIn: "root",
})
export class InterfaceService {
  constructor() {}
}
