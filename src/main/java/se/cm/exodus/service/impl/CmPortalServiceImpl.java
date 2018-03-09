package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmPortalService;
import se.cm.exodus.domain.CmPortal;
import se.cm.exodus.repository.CmPortalRepository;
import se.cm.exodus.service.dto.CmPortalDTO;
import se.cm.exodus.service.mapper.CmPortalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CmPortal.
 */
@Service
@Transactional
public class CmPortalServiceImpl implements CmPortalService {

    private final Logger log = LoggerFactory.getLogger(CmPortalServiceImpl.class);

    private final CmPortalRepository cmPortalRepository;

    private final CmPortalMapper cmPortalMapper;

    public CmPortalServiceImpl(CmPortalRepository cmPortalRepository, CmPortalMapper cmPortalMapper) {
        this.cmPortalRepository = cmPortalRepository;
        this.cmPortalMapper = cmPortalMapper;
    }

    /**
     * Save a cmPortal.
     *
     * @param cmPortalDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmPortalDTO save(CmPortalDTO cmPortalDTO) {
        log.debug("Request to save CmPortal : {}", cmPortalDTO);
        CmPortal cmPortal = cmPortalMapper.toEntity(cmPortalDTO);
        cmPortal = cmPortalRepository.save(cmPortal);
        return cmPortalMapper.toDto(cmPortal);
    }

    /**
     * Get all the cmPortals.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CmPortalDTO> findAll() {
        log.debug("Request to get all CmPortals");
        return cmPortalRepository.findAll().stream()
            .map(cmPortalMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cmPortal by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmPortalDTO findOne(Long id) {
        log.debug("Request to get CmPortal : {}", id);
        CmPortal cmPortal = cmPortalRepository.findOne(id);
        return cmPortalMapper.toDto(cmPortal);
    }

    /**
     * Delete the cmPortal by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmPortal : {}", id);
        cmPortalRepository.delete(id);
    }
}
