import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { BookService } from './services/book.service';
import { BooksComponent } from './components/books/books.component';
import { BookDetailComponent } from './components/books/bookdetail/bookdetail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [BookService],
})
export class CustomerModule { }
