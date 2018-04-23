package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmPageService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.web.rest.util.PaginationUtil;
import se.cm.exodus.service.dto.CmPageDTO;
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
 * REST controller for managing CmPage.
 */
@RestController
@RequestMapping("/api")
public class CmPageResource {

    private final Logger log = LoggerFactory.getLogger(CmPageResource.class);

    private static final String ENTITY_NAME = "cmPage";

    private final CmPageService cmPageService;

    public CmPageResource(CmPageService cmPageService) {
        this.cmPageService = cmPageService;
    }

    /**
     * POST  /cm-pages : Create a new cmPage.
     *
     * @param cmPageDTO the cmPageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmPageDTO, or with status 400 (Bad Request) if the cmPage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-pages")
    @Timed
    public ResponseEntity<CmPageDTO> createCmPage(@Valid @RequestBody CmPageDTO cmPageDTO) throws URISyntaxException {
        log.debug("REST request to save CmPage : {}", cmPageDTO);
        if (cmPageDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmPage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmPageDTO result = cmPageService.save(cmPageDTO);
        return ResponseEntity.created(new URI("/api/cm-pages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-pages : Updates an existing cmPage.
     *
     * @param cmPageDTO the cmPageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmPageDTO,
     * or with status 400 (Bad Request) if the cmPageDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmPageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-pages")
    @Timed
    public ResponseEntity<CmPageDTO> updateCmPage(@Valid @RequestBody CmPageDTO cmPageDTO) throws URISyntaxException {
        log.debug("REST request to update CmPage : {}", cmPageDTO);
        if (cmPageDTO.getId() == null) {
            return createCmPage(cmPageDTO);
        }
        CmPageDTO result = cmPageService.save(cmPageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmPageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-pages : get all the cmPages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cmPages in body
     */
    @GetMapping("/cm-pages")
    @Timed
    public ResponseEntity<List<CmPageDTO>> getAllCmPages(Pageable pageable) {
        log.debug("REST request to get a page of CmPages");
        Page<CmPageDTO> page = cmPageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cm-pages");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     *
     * @return
     */
    @GetMapping("/cm-pages/user")
    @Timed
    public List<CmPageDTO> getCmPagesByUser() {
        log.debug("REST request to get a page of CmPages");
        return cmPageService.findByLoggedInUser();
    }

    /**
     * GET  /cm-pages/:id : get the "id" cmPage.
     *
     * @param id the id of the cmPageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmPageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-pages/{id}")
    @Timed
    public ResponseEntity<CmPageDTO> getCmPage(@PathVariable Long id) {
        log.debug("REST request to get CmPage : {}", id);
        CmPageDTO cmPageDTO = cmPageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmPageDTO));
    }

    /**
     * DELETE  /cm-pages/:id : delete the "id" cmPage.
     *
     * @param id the id of the cmPageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-pages/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmPage(@PathVariable Long id) {
        log.debug("REST request to delete CmPage : {}", id);
        cmPageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
