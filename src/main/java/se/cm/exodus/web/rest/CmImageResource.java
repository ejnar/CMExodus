package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.service.CmImageService;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.web.rest.util.PaginationUtil;
import se.cm.exodus.service.dto.CmImageDTO;
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
 * REST controller for managing CmImage.
 */
@RestController
@RequestMapping("/api")
public class CmImageResource {

    private final Logger log = LoggerFactory.getLogger(CmImageResource.class);

    private static final String ENTITY_NAME = "cmImage";

    private final CmImageService cmImageService;

    public CmImageResource(CmImageService cmImageService) {
        this.cmImageService = cmImageService;
    }

    /**
     * POST  /cm-images : Create a new cmImage.
     *
     * @param cmImageDTO the cmImageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmImageDTO, or with status 400 (Bad Request) if the cmImage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-images")
    @Timed
    public ResponseEntity<CmImageDTO> createCmImage(@Valid @RequestBody CmImageDTO cmImageDTO) throws URISyntaxException {
        log.debug("REST request to save CmImage : {}", cmImageDTO);
        if (cmImageDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmImageDTO result = cmImageService.save(cmImageDTO);
        return ResponseEntity.created(new URI("/api/cm-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-images : Updates an existing cmImage.
     *
     * @param cmImageDTO the cmImageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmImageDTO,
     * or with status 400 (Bad Request) if the cmImageDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmImageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-images")
    @Timed
    public ResponseEntity<CmImageDTO> updateCmImage(@Valid @RequestBody CmImageDTO cmImageDTO) throws URISyntaxException {
        log.debug("REST request to update CmImage : {}", cmImageDTO);
        if (cmImageDTO.getId() == null) {
            return createCmImage(cmImageDTO);
        }
        CmImageDTO result = cmImageService.save(cmImageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmImageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-images : get all the cmImages.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cmImages in body
     */
    @GetMapping("/cm-images")
    @Timed
    public ResponseEntity<List<CmImageDTO>> getAllCmImages(Pageable pageable) {
        log.debug("REST request to get a page of CmImages");
        Page<CmImageDTO> page = cmImageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cm-images");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cm-images/:id : get the "id" cmImage.
     *
     * @param id the id of the cmImageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmImageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-images/{id}")
    @Timed
    public ResponseEntity<CmImageDTO> getCmImage(@PathVariable Long id) {
        log.debug("REST request to get CmImage : {}", id);
        CmImageDTO cmImageDTO = cmImageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmImageDTO));
    }

    /**
     * DELETE  /cm-images/:id : delete the "id" cmImage.
     *
     * @param id the id of the cmImageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-images/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmImage(@PathVariable Long id) {
        log.debug("REST request to delete CmImage : {}", id);
        cmImageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
