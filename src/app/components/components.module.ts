import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorCardComponent } from "./global/author-card/author-card.component";
import { ContextMenuComponent } from "./global/context-menu/context-menu.component";
import { PublicationCardComponent } from "./global/publication-card/publication-card.component";
import { TagComponent } from "./global/tag/tag.component";
import { StoryCardComponent } from "./global/story-card/story-card.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AuthorCardComponent,
    ContextMenuComponent,
    PublicationCardComponent,
    TagComponent,
    StoryCardComponent,
    NotificationsComponent,
  ],
  exports: [
    AuthorCardComponent,
    ContextMenuComponent,
    PublicationCardComponent,
    TagComponent,
    StoryCardComponent,
    NotificationsComponent,
  ],
  imports: [RouterModule, CommonModule],
})
export class ComponentsModule {}
