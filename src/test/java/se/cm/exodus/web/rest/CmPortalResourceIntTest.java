package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmPortal;
import se.cm.exodus.repository.CmPortalRepository;
import se.cm.exodus.service.CmPortalService;
import se.cm.exodus.service.dto.CmPortalDTO;
import se.cm.exodus.service.mapper.CmPortalMapper;
import se.cm.exodus.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static se.cm.exodus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CmPortalResource REST controller.
 *
 * @see CmPortalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmPortalResourceIntTest {

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_META_NAME = "AAAAAAAAAA";
    private static final String UPDATED_META_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_META_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_META_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_META_APPLICATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_META_APPLICATION_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_META_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_META_KEYWORDS = "BBBBBBBBBB";

    private static final String DEFAULT_META_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_META_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CmPortalRepository cmPortalRepository;

    @Autowired
    private CmPortalMapper cmPortalMapper;

    @Autowired
    private CmPortalService cmPortalService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmPortalMockMvc;

    private CmPortal cmPortal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmPortalResource cmPortalResource = new CmPortalResource(cmPortalService);
        this.restCmPortalMockMvc = MockMvcBuilders.standaloneSetup(cmPortalResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CmPortal createEntity(EntityManager em) {
        CmPortal cmPortal = new CmPortal()
            .key(DEFAULT_KEY)
            .contentPath(DEFAULT_CONTENT_PATH)
            .name(DEFAULT_NAME)
            .metaName(DEFAULT_META_NAME)
            .metaTitle(DEFAULT_META_TITLE)
            .metaApplicationName(DEFAULT_META_APPLICATION_NAME)
            .metaKeywords(DEFAULT_META_KEYWORDS)
            .metaDescription(DEFAULT_META_DESCRIPTION);
        return cmPortal;
    }

    @Before
    public void initTest() {
        cmPortal = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmPortal() throws Exception {
        int databaseSizeBeforeCreate = cmPortalRepository.findAll().size();

        // Create the CmPortal
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);
        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isCreated());

        // Validate the CmPortal in the database
        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeCreate + 1);
        CmPortal testCmPortal = cmPortalList.get(cmPortalList.size() - 1);
        assertThat(testCmPortal.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testCmPortal.getContentPath()).isEqualTo(DEFAULT_CONTENT_PATH);
        assertThat(testCmPortal.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCmPortal.getMetaName()).isEqualTo(DEFAULT_META_NAME);
        assertThat(testCmPortal.getMetaTitle()).isEqualTo(DEFAULT_META_TITLE);
        assertThat(testCmPortal.getMetaApplicationName()).isEqualTo(DEFAULT_META_APPLICATION_NAME);
        assertThat(testCmPortal.getMetaKeywords()).isEqualTo(DEFAULT_META_KEYWORDS);
        assertThat(testCmPortal.getMetaDescription()).isEqualTo(DEFAULT_META_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createCmPortalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmPortalRepository.findAll().size();

        // Create the CmPortal with an existing ID
        cmPortal.setId(1L);
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmPortal in the database
        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkKeyIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPortalRepository.findAll().size();
        // set the field null
        cmPortal.setKey(null);

        // Create the CmPortal, which fails.
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContentPathIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPortalRepository.findAll().size();
        // set the field null
        cmPortal.setContentPath(null);

        // Create the CmPortal, which fails.
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPortalRepository.findAll().size();
        // set the field null
        cmPortal.setName(null);

        // Create the CmPortal, which fails.
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMetaNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPortalRepository.findAll().size();
        // set the field null
        cmPortal.setMetaName(null);

        // Create the CmPortal, which fails.
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMetaApplicationNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPortalRepository.findAll().size();
        // set the field null
        cmPortal.setMetaApplicationName(null);

        // Create the CmPortal, which fails.
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMetaKeywordsIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPortalRepository.findAll().size();
        // set the field null
        cmPortal.setMetaKeywords(null);

        // Create the CmPortal, which fails.
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        restCmPortalMockMvc.perform(post("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isBadRequest());

        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmPortals() throws Exception {
        // Initialize the database
        cmPortalRepository.saveAndFlush(cmPortal);

        // Get all the cmPortalList
        restCmPortalMockMvc.perform(get("/api/cm-portals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmPortal.getId().intValue())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY.toString())))
            .andExpect(jsonPath("$.[*].contentPath").value(hasItem(DEFAULT_CONTENT_PATH.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].metaName").value(hasItem(DEFAULT_META_NAME.toString())))
            .andExpect(jsonPath("$.[*].metaTitle").value(hasItem(DEFAULT_META_TITLE.toString())))
            .andExpect(jsonPath("$.[*].metaApplicationName").value(hasItem(DEFAULT_META_APPLICATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].metaKeywords").value(hasItem(DEFAULT_META_KEYWORDS.toString())))
            .andExpect(jsonPath("$.[*].metaDescription").value(hasItem(DEFAULT_META_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getCmPortal() throws Exception {
        // Initialize the database
        cmPortalRepository.saveAndFlush(cmPortal);

        // Get the cmPortal
        restCmPortalMockMvc.perform(get("/api/cm-portals/{id}", cmPortal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmPortal.getId().intValue()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY.toString()))
            .andExpect(jsonPath("$.contentPath").value(DEFAULT_CONTENT_PATH.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.metaName").value(DEFAULT_META_NAME.toString()))
            .andExpect(jsonPath("$.metaTitle").value(DEFAULT_META_TITLE.toString()))
            .andExpect(jsonPath("$.metaApplicationName").value(DEFAULT_META_APPLICATION_NAME.toString()))
            .andExpect(jsonPath("$.metaKeywords").value(DEFAULT_META_KEYWORDS.toString()))
            .andExpect(jsonPath("$.metaDescription").value(DEFAULT_META_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCmPortal() throws Exception {
        // Get the cmPortal
        restCmPortalMockMvc.perform(get("/api/cm-portals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmPortal() throws Exception {
        // Initialize the database
        cmPortalRepository.saveAndFlush(cmPortal);
        int databaseSizeBeforeUpdate = cmPortalRepository.findAll().size();

        // Update the cmPortal
        CmPortal updatedCmPortal = cmPortalRepository.findOne(cmPortal.getId());
        // Disconnect from session so that the updates on updatedCmPortal are not directly saved in db
        em.detach(updatedCmPortal);
        updatedCmPortal
            .key(UPDATED_KEY)
            .contentPath(UPDATED_CONTENT_PATH)
            .name(UPDATED_NAME)
            .metaName(UPDATED_META_NAME)
            .metaTitle(UPDATED_META_TITLE)
            .metaApplicationName(UPDATED_META_APPLICATION_NAME)
            .metaKeywords(UPDATED_META_KEYWORDS)
            .metaDescription(UPDATED_META_DESCRIPTION);
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(updatedCmPortal);

        restCmPortalMockMvc.perform(put("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isOk());

        // Validate the CmPortal in the database
        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeUpdate);
        CmPortal testCmPortal = cmPortalList.get(cmPortalList.size() - 1);
        assertThat(testCmPortal.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testCmPortal.getContentPath()).isEqualTo(UPDATED_CONTENT_PATH);
        assertThat(testCmPortal.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCmPortal.getMetaName()).isEqualTo(UPDATED_META_NAME);
        assertThat(testCmPortal.getMetaTitle()).isEqualTo(UPDATED_META_TITLE);
        assertThat(testCmPortal.getMetaApplicationName()).isEqualTo(UPDATED_META_APPLICATION_NAME);
        assertThat(testCmPortal.getMetaKeywords()).isEqualTo(UPDATED_META_KEYWORDS);
        assertThat(testCmPortal.getMetaDescription()).isEqualTo(UPDATED_META_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCmPortal() throws Exception {
        int databaseSizeBeforeUpdate = cmPortalRepository.findAll().size();

        // Create the CmPortal
        CmPortalDTO cmPortalDTO = cmPortalMapper.toDto(cmPortal);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmPortalMockMvc.perform(put("/api/cm-portals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPortalDTO)))
            .andExpect(status().isCreated());

        // Validate the CmPortal in the database
        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmPortal() throws Exception {
        // Initialize the database
        cmPortalRepository.saveAndFlush(cmPortal);
        int databaseSizeBeforeDelete = cmPortalRepository.findAll().size();

        // Get the cmPortal
        restCmPortalMockMvc.perform(delete("/api/cm-portals/{id}", cmPortal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmPortal> cmPortalList = cmPortalRepository.findAll();
        assertThat(cmPortalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmPortal.class);
        CmPortal cmPortal1 = new CmPortal();
        cmPortal1.setId(1L);
        CmPortal cmPortal2 = new CmPortal();
        cmPortal2.setId(cmPortal1.getId());
        assertThat(cmPortal1).isEqualTo(cmPortal2);
        cmPortal2.setId(2L);
        assertThat(cmPortal1).isNotEqualTo(cmPortal2);
        cmPortal1.setId(null);
        assertThat(cmPortal1).isNotEqualTo(cmPortal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmPortalDTO.class);
        CmPortalDTO cmPortalDTO1 = new CmPortalDTO();
        cmPortalDTO1.setId(1L);
        CmPortalDTO cmPortalDTO2 = new CmPortalDTO();
        assertThat(cmPortalDTO1).isNotEqualTo(cmPortalDTO2);
        cmPortalDTO2.setId(cmPortalDTO1.getId());
        assertThat(cmPortalDTO1).isEqualTo(cmPortalDTO2);
        cmPortalDTO2.setId(2L);
        assertThat(cmPortalDTO1).isNotEqualTo(cmPortalDTO2);
        cmPortalDTO1.setId(null);
        assertThat(cmPortalDTO1).isNotEqualTo(cmPortalDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmPortalMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmPortalMapper.fromId(null)).isNull();
    }
}
