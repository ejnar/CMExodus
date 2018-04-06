package se.cm.exodus.service;

import se.cm.exodus.service.dto.CmModuleDTO;
import java.util.List;

/**
 * Service Interface for managing CmModule.
 */
public interface CmModuleService {

    /**
     * Save a cmModule.
     *
     * @param cmModuleDTO the entity to save
     * @return the persisted entity
     */
    CmModuleDTO save(CmModuleDTO cmModuleDTO);

    /**
     * Get all the cmModules.
     *
     * @return the list of entities
     */
    List<CmModuleDTO> findAll();

    /**
     * Get the "id" cmModule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CmModuleDTO findOne(Long id);

    /**
     * Delete the "id" cmModule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
