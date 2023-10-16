//import { Injectable, EventEmitter } from '@angular/core';
//import { CLLocales } from './imodel/CLLocales';
//import { Observable, of } from 'rxjs';
//import { catchError, tap } from 'rxjs/operators';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

//const apiUrl = "http://127.0.0.1:8000/api/locales/";
//const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

//@Injectable({
  providedIn: 'root'
//})
//export class localesService {
 // public localUpdated = new EventEmitter<void>();

 // constructor(private http: HttpClient) { }

 // private handleError<T>(operation = 'operation', result?: T) {
    //return (error: any): Observable<T> => {
 //     console.error("handleError", error);
    //  return of(result as T);
  //  };
  //}

  //addLocales(locales: CLLocales): Observable<CLLocales> {
    //return this.http.post<CLLocales>(apiUrl, locales, httpOptions)
     // .pipe(
      //  tap((locales: CLLocales) => {
        //  console.log('added locales:', locales);
       //   this.localUpdated.emit(); // Emitir el evento de actualización
      //  }),
       // catchError(this.handleError<CLLocales>('addLocales'))
    //  );
//  }
//
//  getLocales(): Observable<CLLocales[]> {
 //   return this.http.get<CLLocales[]>(apiUrl)
 //     .pipe(
 //       tap(data => console.log('fetched locales')),
  //      catchError(this.handleError('getLocales', []))
  //    );
//  }

  //getLocal(id: string): Observable<CLLocales> {
 //   return this.http.get<CLLocales>(apiUrl + "/" + id)
  //    .pipe(
  //      tap(_ => console.log('fetched locales id=${id}')),
  //      catchError(this.handleError<CLLocales>('getLocales id=${id}'))
  //    );
 //// }

 // deleteLocales(id: number): Observable<CLLocales> {
  //  return this.http.delete<CLLocales>(apiUrl + "/" + id, httpOptions)
//      .pipe(
//        tap(_ => console.log('deleted locales id=${id}')),
//        catchError(this.handleError<CLLocales>('deleteLocales'))
  //    );
  //}

 // updateLocales(id: number, locales: CLLocales): Observable<CLLocales> {
  //  return this.http.put<CLLocales>(apiUrl + "/" + id, locales, httpOptions)
  //    .pipe(
  //      tap(_ => console.log('updated locales id=${id}')),
 //       catchError(this.handleError<any>('updateLocales'))
 //     );
 // }
//}
