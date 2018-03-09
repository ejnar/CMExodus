package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmTextDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CmText.
 */
public interface CmTextService {

    /**
     * Save a cmText.
     *
     * @param cmTextDTO the entity to save
     * @return the persisted entity
     */
    CmTextDTO save(CmTextDTO cmTextDTO);

    /**
     * Get all the cmTexts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CmTextDTO> findAll(Pageable pageable);

    /**
     * Get the "id" cmText.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmTextDTO findOne(Long id);

    /**
     * Delete the "id" cmText.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
