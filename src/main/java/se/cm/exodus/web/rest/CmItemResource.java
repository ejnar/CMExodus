package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmItemService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmItemDTO;
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
 * REST controller for managing CmItem.
 */
@RestController
@RequestMapping("/api")
public class CmItemResource {

    private final Logger log = LoggerFactory.getLogger(CmItemResource.class);

    private static final String ENTITY_NAME = "cmItem";

    private final CmItemService cmItemService;

    public CmItemResource(CmItemService cmItemService) {
        this.cmItemService = cmItemService;
    }

    /**
     * POST  /cm-items : Create a new cmItem.
     *
     * @param cmItemDTO the cmItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmItemDTO, or with status 400 (Bad Request) if the cmItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-items")
    @Timed
    public ResponseEntity<CmItemDTO> createCmItem(@RequestBody CmItemDTO cmItemDTO) throws URISyntaxException {
        log.debug("REST request to save CmItem : {}", cmItemDTO);
        if (cmItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmItemDTO result = cmItemService.save(cmItemDTO);
        return ResponseEntity.created(new URI("/api/cm-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-items : Updates an existing cmItem.
     *
     * @param cmItemDTO the cmItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmItemDTO,
     * or with status 400 (Bad Request) if the cmItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-items")
    @Timed
    public ResponseEntity<CmItemDTO> updateCmItem(@RequestBody CmItemDTO cmItemDTO) throws URISyntaxException {
        log.debug("REST request to update CmItem : {}", cmItemDTO);
        if (cmItemDTO.getId() == null) {
            return createCmItem(cmItemDTO);
        }
        CmItemDTO result = cmItemService.save(cmItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-items : get all the cmItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmItems in body
     */
    @GetMapping("/cm-items")
    @Timed
    public List<CmItemDTO> getAllCmItems() {
        log.debug("REST request to get all CmItems");
        return cmItemService.findAll();
        }

    /**
     * GET  /cm-items/:id : get the "id" cmItem.
     *
     * @param id the id of the cmItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-items/{id}")
    @Timed
    public ResponseEntity<CmItemDTO> getCmItem(@PathVariable Long id) {
        log.debug("REST request to get CmItem : {}", id);
        CmItemDTO cmItemDTO = cmItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmItemDTO));
    }

    /**
     * DELETE  /cm-items/:id : delete the "id" cmItem.
     *
     * @param id the id of the cmItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmItem(@PathVariable Long id) {
        log.debug("REST request to delete CmItem : {}", id);
        cmItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
