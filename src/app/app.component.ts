import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "ravel";

  ngOnInit() {
    (document.querySelector(".container") as HTMLElement).focus();
  }
}
