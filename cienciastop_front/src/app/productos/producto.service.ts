import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { PRODUCTOS } from './productos.json';
import { Observable } from 'rxjs';
import { catchError , throwError} from 'rxjs'; // Para manejar las excepciones del back
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  miStorage = window.localStorage;

  constructor(private http: HttpClient) { }

  private urlEndPoint:string = 'http://localhost:8080/api/productos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  create(producto: Producto): Observable<Producto>{
    console.log(localStorage.getItem("noCT"));
    return this.http.post<Producto>(`${this.urlEndPoint}/${localStorage.getItem("noCT")}`, producto, {headers: this.httpHeaders} )
  }

  getProducto(codigo: string): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${codigo}`)
  }

  delete(codigo: string): Observable<Producto>{
    console.log("adios");
    return this.http.delete<Producto>(`${this.urlEndPoint}/${codigo}/`, {headers: this.httpHeaders})
  }

  editarProducto(producto: Producto, noCT: number) { // {headers: this.httpHeaders}
    console.log("mmmm");
    //return this.http.put<any>(this.urlEndPoint + producto.codigo + "/editar/"+ `${localStorage.getItem("noCT")}`)
    localStorage.getItem("noCT");
    return this.http.post<any>(`${this.urlEndPoint}/${producto.codigo}/editar/${localStorage.getItem("noCT")}`, producto ).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError( () => e);
      })
    )
  }
}
