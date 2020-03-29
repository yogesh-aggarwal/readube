import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './trending/trending.component';
import { ExploreComponent } from './explore/explore.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "trending", component: TrendingComponent },
  { path: "explore", component: ExploreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
