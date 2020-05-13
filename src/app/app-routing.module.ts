import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./routes/home/home.component";
import { TrendingComponent } from "./routes/trending/trending.component";
import { ExploreComponent } from "./routes/explore/explore.component";
import { AuthorComponent } from "./routes/author/author.component";
import { CollectionViewComponent } from "./routes/collection-view/collection-view.component";

const routes: Routes = [
  // Main routes
  { path: "", component: HomeComponent },
  { path: "trending", component: TrendingComponent },
  { path: "explore", component: ExploreComponent },
  { path: "collection/:id", component: CollectionViewComponent },
  // Component routes
  {
    path: "author",
    component: AuthorComponent,
    children: [
      { path: ":id", component: AuthorComponent },
      { path: ":id/collections", component: AuthorComponent },
      { path: ":id/community", component: AuthorComponent },
      { path: ":id/stories", component: AuthorComponent },
      { path: ":id/merchandises", component: AuthorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
