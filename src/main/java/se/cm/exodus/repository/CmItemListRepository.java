package se.cm.exodus.repository;

import se.cm.exodus.domain.CmItemList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmItemList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmItemListRepository extends JpaRepository<CmItemList, Long> {

}
