import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBookResponse } from '../models/IBook';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }


  getBooks(input: any = null) {
    return this.http.get<IBookResponse>(environment.urls.getBooks, {
      params: new HttpParams({ fromObject: input })
    });
  }

  getBookDetail(id: any) {
    return this.http.get(environment.urls.getBookDetails+"/"+id);
  }
}
