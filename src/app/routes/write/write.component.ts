import { Component, OnInit } from "@angular/core";
import EditorJs from "@editorjs/editorjs";
import { DataService } from "src/app/services/data.service";

/// Editor tools
const Header = require("@editorjs/header");
const Paragraph = require("@editorjs/paragraph");
const ImageTool = require("@editorjs/image");
const Embed = require("@editorjs/embed");
const Quote = require("@editorjs/quote");
const Marker = require("@editorjs/marker");
const CodeTool = require("@editorjs/code");
const LinkTool = require("@editorjs/link");
const List = require("@editorjs/list");
const Delimiter = require("@editorjs/delimiter");
const InlineCode = require("@editorjs/inline-code");
const RawTool = require("@editorjs/raw");
const Warning = require("@editorjs/warning");
const Table = require("@editorjs/table");

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.scss"],
})
export class WriteComponent implements OnInit {
  editor: EditorJs;

  constructor(private dataService: DataService) {}

  publish() {
    console.log(this.editor.save());
    setTimeout(() => {
      this.dataService.article.next({
        working: false,
        publishArticle: false,
        haveContent: true,
      });
    }, 3000);
  }

  ngOnInit(): void {
    this.editor = new EditorJs({
      hideToolbar: false,
      initialBlock: "header",
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+H",
          config: {
            defaultLevel: 1,
          },
        },
        paragraph: {
          class: Paragraph,
          shortcut: "CMD+P",
          config: {
            placeholder: "Describe your heading",
            defaultLevel: 1,
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
              byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
            },
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        code: CodeTool,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching
          },
        },
        list: {
          class: List,
          shortcut: "CMD+O+L",
        },
        delimiter: Delimiter,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        raw: {
          class: RawTool,
          config: {
            placeholder: "Raw HTML Content",
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
      },
      // placeholder: "Heading",
      autofocus: true,
      onChange: (data) => {
        this.dataService.article.next({
          haveContent: data.blocks.getBlocksCount() > 1 ? true : false,
          publishArticle: false,
          working: false,
        });
      },
    });

    this.dataService.article.subscribe(({ publishArticle }) => {
      if (publishArticle) this.publish();
    });
  }
}
