package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmItemListService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmItemListDTO;
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
 * REST controller for managing CmItemList.
 */
@RestController
@RequestMapping("/api")
public class CmItemListResource {

    private final Logger log = LoggerFactory.getLogger(CmItemListResource.class);

    private static final String ENTITY_NAME = "cmItemList";

    private final CmItemListService cmItemListService;

    public CmItemListResource(CmItemListService cmItemListService) {
        this.cmItemListService = cmItemListService;
    }

    /**
     * POST  /cm-item-lists : Create a new cmItemList.
     *
     * @param cmItemListDTO the cmItemListDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmItemListDTO, or with status 400 (Bad Request) if the cmItemList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-item-lists")
    @Timed
    public ResponseEntity<CmItemListDTO> createCmItemList(@Valid @RequestBody CmItemListDTO cmItemListDTO) throws URISyntaxException {
        log.debug("REST request to save CmItemList : {}", cmItemListDTO);
        if (cmItemListDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmItemList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmItemListDTO result = cmItemListService.save(cmItemListDTO);
        return ResponseEntity.created(new URI("/api/cm-item-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-item-lists : Updates an existing cmItemList.
     *
     * @param cmItemListDTO the cmItemListDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmItemListDTO,
     * or with status 400 (Bad Request) if the cmItemListDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmItemListDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-item-lists")
    @Timed
    public ResponseEntity<CmItemListDTO> updateCmItemList(@Valid @RequestBody CmItemListDTO cmItemListDTO) throws URISyntaxException {
        log.debug("REST request to update CmItemList : {}", cmItemListDTO);
        if (cmItemListDTO.getId() == null) {
            return createCmItemList(cmItemListDTO);
        }
        CmItemListDTO result = cmItemListService.save(cmItemListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmItemListDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-item-lists : get all the cmItemLists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmItemLists in body
     */
    @GetMapping("/cm-item-lists")
    @Timed
    public List<CmItemListDTO> getAllCmItemLists() {
        log.debug("REST request to get all CmItemLists");
        return cmItemListService.findAll();
        }

    /**
     * GET  /cm-item-lists/:id : get the "id" cmItemList.
     *
     * @param id the id of the cmItemListDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmItemListDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-item-lists/{id}")
    @Timed
    public ResponseEntity<CmItemListDTO> getCmItemList(@PathVariable Long id) {
        log.debug("REST request to get CmItemList : {}", id);
        CmItemListDTO cmItemListDTO = cmItemListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmItemListDTO));
    }

    /**
     * DELETE  /cm-item-lists/:id : delete the "id" cmItemList.
     *
     * @param id the id of the cmItemListDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-item-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmItemList(@PathVariable Long id) {
        log.debug("REST request to delete CmItemList : {}", id);
        cmItemListService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
