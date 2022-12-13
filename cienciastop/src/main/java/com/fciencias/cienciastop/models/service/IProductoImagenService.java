package com.fciencias.cienciastop.models.service;

import java.util.List;

import com.fciencias.cienciastop.models.entity.ProductoImagen;

public interface IProductoImagenService {
	
	//ApiResponse
	public List<ProductoImagen> getProductoImagenes(String codigo);
	public ProductoImagen createProductoImage(ProductoImagen in);
	public boolean deleteProductoImage(Integer producto_imagen_id);
	
}
