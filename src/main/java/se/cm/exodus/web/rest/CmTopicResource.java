package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmTopicService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmTopicDTO;
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
 * REST controller for managing CmTopic.
 */
@RestController
@RequestMapping("/api")
public class CmTopicResource {

    private final Logger log = LoggerFactory.getLogger(CmTopicResource.class);

    private static final String ENTITY_NAME = "cmTopic";

    private final CmTopicService cmTopicService;

    public CmTopicResource(CmTopicService cmTopicService) {
        this.cmTopicService = cmTopicService;
    }

    /**
     * POST  /cm-topics : Create a new cmTopic.
     *
     * @param cmTopicDTO the cmTopicDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmTopicDTO, or with status 400 (Bad Request) if the cmTopic has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-topics")
    @Timed
    public ResponseEntity<CmTopicDTO> createCmTopic(@Valid @RequestBody CmTopicDTO cmTopicDTO) throws URISyntaxException {
        log.debug("REST request to save CmTopic : {}", cmTopicDTO);
        if (cmTopicDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmTopic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmTopicDTO result = cmTopicService.save(cmTopicDTO);
        return ResponseEntity.created(new URI("/api/cm-topics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-topics : Updates an existing cmTopic.
     *
     * @param cmTopicDTO the cmTopicDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmTopicDTO,
     * or with status 400 (Bad Request) if the cmTopicDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmTopicDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-topics")
    @Timed
    public ResponseEntity<CmTopicDTO> updateCmTopic(@Valid @RequestBody CmTopicDTO cmTopicDTO) throws URISyntaxException {
        log.debug("REST request to update CmTopic : {}", cmTopicDTO);
        if (cmTopicDTO.getId() == null) {
            return createCmTopic(cmTopicDTO);
        }
        CmTopicDTO result = cmTopicService.save(cmTopicDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmTopicDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-topics : get all the cmTopics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmTopics in body
     */
    @GetMapping("/cm-topics")
    @Timed
    public List<CmTopicDTO> getAllCmTopics() {
        log.debug("REST request to get all CmTopics");
        return cmTopicService.findAll();
        }

    /**
     * GET  /cm-topics/:id : get the "id" cmTopic.
     *
     * @param id the id of the cmTopicDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmTopicDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-topics/{id}")
    @Timed
    public ResponseEntity<CmTopicDTO> getCmTopic(@PathVariable Long id) {
        log.debug("REST request to get CmTopic : {}", id);
        CmTopicDTO cmTopicDTO = cmTopicService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmTopicDTO));
    }

    /**
     * DELETE  /cm-topics/:id : delete the "id" cmTopic.
     *
     * @param id the id of the cmTopicDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-topics/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmTopic(@PathVariable Long id) {
        log.debug("REST request to delete CmTopic : {}", id);
        cmTopicService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
