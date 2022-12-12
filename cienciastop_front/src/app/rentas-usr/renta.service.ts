import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Renta } from './renta';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { UserAuthService } from '../util/user-auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RentaService {

  constructor(private http: HttpClient,
    private userAuthService: UserAuthService) { }



  private urlEndPoint:string = 'http://localhost:8080/api/rentas';


  public httpHeaders = new HttpHeaders()
      .set('Authorization',  `Bearer ${this.userAuthService.getToken()}`)
      .set('Content-Type',  'application/json')

  public authHeader = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.userAuthService.getToken()}`)
  }

  rentarProducto(codigo: String, noCT: number): Observable<Object>{
    return this.http.post<Renta>(this.urlEndPoint + '/' + codigo + '/' + noCT, this.authHeader).pipe(
      catchError( e => {
        swal.fire('Error al rentar el producto', e.error.mensaje, 'error');
        return throwError( () => e);

      })
    );
  }

}
