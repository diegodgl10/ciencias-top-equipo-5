package com.fciencias.cienciastop.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.fciencias.cienciastop.models.entity.ProductoImagen;

public interface IProductoImagenDao extends CrudRepository<ProductoImagen,Integer> {

	@Query(
			value= "SELECT * FROM producto_imagen WHERE producto_codigo = :producto_codigo AND status = 1 ", 
			nativeQuery = true)
	public List<ProductoImagen> findByProductoCodigo(String producto_codigo);
	
	@Query(
			value= "UPDATE producto_imagen SET status = 0 WHERE producto_imagen_id :producto_imagen_id AND status = 1 ", 
			nativeQuery = true)
	public Integer deleteProductoImagen(Integer producto_imagen_id);
}
