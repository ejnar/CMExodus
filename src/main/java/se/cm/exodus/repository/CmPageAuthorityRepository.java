package se.cm.exodus.repository;

import se.cm.exodus.domain.CmPageAuthority;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmPageAuthority entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmPageAuthorityRepository extends JpaRepository<CmPageAuthority, Long> {

}
