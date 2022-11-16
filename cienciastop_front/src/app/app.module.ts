import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ProductosComponent } from './productos/productos.component';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuProveComponent } from './menu-prove/menu-prove.component';
import { SortDirective } from './directive/usuarios.directive';
import { EditarUsrComponent } from './editar/editar-usr.component';
import { EditarPumaPuntosComponent } from './editar-puma-puntos/editar-puma-puntos.component';
import { AgregarUsrComponent } from './agregar-usr/agregar-usr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditarProdComponent } from './editar-prod/editar-prod.component';


const routes: Routes = [
  {path: "", redirectTo: "/productos", pathMatch: "full"},
  {path: "usuarios", component: UsuariosComponent},
  {path: "productos", component: ProductosComponent},
  {path: "usuarios/agregar-usr", component: AgregarUsrComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ProductosComponent,
    UsuariosComponent,
    MenuAdminComponent,
    MenuProveComponent,
    SortDirective,
    EditarUsrComponent,
    EditarPumaPuntosComponent,
    AgregarUsrComponent,
    EditarProdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
