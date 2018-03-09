package se.cm.exodus.web.rest;

import com.codahale.metrics.annotation.Timed;
import se.cm.exodus.domain.CmPageAuthority;

import se.cm.exodus.repository.CmPageAuthorityRepository;
import se.cm.exodus.web.rest.errors.BadRequestAlertException;
import se.cm.exodus.web.rest.util.HeaderUtil;
import se.cm.exodus.service.dto.CmPageAuthorityDTO;
import se.cm.exodus.service.mapper.CmPageAuthorityMapper;
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
 * REST controller for managing CmPageAuthority.
 */
@RestController
@RequestMapping("/api")
public class CmPageAuthorityResource {

    private final Logger log = LoggerFactory.getLogger(CmPageAuthorityResource.class);

    private static final String ENTITY_NAME = "cmPageAuthority";

    private final CmPageAuthorityRepository cmPageAuthorityRepository;

    private final CmPageAuthorityMapper cmPageAuthorityMapper;

    public CmPageAuthorityResource(CmPageAuthorityRepository cmPageAuthorityRepository, CmPageAuthorityMapper cmPageAuthorityMapper) {
        this.cmPageAuthorityRepository = cmPageAuthorityRepository;
        this.cmPageAuthorityMapper = cmPageAuthorityMapper;
    }

    /**
     * POST  /cm-page-authorities : Create a new cmPageAuthority.
     *
     * @param cmPageAuthorityDTO the cmPageAuthorityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cmPageAuthorityDTO, or with status 400 (Bad Request) if the cmPageAuthority has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cm-page-authorities")
    @Timed
    public ResponseEntity<CmPageAuthorityDTO> createCmPageAuthority(@Valid @RequestBody CmPageAuthorityDTO cmPageAuthorityDTO) throws URISyntaxException {
        log.debug("REST request to save CmPageAuthority : {}", cmPageAuthorityDTO);
        if (cmPageAuthorityDTO.getId() != null) {
            throw new BadRequestAlertException("A new cmPageAuthority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CmPageAuthority cmPageAuthority = cmPageAuthorityMapper.toEntity(cmPageAuthorityDTO);
        cmPageAuthority = cmPageAuthorityRepository.save(cmPageAuthority);
        CmPageAuthorityDTO result = cmPageAuthorityMapper.toDto(cmPageAuthority);
        return ResponseEntity.created(new URI("/api/cm-page-authorities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cm-page-authorities : Updates an existing cmPageAuthority.
     *
     * @param cmPageAuthorityDTO the cmPageAuthorityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cmPageAuthorityDTO,
     * or with status 400 (Bad Request) if the cmPageAuthorityDTO is not valid,
     * or with status 500 (Internal Server Error) if the cmPageAuthorityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cm-page-authorities")
    @Timed
    public ResponseEntity<CmPageAuthorityDTO> updateCmPageAuthority(@Valid @RequestBody CmPageAuthorityDTO cmPageAuthorityDTO) throws URISyntaxException {
        log.debug("REST request to update CmPageAuthority : {}", cmPageAuthorityDTO);
        if (cmPageAuthorityDTO.getId() == null) {
            return createCmPageAuthority(cmPageAuthorityDTO);
        }
        CmPageAuthority cmPageAuthority = cmPageAuthorityMapper.toEntity(cmPageAuthorityDTO);
        cmPageAuthority = cmPageAuthorityRepository.save(cmPageAuthority);
        CmPageAuthorityDTO result = cmPageAuthorityMapper.toDto(cmPageAuthority);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cmPageAuthorityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cm-page-authorities : get all the cmPageAuthorities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cmPageAuthorities in body
     */
    @GetMapping("/cm-page-authorities")
    @Timed
    public List<CmPageAuthorityDTO> getAllCmPageAuthorities() {
        log.debug("REST request to get all CmPageAuthorities");
        List<CmPageAuthority> cmPageAuthorities = cmPageAuthorityRepository.findAll();
        return cmPageAuthorityMapper.toDto(cmPageAuthorities);
        }

    /**
     * GET  /cm-page-authorities/:id : get the "id" cmPageAuthority.
     *
     * @param id the id of the cmPageAuthorityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cmPageAuthorityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cm-page-authorities/{id}")
    @Timed
    public ResponseEntity<CmPageAuthorityDTO> getCmPageAuthority(@PathVariable Long id) {
        log.debug("REST request to get CmPageAuthority : {}", id);
        CmPageAuthority cmPageAuthority = cmPageAuthorityRepository.findOne(id);
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(cmPageAuthority);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cmPageAuthorityDTO));
    }

    /**
     * DELETE  /cm-page-authorities/:id : delete the "id" cmPageAuthority.
     *
     * @param id the id of the cmPageAuthorityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cm-page-authorities/{id}")
    @Timed
    public ResponseEntity<Void> deleteCmPageAuthority(@PathVariable Long id) {
        log.debug("REST request to delete CmPageAuthority : {}", id);
        cmPageAuthorityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
