import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TrendingComponent } from "./trending/trending.component";
import { ExploreComponent } from "./explore/explore.component";
import { CollectionComponent } from "./author/collection/collection.component";
import { CommunityComponent } from "./author/community/community.component";
import { MerchandiseComponent } from "./author/merchandise/merchandise.component";
import { StoryComponent } from "./author/story/story.component";
import { AuthorComponent } from "./author/author.component";

const routes: Routes = [
  // Main routes
  { path: "", component: HomeComponent },
  { path: "trending", component: TrendingComponent },
  { path: "explore", component: ExploreComponent },
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
