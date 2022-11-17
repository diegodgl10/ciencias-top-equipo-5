import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';
import { RentaService } from '../rentas-usr/renta.service';
import swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  producto: Producto = new Producto;
  usuario: Usuario = new Usuario;
  miStorage = window.localStorage;
  noCT: number = 123456789;

  constructor(private productoService: ProductoService,
    private rentaService: RentaService,private rutaActiva: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.productoService.getProducto(this.rutaActiva.snapshot.params['codigo']).subscribe(
      busqueda => this.producto = busqueda[0]
    );
    localStorage.setItem('noCT', '123456789');
  }

 
  public rentar(){
    this.rentaService.rentarProducto(this.producto.codigo,this.noCT).subscribe(renta =>
      {
        this.router.navigate(['/rentas-usr'])
        swal.fire('Nueva Renta', `Renta ${this.producto.codigo} creado con éxito`, 'success')
      }
    )
  }


}
