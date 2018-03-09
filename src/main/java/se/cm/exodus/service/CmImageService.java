package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmImageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CmImage.
 */
public interface CmImageService {

    /**
     * Save a cmImage.
     *
     * @param cmImageDTO the entity to save
     * @return the persisted entity
     */
    CmImageDTO save(CmImageDTO cmImageDTO);

    /**
     * Get all the cmImages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CmImageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" cmImage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmImageDTO findOne(Long id);

    /**
     * Delete the "id" cmImage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
