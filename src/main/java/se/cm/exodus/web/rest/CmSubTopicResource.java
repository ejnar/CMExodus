package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.domain.CmSubTopic;

import se.cm.exodus.repository.CmSubTopicRepository;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmSubTopicDTO;
import se.cm.exodus.service.mapper.CmSubTopicMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CmSubTopic.
 */
@RestController
@RequestMapping("/api")
public class CmSubTopicResource {

    private final Logger log = LoggerFactory.getLogger(CmSubTopicResource.class);

    private static final String ENTITY_NAME = "cmSubTopic";

    private final CmSubTopicRepository cmSubTopicRepository;

    private final CmSubTopicMapper cmSubTopicMapper;

    public CmSubTopicResource(CmSubTopicRepository cmSubTopicRepository, CmSubTopicMapper cmSubTopicMapper) {
        this.cmSubTopicRepository = cmSubTopicRepository;
        this.cmSubTopicMapper = cmSubTopicMapper;
    }

    /**
     * POST  /cm-sub-topics : Create a new cmSubTopic.
     *
     * @param cmSubTopicDTO the cmSubTopicDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmSubTopicDTO, or with status 400 (Bad Request) if the cmSubTopic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-sub-topics")
    @Timed
    public ResponseEntity<CmSubTopicDTO> createCmSubTopic(@Valid @RequestBody CmSubTopicDTO cmSubTopicDTO) throws URISyntaxException {
        log.debug("REST request to save CmSubTopic : {}", cmSubTopicDTO);
        if (cmSubTopicDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmSubTopic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmSubTopic cmSubTopic = cmSubTopicMapper.toEntity(cmSubTopicDTO);
        cmSubTopic = cmSubTopicRepository.save(cmSubTopic);
        CmSubTopicDTO result = cmSubTopicMapper.toDto(cmSubTopic);
        return ResponseEntity.created(new URI("/api/cm-sub-topics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-sub-topics : Updates an existing cmSubTopic.
     *
     * @param cmSubTopicDTO the cmSubTopicDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmSubTopicDTO,
     * or with status 400 (Bad Request) if the cmSubTopicDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmSubTopicDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-sub-topics")
    @Timed
    public ResponseEntity<CmSubTopicDTO> updateCmSubTopic(@Valid @RequestBody CmSubTopicDTO cmSubTopicDTO) throws URISyntaxException {
        log.debug("REST request to update CmSubTopic : {}", cmSubTopicDTO);
        if (cmSubTopicDTO.getId() == null) {
            return createCmSubTopic(cmSubTopicDTO);
        }
        CmSubTopic cmSubTopic = cmSubTopicMapper.toEntity(cmSubTopicDTO);
        cmSubTopic = cmSubTopicRepository.save(cmSubTopic);
        CmSubTopicDTO result = cmSubTopicMapper.toDto(cmSubTopic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmSubTopicDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-sub-topics : get all the cmSubTopics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmSubTopics in body
     */
    @GetMapping("/cm-sub-topics")
    @Timed
    public List<CmSubTopicDTO> getAllCmSubTopics() {
        log.debug("REST request to get all CmSubTopics");
        List<CmSubTopic> cmSubTopics = cmSubTopicRepository.findAll();
        return cmSubTopicMapper.toDto(cmSubTopics);
        }

    /**
     * GET  /cm-sub-topics/:id : get the "id" cmSubTopic.
     *
     * @param id the id of the cmSubTopicDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmSubTopicDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-sub-topics/{id}")
    @Timed
    public ResponseEntity<CmSubTopicDTO> getCmSubTopic(@PathVariable Long id) {
        log.debug("REST request to get CmSubTopic : {}", id);
        CmSubTopic cmSubTopic = cmSubTopicRepository.findOne(id);
        CmSubTopicDTO cmSubTopicDTO = cmSubTopicMapper.toDto(cmSubTopic);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmSubTopicDTO));
    }

    /**
     * DELETE  /cm-sub-topics/:id : delete the "id" cmSubTopic.
     *
     * @param id the id of the cmSubTopicDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-sub-topics/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmSubTopic(@PathVariable Long id) {
        log.debug("REST request to delete CmSubTopic : {}", id);
        cmSubTopicRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
