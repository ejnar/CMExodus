package se.cm.exodus.repository;

import se.cm.exodus.domain.CmText;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmText entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmTextRepository extends JpaRepository<CmText, Long> {

}
