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
import { RavelComponent } from "./ravel/ravel.component";
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";

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
    ExploreComponent,
    RavelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
