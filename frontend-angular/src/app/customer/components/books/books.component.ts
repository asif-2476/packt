import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { IBook, IBookResponse } from '../../models/IBook';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public books: IBook[] = [];
  public apiForm = this.fb.group({
    search: '',
    page: 1,
  });

  public paginationOptions = {
    pageSize: 0,
    pageSizeOptions: [100],
    length: 0
  }

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      mergeMap(value => this.bookService.getBooks(value))
    )
      .subscribe(response => {
        this.books = response.data;
        this.paginationOptions.length = response.meta.total;
        this.paginationOptions.pageSize = response.meta.per_page;
      });

    this.apiForm.get('search').patchValue('');
  }

  onPaginateChange(event: PageEvent) {
    this.apiForm.get('page').patchValue(event.pageIndex + 1);
  }

  bookDetail(id:any){
    this.router.navigate(["book/"+id]);
  }


}
