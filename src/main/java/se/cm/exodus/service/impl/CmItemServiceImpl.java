package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmItemService;
import se.cm.exodus.domain.CmItem;
import se.cm.exodus.repository.CmItemRepository;
import se.cm.exodus.service.dto.CmItemDTO;
import se.cm.exodus.service.mapper.CmItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CmItem.
 */
@Service
@Transactional
public class CmItemServiceImpl implements CmItemService {

    private final Logger log = LoggerFactory.getLogger(CmItemServiceImpl.class);

    private final CmItemRepository cmItemRepository;

    private final CmItemMapper cmItemMapper;

    public CmItemServiceImpl(CmItemRepository cmItemRepository, CmItemMapper cmItemMapper) {
        this.cmItemRepository = cmItemRepository;
        this.cmItemMapper = cmItemMapper;
    }

    /**
     * Save a cmItem.
     *
     * @param cmItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmItemDTO save(CmItemDTO cmItemDTO) {
        log.debug("Request to save CmItem : {}", cmItemDTO);
        CmItem cmItem = cmItemMapper.toEntity(cmItemDTO);
        cmItem = cmItemRepository.save(cmItem);
        return cmItemMapper.toDto(cmItem);
    }

    /**
     * Get all the cmItems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CmItemDTO> findAll() {
        log.debug("Request to get all CmItems");
        return cmItemRepository.findAll().stream()
            .map(cmItemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cmItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmItemDTO findOne(Long id) {
        log.debug("Request to get CmItem : {}", id);
        CmItem cmItem = cmItemRepository.findOne(id);
        return cmItemMapper.toDto(cmItem);
    }

    /**
     * Delete the cmItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmItem : {}", id);
        cmItemRepository.delete(id);
    }
}
