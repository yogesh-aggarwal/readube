import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";

interface contentHtml {
  startDiv?: boolean;
  endDiv?: boolean;
  content?: string;
  classes?: Array<string>;
}

class Data {
  elements: Array<any> = [];
  textChange: Subject<any> = new Subject();
  writeBox: HTMLElement;
  isCtrlKey: boolean = false;
  ignoreKeys: Array<string> = [
    "Control",
    "Alt",
    "Shift",
    "Meta",
    "Escape",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "ScrollLock",
    "CapsLock",
    "NumLock",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Pause",
    "Home",
    "End",
    "Delete",
    "Insert",
    "PageUp",
    "PageDown",
  ];

  bold: boolean = false;
  itallic: boolean = false;
  underline: boolean = false;

  WriteBoxContent: Array<contentHtml> = [
    {
      startDiv: true,
      content: "",
      classes: [],
      endDiv: false,
    },
  ];
  lastDiv: contentHtml;
}

class Tools extends Data {
  deleteLastDiv() {
    if (this.WriteBoxContent.length > 1) {
      this.WriteBoxContent.pop();
      this.lastDiv = this.WriteBoxContent[this.WriteBoxContent.length - 1];
      /// To allow Nesting
      this.lastDiv.endDiv = false;
    } else
      this.WriteBoxContent.push({
        startDiv: true,
        content: "",
        classes: [],
        /// To allow Nesting
        endDiv: false,
      });
  }

  updateLastDiv() {
    this.lastDiv = this.WriteBoxContent[this.WriteBoxContent.length - 1];
  }
}

/// Special Formatting Handles
class SpecialFormatting extends Tools {
  getSpecialFormattingClasses() {
    let classes = [];
    this.bold ? classes.push("bold") : false;
    this.itallic ? classes.push("itallic") : false;
    this.underline ? classes.push("underline") : false;
    return classes;
  }

  addSpecialFormatting() {
    this.WriteBoxContent.push({
      startDiv: true,
      content: "",
      classes: this.getSpecialFormattingClasses(),
    });
    this.updateLastDiv();
  }

  handleSpecialFormatting(key: string) {
    if (key == "b") {
      this.bold = !this.bold; // Bold
    } else if (key == "u") {
      this.underline = !this.underline; // Underline
    } else if (key == "i") {
      this.itallic = !this.itallic; // Itallic
    }
    /// Deleting because in the next step a new "div" element will be pushed (only if no content).
    if (!this.lastDiv.content) this.deleteLastDiv();
    this.addSpecialFormatting();
  }
}

class Keys extends SpecialFormatting {
  handleEnter() {
    this.WriteBoxContent.push({
      startDiv: true,
      content: "",
      classes: ["new-line"],
      endDiv: true,
    });
  }

  handleBackspace() {
    this.lastDiv.endDiv = false;
    /// Remove the last element because it has no content
    if (!this.lastDiv.content) this.deleteLastDiv();

    this.lastDiv.content = this.lastDiv.content.slice(
      0,
      this.lastDiv.content.length - 1
    );
  }

  handleTab($event: KeyboardEvent) {
    $event.preventDefault();
    this.WriteBoxContent.push({
      startDiv: true,
      classes: ["heading"],
    });
  }

  handleKey($event: KeyboardEvent) {
    let key = $event.key;
    if (this.ignoreKeys.includes(key)) {
      /// It's an unnecessary key
      this.lastDiv.endDiv = false;
    } else if (key == "Enter") {
      /// It's a new line (\n)
      this.handleEnter();
    } else if (key == "Backspace") {
      /// It's a backspace character (\b)
      this.handleBackspace();
    } else if (key == "Tab") {
      /// User wants to change the typo (Eg: para to heading)
      this.handleTab($event);
    } else {
      return false;
    }
    return true;
  }
}

@Component({
  selector: "app-write",
  templateUrl: "./write.component.html",
  styleUrls: ["./write.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class WriteComponent extends Keys implements OnInit {
  constructor() {
    super();
    this.analyse();
  }

  parseContentData() {
    let WriteBoxContent = this.WriteBoxContent;
    let content = "";

    let divElement: string;
    WriteBoxContent.forEach((div) => {
      divElement = `<div class='${div.classes ? div.classes.join(" ") : ""}'>`;
      content += `${divElement ? divElement : ""}${div.content}${
        div.endDiv ? "</div>" : ""
      }`;
    });
    this.writeBox.innerHTML = content;
  }

  analyse() {
    this.textChange.subscribe(($event: KeyboardEvent) => {
      let key = $event.key;
      this.lastDiv.endDiv = true;

      if ($event.ctrlKey) {
        this.handleSpecialFormatting(key.toLowerCase());
      } else if (!this.handleKey($event)) {
        /// It's the part of the main content
        this.lastDiv.endDiv = false;
        this.lastDiv.content += key;
      }

      console.table(this.WriteBoxContent);
      this.parseContentData();
    });
  }

  ngOnInit(): void {
    this.writeBox = document.querySelector("#write");
    this.updateLastDiv();
    console.log(this.lastDiv);
  }
}
