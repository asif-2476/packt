import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBook, IBookResponse } from 'src/app/customer/models/IBook';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }


  getBooks(input: any = null) {
    return this.http.get<IBookResponse>(environment.urls.admin.getBooks, {
      params: new HttpParams({ fromObject: input })
    }).pipe(catchError(
      error => {
        console.log(error)
        return error;
      }
    ));
  }

  addAndUpdateBook(book: IBook) {
    return this.http.post(environment.urls.admin.addAndUpdateBook, book).pipe(catchError(
      error => {
        console.log(error)
        return error;
      }
    ));;
  }

  deleteBook(id: number) {
    return this.http.delete(`${environment.urls.admin.deleteBook}/${id}`);
  }
}
