package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmItemListService;
import se.cm.exodus.domain.CmItemList;
import se.cm.exodus.repository.CmItemListRepository;
import se.cm.exodus.service.dto.CmItemListDTO;
import se.cm.exodus.service.mapper.CmItemListMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CmItemList.
 */
@Service
@Transactional
public class CmItemListServiceImpl implements CmItemListService {

    private final Logger log = LoggerFactory.getLogger(CmItemListServiceImpl.class);

    private final CmItemListRepository cmItemListRepository;

    private final CmItemListMapper cmItemListMapper;

    public CmItemListServiceImpl(CmItemListRepository cmItemListRepository, CmItemListMapper cmItemListMapper) {
        this.cmItemListRepository = cmItemListRepository;
        this.cmItemListMapper = cmItemListMapper;
    }

    /**
     * Save a cmItemList.
     *
     * @param cmItemListDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmItemListDTO save(CmItemListDTO cmItemListDTO) {
        log.debug("Request to save CmItemList : {}", cmItemListDTO);
        CmItemList cmItemList = cmItemListMapper.toEntity(cmItemListDTO);
        cmItemList = cmItemListRepository.save(cmItemList);
        return cmItemListMapper.toDto(cmItemList);
    }

    /**
     * Get all the cmItemLists.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CmItemListDTO> findAll() {
        log.debug("Request to get all CmItemLists");
        return cmItemListRepository.findAll().stream()
            .map(cmItemListMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cmItemList by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmItemListDTO findOne(Long id) {
        log.debug("Request to get CmItemList : {}", id);
        CmItemList cmItemList = cmItemListRepository.findOne(id);
        return cmItemListMapper.toDto(cmItemList);
    }

    /**
     * Delete the cmItemList by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmItemList : {}", id);
        cmItemListRepository.delete(id);
    }
}
