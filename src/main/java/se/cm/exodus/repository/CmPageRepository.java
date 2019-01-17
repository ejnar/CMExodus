package se.cm.exodus.repository;

import se.cm.exodus.domain.CmPage;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the CmPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmPageRepository extends JpaRepository<CmPage, Long> {
    @Query("SELECT DISTINCT cm_page FROM CmPage cm_page left join fetch cm_page.moduleConfigs")
    List<CmPage> findAllWithEagerRelationships();

    @Query("SELECT cm_page FROM CmPage cm_page left join fetch cm_page.moduleConfigs WHERE cm_page.id =:id")
    CmPage findOneWithEagerRelationships(@Param("id") Long id);

    @Query("SELECT DISTINCT cm_page FROM CmPage cm_page LEFT JOIN FETCH cm_page.moduleConfigs m LEFT JOIN FETCH cm_page.authorities a WHERE a.userId = :userId")
    List<CmPage> findByUserWithEagerRelationships(@Param("userId") Long userId);

}
