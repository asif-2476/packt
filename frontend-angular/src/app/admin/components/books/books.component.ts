import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBook,IBookResponse } from 'src/app/customer/models/IBook';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';
import {  PageEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public apiForm = this.fb.group({
    search: '',
    page: 1,
  });
  

  public books: IBook[] = [];
  public paginationOptions = {
    pageSize: 0,
    pageSizeOptions: [100],
    length: 0
  }

  public bookForm: FormGroup;

  public displayedColumns: string[] = ['isbn', 'title', 'author', 'genre', 'publisher', 'published_date', 'actions'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    
    this.bookForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      isbn: ['', Validators.required],
      published_date: ['', Validators.required],
      publisher: ['', Validators.required],
    });

    this.apiForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      mergeMap(value => this.adminService.getBooks(value))
    )
      .subscribe((response:IBookResponse) => {
        this.books = response.data;
        this.paginationOptions.length = response.meta.total;
        this.paginationOptions.pageSize = response.meta.per_page;
      });

    this.apiForm.get('search').patchValue('');
  }

  add() {
    if (this.bookForm.invalid) {
      return;
    }

    this.adminService.addAndUpdateBook(this.bookForm.value).subscribe(() => {
      this._openSnackBar('Book request successfully done', 'Close');
      this.adminService.getBooks().subscribe((response:IBookResponse) => {
        this.books = response.data;
        this.paginationOptions.length = response.meta.total;
        this.paginationOptions.pageSize = response.meta.per_page;
      });
    });
  }

  edit(book: IBook) {
    this.bookForm.patchValue(book);
  }

  delete(book: IBook) {
    this.adminService.deleteBook(book.id).subscribe(() => { 
      this._openSnackBar('Book deleted successfully', 'Close');
    })
  }

  onPaginateChange(event: PageEvent) {
    this.apiForm.get('page').patchValue(event.pageIndex + 1);
  }


  private _openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
