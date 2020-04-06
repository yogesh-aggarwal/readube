import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToolsService } from "../tools.service";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.scss"],
})
export class AuthorComponent implements OnInit {
  routes = {
    ravel: true,
    collection: false,
    community: false,
    story: false,
    merchandise: false,
  };
  uid: any;

  constructor(router: Router) {
    router.events.subscribe((route) => {
      const routes = route;
      if (route["urlAfterRedirects"]) {
        const segment = routes["urlAfterRedirects"].split("/");
        if (segment[1] == "author") {
          const route = segment[segment.length - 1];
          // Set all other routes to false
          Object.keys(this.routes).forEach((v) => (this.routes[v] = false));
          // Selectively enable route
          this.uid = segment[segment.length - 2];
          switch (route) {
            case "collections":
              this.routes.collection = true;
              break;
            case "community":
              this.routes.community = true;
              break;
            case "stories":
              this.routes.story = true;
              break;
            case "merchandises":
              this.routes.merchandise = true;
              break;

            default:
              this.uid = route;
              this.routes.ravel = true;
          }
        }
      }
    });
  }

  ngOnInit(): void {}
}
