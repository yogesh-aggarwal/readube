import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RavelComponent } from './ravel/ravel.component';
import { AuthorComponent } from './author.component';
import { ComponentsModule } from '../components/components.module';
import { InfoComponent } from './info/info.component';
import { CollectionComponent } from './collection/collection.component';
import { CommunityComponent } from './community/community.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { StoryComponent } from './story/story.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AuthorComponent,
    CollectionComponent,
    CommunityComponent,
    InfoComponent,
    MerchandiseComponent,
    RavelComponent,
    StoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
  ]
})
export class AuthorModule { }
