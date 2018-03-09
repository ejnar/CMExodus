package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmTextService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.web.rest.util.PaginationUtil;
import se.cm.exodus.service.dto.CmTextDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CmText.
 */
@RestController
@RequestMapping("/api")
public class CmTextResource {

    private final Logger log = LoggerFactory.getLogger(CmTextResource.class);

    private static final String ENTITY_NAME = "cmText";

    private final CmTextService cmTextService;

    public CmTextResource(CmTextService cmTextService) {
        this.cmTextService = cmTextService;
    }

    /**
     * POST  /cm-texts : Create a new cmText.
     *
     * @param cmTextDTO the cmTextDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmTextDTO, or with status 400 (Bad Request) if the cmText has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-texts")
    @Timed
    public ResponseEntity<CmTextDTO> createCmText(@Valid @RequestBody CmTextDTO cmTextDTO) throws URISyntaxException {
        log.debug("REST request to save CmText : {}", cmTextDTO);
        if (cmTextDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmText cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmTextDTO result = cmTextService.save(cmTextDTO);
        return ResponseEntity.created(new URI("/api/cm-texts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-texts : Updates an existing cmText.
     *
     * @param cmTextDTO the cmTextDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmTextDTO,
     * or with status 400 (Bad Request) if the cmTextDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmTextDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-texts")
    @Timed
    public ResponseEntity<CmTextDTO> updateCmText(@Valid @RequestBody CmTextDTO cmTextDTO) throws URISyntaxException {
        log.debug("REST request to update CmText : {}", cmTextDTO);
        if (cmTextDTO.getId() == null) {
            return createCmText(cmTextDTO);
        }
        CmTextDTO result = cmTextService.save(cmTextDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmTextDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-texts : get all the cmTexts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cmTexts in body
     */
    @GetMapping("/cm-texts")
    @Timed
    public ResponseEntity<List<CmTextDTO>> getAllCmTexts(Pageable pageable) {
        log.debug("REST request to get a page of CmTexts");
        Page<CmTextDTO> page = cmTextService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cm-texts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cm-texts/:id : get the "id" cmText.
     *
     * @param id the id of the cmTextDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmTextDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-texts/{id}")
    @Timed
    public ResponseEntity<CmTextDTO> getCmText(@PathVariable Long id) {
        log.debug("REST request to get CmText : {}", id);
        CmTextDTO cmTextDTO = cmTextService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmTextDTO));
    }

    /**
     * DELETE  /cm-texts/:id : delete the "id" cmText.
     *
     * @param id the id of the cmTextDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-texts/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmText(@PathVariable Long id) {
        log.debug("REST request to delete CmText : {}", id);
        cmTextService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
