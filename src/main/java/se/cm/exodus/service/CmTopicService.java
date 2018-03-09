package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmTopicDTO;
import java.util.List;

/**
 * Service Interface for managing CmTopic.
 */
public interface CmTopicService {

    /**
     * Save a cmTopic.
     *
     * @param cmTopicDTO the entity to save
     * @return the persisted entity
     */
    CmTopicDTO save(CmTopicDTO cmTopicDTO);

    /**
     * Get all the cmTopics.
     *
     * @return the list of entities
     */
    List<CmTopicDTO> findAll();

    /**
     * Get the "id" cmTopic.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmTopicDTO findOne(Long id);

    /**
     * Delete the "id" cmTopic.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
