package com.fciencias.cienciastop.models.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.fciencias.cienciastop.models.dao.IProductoImagenDao;
import com.fciencias.cienciastop.models.entity.ProductoImagen;

@Service
@PropertySource("classpath:configuration/path.config")
public class ProductoImagenServiceImpl implements IProductoImagenService {
	
	@Autowired
	IProductoImagenDao repo;
	
	@Value("${product.images.path}")
	private String path;
	
	@Override
	public List<ProductoImagen> getProductoImagenes(String codigo) {
		return repo.findByProductoCodigo(codigo);
	}

	@Override
	public ProductoImagen createProductoImage(ProductoImagen in) {
		// TODO Auto-generated method stub
		try {
			File folder = new File(path+"/"+in.getProducto_codigo());
			if(!folder.exists())
				folder.mkdir();
			
			String file = path + in.getProducto_codigo() + "/img_" + new Date().getTime() + ".bmp";
			
			byte[] data = Base64.getMimeDecoder().decode(in.getImagen().substring(in.getImagen().indexOf(",")+1,in.getImagen().length()));
			
			try(OutputStream stream = new FileOutputStream(file)){
				stream.write(data);
			}
			in.setStatus(1);
			in.setImagen(in.getProducto_codigo()+"/img_"+new Date().getTime() + ".bmp");
			
			repo.save(in);
		} catch (Exception e) {
			return null;
		}
		return in;
	}

	@Override
	public boolean deleteProductoImage(Integer producto_imagen_id) {
		if(repo.deleteProductoImagen(producto_imagen_id) > 0) {
			return true;
		} else {
			return false;
		}
	}

}
