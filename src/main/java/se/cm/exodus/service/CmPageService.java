package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmPageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CmPage.
 */
public interface CmPageService {

    /**
     * Save a cmPage.
     *
     * @param cmPageDTO the entity to save
     * @return the persisted entity
     */
    CmPageDTO save(CmPageDTO cmPageDTO);

    /**
     * Get all the cmPages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CmPageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" cmPage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmPageDTO findOne(Long id);

    /**
     * Delete the "id" cmPage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
