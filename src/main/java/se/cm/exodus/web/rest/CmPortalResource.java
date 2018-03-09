package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmPortalService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmPortalDTO;
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
 * REST controller for managing CmPortal.
 */
@RestController
@RequestMapping("/api")
public class CmPortalResource {

    private final Logger log = LoggerFactory.getLogger(CmPortalResource.class);

    private static final String ENTITY_NAME = "cmPortal";

    private final CmPortalService cmPortalService;

    public CmPortalResource(CmPortalService cmPortalService) {
        this.cmPortalService = cmPortalService;
    }

    /**
     * POST  /cm-portals : Create a new cmPortal.
     *
     * @param cmPortalDTO the cmPortalDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmPortalDTO, or with status 400 (Bad Request) if the cmPortal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-portals")
    @Timed
    public ResponseEntity<CmPortalDTO> createCmPortal(@Valid @RequestBody CmPortalDTO cmPortalDTO) throws URISyntaxException {
        log.debug("REST request to save CmPortal : {}", cmPortalDTO);
        if (cmPortalDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmPortal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmPortalDTO result = cmPortalService.save(cmPortalDTO);
        return ResponseEntity.created(new URI("/api/cm-portals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-portals : Updates an existing cmPortal.
     *
     * @param cmPortalDTO the cmPortalDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmPortalDTO,
     * or with status 400 (Bad Request) if the cmPortalDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmPortalDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-portals")
    @Timed
    public ResponseEntity<CmPortalDTO> updateCmPortal(@Valid @RequestBody CmPortalDTO cmPortalDTO) throws URISyntaxException {
        log.debug("REST request to update CmPortal : {}", cmPortalDTO);
        if (cmPortalDTO.getId() == null) {
            return createCmPortal(cmPortalDTO);
        }
        CmPortalDTO result = cmPortalService.save(cmPortalDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmPortalDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-portals : get all the cmPortals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmPortals in body
     */
    @GetMapping("/cm-portals")
    @Timed
    public List<CmPortalDTO> getAllCmPortals() {
        log.debug("REST request to get all CmPortals");
        return cmPortalService.findAll();
        }

    /**
     * GET  /cm-portals/:id : get the "id" cmPortal.
     *
     * @param id the id of the cmPortalDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmPortalDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-portals/{id}")
    @Timed
    public ResponseEntity<CmPortalDTO> getCmPortal(@PathVariable Long id) {
        log.debug("REST request to get CmPortal : {}", id);
        CmPortalDTO cmPortalDTO = cmPortalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmPortalDTO));
    }

    /**
     * DELETE  /cm-portals/:id : delete the "id" cmPortal.
     *
     * @param id the id of the cmPortalDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-portals/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmPortal(@PathVariable Long id) {
        log.debug("REST request to delete CmPortal : {}", id);
        cmPortalService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
