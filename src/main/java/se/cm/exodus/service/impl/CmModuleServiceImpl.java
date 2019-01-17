package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmModuleService;
import se.cm.exodus.domain.CmModule;
import se.cm.exodus.repository.CmModuleRepository;
import se.cm.exodus.service.dto.CmModuleDTO;
import se.cm.exodus.service.mapper.CmModuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CmModule.
 */
@Service
@Transactional
public class CmModuleServiceImpl implements CmModuleService {

    private final Logger log = LoggerFactory.getLogger(CmModuleServiceImpl.class);

    private final CmModuleRepository cmModuleRepository;

    private final CmModuleMapper cmModuleMapper;

    public CmModuleServiceImpl(CmModuleRepository cmModuleRepository, CmModuleMapper cmModuleMapper) {
        this.cmModuleRepository = cmModuleRepository;
        this.cmModuleMapper = cmModuleMapper;
    }

    /**
     * Save a cmModule.
     *
     * @param cmModuleDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmModuleDTO save(CmModuleDTO cmModuleDTO) {
        log.debug("Request to save CmModule : {}", cmModuleDTO);
        final CmModule cmModuleEntity = cmModuleMapper.toEntity(cmModuleDTO);
        cmModuleEntity.getTexts().forEach((t) -> { t.setCmModule(cmModuleEntity);} );
        cmModuleEntity.getImages().forEach((t) -> { t.setCmModule(cmModuleEntity);} );
        cmModuleEntity.getItemLists().forEach((t) -> { t.setCmModule(cmModuleEntity);} );
        CmModule cmModule = cmModuleRepository.save(cmModuleEntity);
        return cmModuleMapper.toDto(cmModule);
    }

    /**
     * Get all the cmModules.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CmModuleDTO> findAll() {
        log.debug("Request to get all CmModules");
        return cmModuleRepository.findAll().stream()
            .map(cmModuleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cmModule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmModuleDTO findOne(Long id) {
        log.debug("Request to get CmModule : {}", id);
        CmModule cmModule = cmModuleRepository.findCmModuleById(id);
        return cmModuleMapper.toDto(cmModule);
    }

    /**
     * Delete the cmModule by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmModule : {}", id);
        cmModuleRepository.delete(id);
    }
}
