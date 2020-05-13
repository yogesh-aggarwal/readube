import { Component, OnInit, Input } from "@angular/core";

//& API
import { Apollo } from "apollo-angular";
import { ToolsService } from "src/app/services/tools.service";
import { StaticDataService } from "src/app/services/static.service";

@Component({
  selector: "author-ravel",
  templateUrl: "./ravel.component.html",
  styleUrls: ["./ravel.component.scss"],
})
export class RavelComponent extends ToolsService implements OnInit {
  @Input()
  id: any;

  categoryPreviousValue: string;

  categories: any;
  constructor(
    private apollo: Apollo,
    private staticDataService: StaticDataService
  ) {
    super();
  }

  save(id: string) {
    const name = document.getElementById(`category-${id}`);
    name.blur();
    name.setAttribute("contenteditable", "false");
    if (this.categoryPreviousValue !== name.innerText) {
      console.warn("[UPDATED]", name.innerText);
      this.categoryPreviousValue = name.innerText;
    } else {
      console.warn("[NOT_UPDATED] Value is same!");
    }
  }

  editCategoryName(id: string) {
    const name = document.getElementById(`category-${id}`);
    name.setAttribute("contenteditable", "true");
    this.categoryPreviousValue = name.innerText;
    name.focus();
  }

  getCategories() {
    this.apollo
      .watchQuery({
        query: this.staticDataService.authorQuery.user(this.id),
      })
      .valueChanges.subscribe(({ loading, data }) => {
        this.categories = data["getUser"]["data"]["posts"]["categories"];
      });
  }

  ngOnInit() {
    this.getCategories();
  }
}
