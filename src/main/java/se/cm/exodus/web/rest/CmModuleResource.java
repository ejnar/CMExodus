package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmModuleService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmModuleDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CmModule.
 */
@RestController
@RequestMapping("/api")
public class CmModuleResource {

    private final Logger log = LoggerFactory.getLogger(CmModuleResource.class);

    private static final String ENTITY_NAME = "cmModule";

    private final CmModuleService cmModuleService;

    public CmModuleResource(CmModuleService cmModuleService) {
        this.cmModuleService = cmModuleService;
    }

    /**
     * POST  /cm-modules : Create a new cmModule.
     *
     * @param cmModuleDTO the cmModuleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmModuleDTO, or with status 400 (Bad Request) if the cmModule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-modules")
    @Timed
    public ResponseEntity<CmModuleDTO> createCmModule(@RequestBody CmModuleDTO cmModuleDTO) throws URISyntaxException {
        log.debug("REST request to save CmModule : {}", cmModuleDTO);
        if (cmModuleDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmModuleDTO result = cmModuleService.save(cmModuleDTO);
        return ResponseEntity.created(new URI("/api/cm-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-modules : Updates an existing cmModule.
     *
     * @param cmModuleDTO the cmModuleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmModuleDTO,
     * or with status 400 (Bad Request) if the cmModuleDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmModuleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-modules")
    @Timed
    public ResponseEntity<CmModuleDTO> updateCmModule(@RequestBody CmModuleDTO cmModuleDTO) throws URISyntaxException {
        log.debug("REST request to update CmModule : {}", cmModuleDTO);
        if (cmModuleDTO.getId() == null) {
            return createCmModule(cmModuleDTO);
        }
        CmModuleDTO result = cmModuleService.save(cmModuleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmModuleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-modules : get all the cmModules.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmModules in body
     */
    @GetMapping("/cm-modules")
    @Timed
    public List<CmModuleDTO> getAllCmModules() {
        log.debug("REST request to get all CmModules");
        return cmModuleService.findAll();
        }

    /**
     * GET  /cm-modules/:id : get the "id" cmModule.
     *
     * @param id the id of the cmModuleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmModuleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-modules/{id}")
    @Timed
    public ResponseEntity<CmModuleDTO> getCmModule(@PathVariable Long id) {
        log.debug("REST request to get CmModule : {}", id);
        CmModuleDTO cmModuleDTO = cmModuleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmModuleDTO));
    }

    /**
     * DELETE  /cm-modules/:id : delete the "id" cmModule.
     *
     * @param id the id of the cmModuleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-modules/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmModule(@PathVariable Long id) {
        log.debug("REST request to delete CmModule : {}", id);
        cmModuleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
