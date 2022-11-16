import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Renta } from './renta';

@Injectable({
  providedIn: 'root'
})
export class RentaService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  private urlEndPoint:string = 'http://localhost:8080/api/rentas';
  getRentas(): Observable<Renta[]> {
    return this.http.get<Renta[]>(this.urlEndPoint);
  }
  update(id: number): Observable<Renta>{
    return this.http.put<Renta>( `${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
