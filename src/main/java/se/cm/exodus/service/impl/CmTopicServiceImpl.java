package se.cm.exodus.service.impl;

import se.cm.exodus.service.CmTopicService;
import se.cm.exodus.domain.CmTopic;
import se.cm.exodus.repository.CmTopicRepository;
import se.cm.exodus.service.dto.CmTopicDTO;
import se.cm.exodus.service.mapper.CmTopicMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CmTopic.
 */
@Service
@Transactional
public class CmTopicServiceImpl implements CmTopicService {

    private final Logger log = LoggerFactory.getLogger(CmTopicServiceImpl.class);

    private final CmTopicRepository cmTopicRepository;

    private final CmTopicMapper cmTopicMapper;

    public CmTopicServiceImpl(CmTopicRepository cmTopicRepository, CmTopicMapper cmTopicMapper) {
        this.cmTopicRepository = cmTopicRepository;
        this.cmTopicMapper = cmTopicMapper;
    }

    /**
     * Save a cmTopic.
     *
     * @param cmTopicDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CmTopicDTO save(CmTopicDTO cmTopicDTO) {
        log.debug("Request to save CmTopic : {}", cmTopicDTO);
        CmTopic cmTopic = cmTopicMapper.toEntity(cmTopicDTO);
        cmTopic = cmTopicRepository.save(cmTopic);
        return cmTopicMapper.toDto(cmTopic);
    }

    /**
     * Get all the cmTopics.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CmTopicDTO> findAll() {
        log.debug("Request to get all CmTopics");
        return cmTopicRepository.findAll().stream()
            .map(cmTopicMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one cmTopic by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CmTopicDTO findOne(Long id) {
        log.debug("Request to get CmTopic : {}", id);
        CmTopic cmTopic = cmTopicRepository.findOne(id);
        return cmTopicMapper.toDto(cmTopic);
    }

    /**
     * Delete the cmTopic by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmTopic : {}", id);
        cmTopicRepository.delete(id);
    }
}
