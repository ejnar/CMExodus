package se.cm.exodus.repository;

import se.cm.exodus.domain.CmPortal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmPortal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmPortalRepository extends JpaRepository<CmPortal, Long> {

}
