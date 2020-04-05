import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorCardComponent } from './author-card/author-card.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { PublicationCardComponent } from './publication-card/publication-card.component';
import { TagComponent } from './tag/tag.component';



@NgModule({
  declarations: [
    AuthorCardComponent,
    ContextMenuComponent,
    PublicationCardComponent,
    TagComponent
  ],
  exports: [
    AuthorCardComponent,
    ContextMenuComponent,
    PublicationCardComponent,
    TagComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
