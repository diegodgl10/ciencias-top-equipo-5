package com.fciencias.cienciastop.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.fciencias.cienciastop.models.entity.Renta;

public interface IRentaDao extends CrudRepository<Renta, Long>{
	@Query(value= "SELECT * FROM rentas WHERE status_entrega = :status", nativeQuery = true)
	List<Renta> encontrarPorStatus(@Param("status") boolean status);

	/**
	 * Regresa la lista de los 5 usuarios con mayor cantidad de rentas en la semana.
	 * @return la lista de los 5 usuarios con mayor cantidad de rentas en la semana.
	 */
	@Query(
			value= "WITH aux AS ("
				+ "SELECT * FROM rentas WHERE "
				+ "fecha_renta BETWEEN NOW() - INTERVAL '7 day' AND NOW()) "
				+ "SELECT count(usuario_id) AS rentas, usuario_id FROM aux "
				+ "GROUP BY usuario_id ORDER BY rentas DESC LIMIT 5;", 
			nativeQuery = true)
	public List<Object[]> topFiveConMasRentas();

}