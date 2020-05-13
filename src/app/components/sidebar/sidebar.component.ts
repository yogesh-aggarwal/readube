import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

interface routes {
  home: boolean;
  trending: boolean;
  explore: boolean;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  routes: routes = {
    home: false,
    explore: false,
    trending: false,
  };
  constructor(private router: Router) {}

  setRoute(name: string) {
    for (let route in this.routes) {
      this.routes[route] = route == name ? true : false;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((r) => {
      if (r instanceof NavigationEnd) {
        let end = r.url.split("/")[1];

        switch (end) {
          case "":
            this.setRoute("home");
            break;
          case "explore":
            this.setRoute("explore");
            break;
          case "trending":
            this.setRoute("trending");
            break;

          default:
            this.setRoute("");
            break;
        }
      }
    });
  }
}
