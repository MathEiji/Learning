import { Injectable } from '@angular/core';
import { Conta } from './conta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  constructor(private http: HttpClient, private messageService: MessageService) { }
  contaUrl = 'api/contas';

  getContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.contaUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')), catchError(this.handleError<Conta[]>('getContas', [])));
  }

  getConta(id: number): Observable<Conta[]> {
    const url = `${this.contaUrl}/${id}`;
    return this.http.get<Conta[]>(url);
  }

  updateConta(conta: Conta): Observable<any> {
    return this.http.put(this.contaUrl, conta, httpOptions);
  }

  addConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.contaUrl, conta, httpOptions).pipe(
      tap((newConta: Conta) => this.log(`added conta w/ id=${newConta.id}`)),
      catchError(this.handleError<Conta>('addedConta')));
  }

  deleteConta(conta: Conta | number): Observable<Conta> {
    const id = typeof conta === 'number' ? conta : conta.id;
    const url = `${this.contaUrl}/${id}`;

    return this.http.delete<Conta>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted conta id=${id}`)),
      catchError(this.handleError<Conta>('deletedConta'))
    );
  }

  searchConta(term: string): Observable<Conta[]> {
    if(!term.trim()){
      // if not search term, return empty hero array.
      return of([]);
    }
    let url = `${this.contaUrl}/?name=${term}`;
    return this.http.get<Conta[]>(url).pipe(
      tap(_ => this.log(`founde contas matching "${term}"`)),
      catchError(this.handleError<Conta[]>('searchContas', []))
    );
  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`ContaService: ${message}`);
  }
}

