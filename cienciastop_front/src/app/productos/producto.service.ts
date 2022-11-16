import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { PRODUCTOS } from './productos.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Edit changes 
import { catchError , throwError} from 'rxjs'; // Para manejar las excepciones del back
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Para realizar el redireccionamiento

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient, private router:Router) { }

  private urlEndPoint:string = 'http://localhost:8080/api/productos';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }


  // any en lugar de prod
  editar(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.codigo}/editar`, producto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError( () => e);
      })
    )
  }

}
