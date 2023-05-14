import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesContainerComponent} from "./components/movies-container/movies-container.component";


// Define your routes
const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MoviesContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
