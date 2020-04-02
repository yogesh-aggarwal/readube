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
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

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
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "http:localhost"
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
