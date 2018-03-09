package se.cm.exodus.repository;

import se.cm.exodus.domain.CmImage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmImageRepository extends JpaRepository<CmImage, Long> {

}
