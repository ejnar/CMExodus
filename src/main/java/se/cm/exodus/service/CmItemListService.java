package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmItemListDTO;
import java.util.List;

/**
 * Service Interface for managing CmItemList.
 */
public interface CmItemListService {

    /**
     * Save a cmItemList.
     *
     * @param cmItemListDTO the entity to save
     * @return the persisted entity
     */
    CmItemListDTO save(CmItemListDTO cmItemListDTO);

    /**
     * Get all the cmItemLists.
     *
     * @return the list of entities
     */
    List<CmItemListDTO> findAll();

    /**
     * Get the "id" cmItemList.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmItemListDTO findOne(Long id);

    /**
     * Delete the "id" cmItemList.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
