import { Component, OnInit } from "@angular/core";

@Component({
  selector: "context-menu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.scss"]
})
export class ContextMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.addEventListener("mousedown", e => {
      e.preventDefault();
      const menu = <HTMLElement>(
        document.getElementsByTagName("context-menu")[0]
      );
      if (e.button == 2) {
        menu.style.opacity = "1";
        menu.style.top = `${e.pageY}px`;
        menu.style.left = `${e.pageX}px`;
      } else if (e.button == 0) {
        let left = Number(menu.style.left.replace("px", ""));
        let top = Number(menu.style.top.replace("px", ""));
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        let width = menu.offsetWidth;
        let height = menu.offsetHeight;
        if (
          !(mouseX > left && mouseX < left + width) ||
          !(mouseY > top && mouseY < top + height)
        ) {
          menu.style.opacity = "0";
          setTimeout(() => {
            menu.style.top = "0";
            menu.style.left = "-20000rem";
          }, 100);
        }
      }
    });
  }
}
