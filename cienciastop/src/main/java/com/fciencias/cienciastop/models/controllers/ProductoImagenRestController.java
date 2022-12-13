package com.fciencias.cienciastop.models.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fciencias.cienciastop.models.entity.Producto;
import com.fciencias.cienciastop.models.entity.ProductoImagen;
import com.fciencias.cienciastop.models.entity.Usuario;
import com.fciencias.cienciastop.models.service.IProductoImagenService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/producto-imagen")
public class ProductoImagenRestController {
	
	@Autowired
	IProductoImagenService svc;
	
	@GetMapping("/{producto_codigo}")
	@PreAuthorize("hasRole('Administrador') || hasRole('Proveedor')")
	public List<ProductoImagen> getProductoImagenes(@PathVariable("producto_codigo") String producto_codigo) {
		return svc.getProductoImagenes(producto_codigo);
	}
	
	@PostMapping 
	@PreAuthorize("hasRole('Administrador') || hasRole('Proveedor')")
	public ResponseEntity<?>  uploadProductoImagen(@Valid @RequestBody ProductoImagen productoImagen, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			Map<String,Object> response = new HashMap<>();
			response.put("mensaje", "Error en los datos incluidos en el Json");		
			response.put("error", bindingResult.getAllErrors().get(0).getDefaultMessage());
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.BAD_REQUEST);
		}
		Map<String,Object> response = new HashMap<>();
		// Si llegamos hasta acá es porque la edición fue valida
		ProductoImagen aux = svc.createProductoImage(productoImagen);
		if (aux == null) {
			response.put("mensaje", "Error en el create ");
		} else {
			// Si llegamos hasta acá es porque la edición fue valida
			response.put("mensaje", "El producto ha sido actualizado con éxito");
		}
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/{producto_imagen_id}")
	@PreAuthorize("hasRole('Administrador') || hasRole('Proveedor')")
	public ResponseEntity<?> deleteProductoImagen(@PathVariable("producto_imagen_id") Integer producto_imagen_id) {
		Map<String, Object> response = new HashMap<>();
		boolean a  = svc.deleteProductoImage(producto_imagen_id);
		if(a==false) {
			response.put("mensaje", "No existe una imagen de producto con ese id.");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.UNAUTHORIZED);	
		}
		//Eliminacion exitosa del producto.
		response.put("mensaje", "La imagen del producto ha sido eliminada con exito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
}
