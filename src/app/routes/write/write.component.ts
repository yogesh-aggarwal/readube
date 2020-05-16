import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import EditorJs from "@editorjs/editorjs";
const Header = require("@editorjs/header");
const List = require("@editorjs/list");
const Paragraph = require("@editorjs/paragraph");

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.scss"],
})
export class WriteComponent implements OnInit {
  ngOnInit(): void {
    let editor = new EditorJs({
      hideToolbar: false,
      initialBlock: "header",
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+H",
          config: {
            placeholder: "Heading",
            defaultLevel: 1,
          },
        },
        paragraph: {
          class: Paragraph,
          shortcut: "CMD+P",
          config: {
            placeholder: "",
            defaultLevel: 1,
          },
        },
        list: {
          class: List,
          shortcut: "CMD+O+L",
        },
      },
    });
  }
}
