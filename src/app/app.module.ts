import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";
import { TagComponent } from "./components/tag/tag.component";
import { TrendingComponent } from "./trending/trending.component";
import { AuthorCardComponent } from "./components/author-card/author-card.component";
import { PublicationCardComponent } from "./components/publication-card/publication-card.component";
import { ExploreComponent } from "./explore/explore.component";
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";
import { CollectionComponent } from "./author/collection/collection.component";
import { CommunityComponent } from "./author/community/community.component";
import { InfoComponent } from "./author/info/info.component";
import { RavelComponent } from "./author/ravel/ravel.component";
import { MerchandiseComponent } from "./author/merchandise/merchandise.component";
import { StoryComponent } from "./author/story/story.component";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    ContextMenuComponent,
    TagComponent,
    TrendingComponent,
    AuthorCardComponent,
    PublicationCardComponent,
    CollectionComponent,
    CommunityComponent,
    InfoComponent,
    MerchandiseComponent,
    StoryComponent,
    RavelComponent,
    ExploreComponent,
    RavelComponent
  ],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
