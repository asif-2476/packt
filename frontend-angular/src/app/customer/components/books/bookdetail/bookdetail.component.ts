import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookDetailComponent implements OnInit {

  // 
  public book ;
  id;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
    this.bookService.getBookDetail(this.id).subscribe((data:any)=>{
       this.book = data.data;
       console.log(data)
    });
    
  }

 


}
