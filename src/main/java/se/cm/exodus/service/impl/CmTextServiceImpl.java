package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmTextService;
import se.cm.exodus.domain.CmText;
import se.cm.exodus.repository.CmTextRepository;
import se.cm.exodus.service.dto.CmTextDTO;
import se.cm.exodus.service.mapper.CmTextMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CmText.
 */
@Service
@Transactional
public class CmTextServiceImpl implements CmTextService {

    private final Logger log = LoggerFactory.getLogger(CmTextServiceImpl.class);

    private final CmTextRepository cmTextRepository;

    private final CmTextMapper cmTextMapper;

    public CmTextServiceImpl(CmTextRepository cmTextRepository, CmTextMapper cmTextMapper) {
        this.cmTextRepository = cmTextRepository;
        this.cmTextMapper = cmTextMapper;
    }

    /**
     * Save a cmText.
     *
     * @param cmTextDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmTextDTO save(CmTextDTO cmTextDTO) {
        log.debug("Request to save CmText : {}", cmTextDTO);
        CmText cmText = cmTextMapper.toEntity(cmTextDTO);
        cmText = cmTextRepository.save(cmText);
        return cmTextMapper.toDto(cmText);
    }

    /**
     * Get all the cmTexts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CmTextDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CmTexts");
        return cmTextRepository.findAll(pageable)
            .map(cmTextMapper::toDto);
    }

    /**
     * Get one cmText by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmTextDTO findOne(Long id) {
        log.debug("Request to get CmText : {}", id);
        CmText cmText = cmTextRepository.findOne(id);
        return cmTextMapper.toDto(cmText);
    }

    /**
     * Delete the cmText by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmText : {}", id);
        cmTextRepository.delete(id);
    }
}
