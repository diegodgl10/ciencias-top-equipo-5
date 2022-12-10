package com.fciencias.cienciastop.models.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="producto_imagen")
public class ProductoImagen {
	
	/* */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "producto_imagen_id", unique=true)
	@JsonProperty("producto_imagen_id")
	private Integer producto_imagen_id;
	
	/* codigo del producto. */
	@Column(name="producto_codigo")
	@JsonProperty("producto_codigo")
	@NotNull(message="El nombre es requerido")
	private String producto_codigo;
	
	/* Nombre del producto. */
	@Column(name="imagen")
	@JsonProperty("imagen")
	@NotNull(message="La imagen es requerida")
	private String imagen; // Devolveremos la ruta donde esta almacenada la imagen
	
	@JsonIgnore
	@Column(name="status")
	@Min(value=0, message="El status debe de ser 0 o 1")
	@Max(value=1, message="El status debe de ser 0 o 1")
	private Integer status;

	public Integer getProducto_imagen_id() {
		return producto_imagen_id;
	}

	public void setProducto_imagen_id(Integer producto_imagen_id) {
		this.producto_imagen_id = producto_imagen_id;
	}

	public String getProducto_codigo() {
		return producto_codigo;
	}

	public void setProducto_codigo(String producto_codigo) {
		this.producto_codigo = producto_codigo;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
}
