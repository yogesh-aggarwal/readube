import { Injectable } from "@angular/core";
import { ToolsService } from "./tools.service";

import gql from "graphql-tag";
import { Apollo } from "apollo-angular";

@Injectable({
  providedIn: "root"
})
export class DataSyncService extends ToolsService {
  constructor() {
    super();
  }
}
