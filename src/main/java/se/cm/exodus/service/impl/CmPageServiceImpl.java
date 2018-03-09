package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmPageService;
import se.cm.exodus.domain.CmPage;
import se.cm.exodus.repository.CmPageRepository;
import se.cm.exodus.service.dto.CmPageDTO;
import se.cm.exodus.service.mapper.CmPageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CmPage.
 */
@Service
@Transactional
public class CmPageServiceImpl implements CmPageService {

    private final Logger log = LoggerFactory.getLogger(CmPageServiceImpl.class);

    private final CmPageRepository cmPageRepository;

    private final CmPageMapper cmPageMapper;

    public CmPageServiceImpl(CmPageRepository cmPageRepository, CmPageMapper cmPageMapper) {
        this.cmPageRepository = cmPageRepository;
        this.cmPageMapper = cmPageMapper;
    }

    /**
     * Save a cmPage.
     *
     * @param cmPageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmPageDTO save(CmPageDTO cmPageDTO) {
        log.debug("Request to save CmPage : {}", cmPageDTO);
        CmPage cmPage = cmPageMapper.toEntity(cmPageDTO);
        cmPage = cmPageRepository.save(cmPage);
        return cmPageMapper.toDto(cmPage);
    }

    /**
     * Get all the cmPages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CmPageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CmPages");
        return cmPageRepository.findAll(pageable)
            .map(cmPageMapper::toDto);
    }

    /**
     * Get one cmPage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmPageDTO findOne(Long id) {
        log.debug("Request to get CmPage : {}", id);
        CmPage cmPage = cmPageRepository.findOneWithEagerRelationships(id);
        return cmPageMapper.toDto(cmPage);
    }

    /**
     * Delete the cmPage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmPage : {}", id);
        cmPageRepository.delete(id);
    }
}
