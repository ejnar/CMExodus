package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmItemDTO;
import java.util.List;

/**
 * Service Interface for managing CmItem.
 */
public interface CmItemService {

    /**
     * Save a cmItem.
     *
     * @param cmItemDTO the entity to save
     * @return the persisted entity
     */
    CmItemDTO save(CmItemDTO cmItemDTO);

    /**
     * Get all the cmItems.
     *
     * @return the list of entities
     */
    List<CmItemDTO> findAll();

    /**
     * Get the "id" cmItem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmItemDTO findOne(Long id);

    /**
     * Delete the "id" cmItem.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
