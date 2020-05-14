import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.scss"],
})
export class WriteComponent implements OnInit {
  elements: Array<any>;
  textChange: Subject<any> = new Subject();

  constructor() {
    this.analyse();
  }

  analyse() {
    this.textChange.subscribe(($event) => {
      console.log($event);
    });
  }

  ngOnInit(): void {}
}
