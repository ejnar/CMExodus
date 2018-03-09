package se.cm.exodus.repository;

import se.cm.exodus.domain.CmTopic;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmTopicRepository extends JpaRepository<CmTopic, Long> {

}
