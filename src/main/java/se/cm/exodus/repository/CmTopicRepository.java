package se.cm.exodus.repository;

import org.springframework.data.repository.query.Param;
import se.cm.exodus.domain.CmTopic;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Set;


/**
 * Spring Data JPA repository for the CmTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CmTopicRepository extends JpaRepository<CmTopic, Long> {


    @Query("select c from CmTopic c left join fetch c.subTopics")
    Set<CmTopic> findAllIncludeSubTopic();


}
