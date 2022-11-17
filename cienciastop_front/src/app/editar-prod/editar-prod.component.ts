import { Component, OnInit } from '@angular/core';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-prod',
  templateUrl: './editar-prod.component.html',
  styleUrls: ['./editar-prod.component.css']
})
export class EditarProdComponent implements OnInit {

  titulo: string = "Editar Producto"
  producto: Producto = new Producto()
  angForm: FormGroup;


  constructor(private productoService: ProductoService, private router: Router, private fb: FormBuilder, private activateRoute: ActivatedRoute) { //private activateRoute: ActivatedRoute
    this.createForm2();
  }

  ngOnInit(): void {
    this.producto = history.state;
    console.log(this.producto);
    //this.cargarProducto()
  }

  createForm2() {
    this.angForm = this.fb.group({
      nombre: new FormControl({nombre:this.producto.nombre}, Validators.compose([Validators.required])),
      stockInicial: new FormControl({stock_inicial:this.producto.stock_inicial}, Validators.compose([Validators.required])),
      precio: new FormControl({precio:this.producto.precio}, Validators.compose([Validators.required])),
      descripcion: new FormControl({stock_inicial:this.producto.stock_inicial}, Validators.compose([Validators.required])),
      tipo: new FormControl({tipo:this.producto.tipo}, Validators.compose([Validators.required])),
      categoria: new FormControl({categoria:this.producto.categoria}, Validators.compose([Validators.required])),
      periodoRenta: new FormControl({periodo_renta:this.producto.periodo_renta}, Validators.compose([Validators.required])),
      imagen: new FormControl({imagen:this.producto.imagen}, [Validators.required]),
    });
  }

  onSubmitForm() {
    if (this.angForm.valid) {
      console.log(this.producto);
      this.commitProd();
    } else {
      swal.fire('Error al editar un usuario', 'El form está incompleto o es incorrecto, intenta de nuevo.', 'error');
    }
  }

  commitProd() {
    this.productoService.editarProducto(this.producto, this.producto.noCT).subscribe(
      usuarioData => {
        console.log(usuarioData);
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha editado el prod correctamente',
          showConfirmButton: false,
          timer: 3500
        })
        //Llamamos al método de redirección para volver a la lista de usuarios
        this.router.navigate(['/productos']) //response.prod
      },
      error => console.log(error));
  }


  cargarProducto(): void{
    this.activateRoute.params.subscribe(params => {
      let codigo = params['codigo']
      if(codigo){
        this.productoService.getProducto(codigo).subscribe((producto)=>this.producto = producto)
      }
    })
  }

  public editar():void{ // response por prod
    this.productoService.editarProducto(this.producto, this.producto.noCT).subscribe(producto => 
      {
      this.router.navigate(['/productos']) //response.prod
      swal.fire('Producto Editado', `El producto ${producto.nombre} se ha editado con éxito`, 'success')
      }
    )
  }

  createForm() {
    this.angForm = this.fb.group({
      nombre: new FormControl('', [Validators.required] ),
      stockInicial: new FormControl('10', [Validators.required] ),
      precio: new FormControl('', [Validators.required] ),
      descripcion: new FormControl('', [Validators.required] ),
      tipo: new FormControl('', [Validators.required] ),
      categoria: new FormControl('', [Validators.required] ),
      periodoRenta: new FormControl('', [Validators.required] ),
      imagen: new FormControl('', [Validators.required])
    });
  }

}
