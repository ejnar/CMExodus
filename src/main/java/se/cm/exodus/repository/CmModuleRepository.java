package se.cm.exodus.repository;

import org.springframework.data.repository.query.Param;
import se.cm.exodus.domain.CmModule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Set;


/**
 * Spring Data JPA repository for the CmModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmModuleRepository extends JpaRepository<CmModule, Long> {

    @Query("SELECT m FROM CmModule m left join fetch m.itemLists left join fetch m.items WHERE m.id = :id")
    public CmModule findCmModuleById(@Param("id") Long id);

}
