package se.cm.exodus.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import se.cm.exodus.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;
import se.cm.exodus.domain.CmPage;

import java.util.List;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {

    @Query("SELECT DISTINCT authority FROM Authority authority WHERE authority.moduleAuthority = true")
    List<Authority> findByModuleAuthority();
}
