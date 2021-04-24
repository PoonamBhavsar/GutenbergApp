import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './form/books/books.component';
import { HomeComponent } from './form/home/home.component';


const routes: Routes = [

  {
    path:"",
    component:HomeComponent
  },
  {
    path:"books",
    component:BooksComponent
  },
  {
    path:'**',
    redirectTo:'/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
