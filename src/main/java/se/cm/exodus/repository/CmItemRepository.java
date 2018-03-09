package se.cm.exodus.repository;

import se.cm.exodus.domain.CmItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmItemRepository extends JpaRepository<CmItem, Long> {

}
