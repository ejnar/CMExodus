package se.cm.exodus.repository;

import se.cm.exodus.domain.CmModule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmModuleRepository extends JpaRepository<CmModule, Long> {

}
