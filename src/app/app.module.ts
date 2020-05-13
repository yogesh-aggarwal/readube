import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//& Root
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//& Components
import { TopbarComponent } from "./components/topbar/topbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
//& Routes
import { HomeComponent } from "./routes/home/home.component";
import { TrendingComponent } from "./routes/trending/trending.component";
import { ExploreComponent } from "./routes/explore/explore.component";
//& GraphQL
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthorModule } from "./routes/author/author.module";
import { ComponentsModule } from "./components/components.module";
import { CollectionViewComponent } from "./routes/collection-view/collection-view.component";

@NgModule({
  declarations: [
    AppComponent,
    //& Routes
    HomeComponent,
    TrendingComponent,
    ExploreComponent,
    CollectionViewComponent,
    //& Components
    TopbarComponent,
    SidebarComponent,
  ],
  imports: [
    //& Essential Modules
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    //& Components,
    AuthorModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
