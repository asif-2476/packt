import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BookDetailComponent } from './components/books/bookdetail/bookdetail.component';


const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
  },
  {
    path: 'book/:id',
    component: BookDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
