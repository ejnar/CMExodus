package se.cm.exodus.repository;

import se.cm.exodus.domain.CmSubTopic;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CmSubTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmSubTopicRepository extends JpaRepository<CmSubTopic, Long> {

}
