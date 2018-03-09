package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmPortalDTO;
import java.util.List;

/**
 * Service Interface for managing CmPortal.
 */
public interface CmPortalService {

    /**
     * Save a cmPortal.
     *
     * @param cmPortalDTO the entity to save
     * @return the persisted entity
     */
    CmPortalDTO save(CmPortalDTO cmPortalDTO);

    /**
     * Get all the cmPortals.
     *
     * @return the list of entities
     */
    List<CmPortalDTO> findAll();

    /**
     * Get the "id" cmPortal.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmPortalDTO findOne(Long id);

    /**
     * Delete the "id" cmPortal.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
