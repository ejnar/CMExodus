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
    @Query("select distinct cm_page from CmPage cm_page left join fetch cm_page.modules")
    List<CmPage> findAllWithEagerRelationships();

    @Query("select cm_page from CmPage cm_page left join fetch cm_page.modules where cm_page.id =:id")
    CmPage findOneWithEagerRelationships(@Param("id") Long id);

    @Query("SELECT DISTINCT cm_page FROM CmPage cm_page LEFT JOIN FETCH cm_page.modules m LEFT JOIN FETCH cm_page.authorities a WHERE a.user = :user")
    List<CmPage> findByUserWithEagerRelationships(@Param("user") String user);

}
