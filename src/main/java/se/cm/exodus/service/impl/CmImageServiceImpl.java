package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmImageService;
import se.cm.exodus.domain.CmImage;
import se.cm.exodus.repository.CmImageRepository;
import se.cm.exodus.service.dto.CmImageDTO;
import se.cm.exodus.service.mapper.CmImageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CmImage.
 */
@Service
@Transactional
public class CmImageServiceImpl implements CmImageService {

    private final Logger log = LoggerFactory.getLogger(CmImageServiceImpl.class);

    private final CmImageRepository cmImageRepository;

    private final CmImageMapper cmImageMapper;

    public CmImageServiceImpl(CmImageRepository cmImageRepository, CmImageMapper cmImageMapper) {
        this.cmImageRepository = cmImageRepository;
        this.cmImageMapper = cmImageMapper;
    }

    /**
     * Save a cmImage.
     *
     * @param cmImageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmImageDTO save(CmImageDTO cmImageDTO) {
        log.debug("Request to save CmImage : {}", cmImageDTO);
        CmImage cmImage = cmImageMapper.toEntity(cmImageDTO);

        if(cmImage.getData().length > 0){
            cmImage.setDataSaved(true);
        }

        cmImage = cmImageRepository.save(cmImage);
        return cmImageMapper.toDto(cmImage);
    }

    /**
     * Get all the cmImages.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CmImageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CmImages");
        return cmImageRepository.findAll(pageable)
            .map(cmImageMapper::toDto);
    }

    /**
     * Get one cmImage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmImageDTO findOne(Long id) {
        log.debug("Request to get CmImage : {}", id);
        CmImage cmImage = cmImageRepository.findOne(id);
        return cmImageMapper.toDto(cmImage);
    }

    /**
     * Delete the cmImage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmImage : {}", id);
        cmImageRepository.delete(id);
    }
}
