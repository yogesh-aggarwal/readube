import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//& Root
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//& Components
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
//& Routes
import { HomeComponent } from "./home/home.component";
import { TrendingComponent } from "./trending/trending.component";
import { ExploreComponent } from "./explore/explore.component";
//& GraphQL
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthorModule } from "./author/author.module";
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [
    AppComponent,
    //& Routes
    HomeComponent,
    TrendingComponent,
    ExploreComponent,
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
    //& Modules,
    AuthorModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
