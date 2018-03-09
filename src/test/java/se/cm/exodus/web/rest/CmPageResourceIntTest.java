package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmPage;
import se.cm.exodus.repository.CmPageRepository;
import se.cm.exodus.service.CmPageService;
import se.cm.exodus.service.dto.CmPageDTO;
import se.cm.exodus.service.mapper.CmPageMapper;
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

import se.cm.exodus.domain.enumeration.PageLayout;
/**
 * Test class for the CmPageResource REST controller.
 *
 * @see CmPageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmPageResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_META_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_META_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_META_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_META_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_SORT = 1;
    private static final Integer UPDATED_SORT = 2;

    private static final PageLayout DEFAULT_LAYOUT = PageLayout.MAIN;
    private static final PageLayout UPDATED_LAYOUT = PageLayout.COLUMN;

    @Autowired
    private CmPageRepository cmPageRepository;

    @Autowired
    private CmPageMapper cmPageMapper;

    @Autowired
    private CmPageService cmPageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmPageMockMvc;

    private CmPage cmPage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmPageResource cmPageResource = new CmPageResource(cmPageService);
        this.restCmPageMockMvc = MockMvcBuilders.standaloneSetup(cmPageResource)
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
    public static CmPage createEntity(EntityManager em) {
        CmPage cmPage = new CmPage()
            .title(DEFAULT_TITLE)
            .metaTitle(DEFAULT_META_TITLE)
            .metaDescription(DEFAULT_META_DESCRIPTION)
            .sort(DEFAULT_SORT)
            .layout(DEFAULT_LAYOUT);
        return cmPage;
    }

    @Before
    public void initTest() {
        cmPage = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmPage() throws Exception {
        int databaseSizeBeforeCreate = cmPageRepository.findAll().size();

        // Create the CmPage
        CmPageDTO cmPageDTO = cmPageMapper.toDto(cmPage);
        restCmPageMockMvc.perform(post("/api/cm-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageDTO)))
            .andExpect(status().isCreated());

        // Validate the CmPage in the database
        List<CmPage> cmPageList = cmPageRepository.findAll();
        assertThat(cmPageList).hasSize(databaseSizeBeforeCreate + 1);
        CmPage testCmPage = cmPageList.get(cmPageList.size() - 1);
        assertThat(testCmPage.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCmPage.getMetaTitle()).isEqualTo(DEFAULT_META_TITLE);
        assertThat(testCmPage.getMetaDescription()).isEqualTo(DEFAULT_META_DESCRIPTION);
        assertThat(testCmPage.getSort()).isEqualTo(DEFAULT_SORT);
        assertThat(testCmPage.getLayout()).isEqualTo(DEFAULT_LAYOUT);
    }

    @Test
    @Transactional
    public void createCmPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmPageRepository.findAll().size();

        // Create the CmPage with an existing ID
        cmPage.setId(1L);
        CmPageDTO cmPageDTO = cmPageMapper.toDto(cmPage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmPageMockMvc.perform(post("/api/cm-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmPage in the database
        List<CmPage> cmPageList = cmPageRepository.findAll();
        assertThat(cmPageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPageRepository.findAll().size();
        // set the field null
        cmPage.setTitle(null);

        // Create the CmPage, which fails.
        CmPageDTO cmPageDTO = cmPageMapper.toDto(cmPage);

        restCmPageMockMvc.perform(post("/api/cm-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageDTO)))
            .andExpect(status().isBadRequest());

        List<CmPage> cmPageList = cmPageRepository.findAll();
        assertThat(cmPageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmPages() throws Exception {
        // Initialize the database
        cmPageRepository.saveAndFlush(cmPage);

        // Get all the cmPageList
        restCmPageMockMvc.perform(get("/api/cm-pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmPage.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].metaTitle").value(hasItem(DEFAULT_META_TITLE.toString())))
            .andExpect(jsonPath("$.[*].metaDescription").value(hasItem(DEFAULT_META_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].sort").value(hasItem(DEFAULT_SORT)))
            .andExpect(jsonPath("$.[*].layout").value(hasItem(DEFAULT_LAYOUT.toString())));
    }

    @Test
    @Transactional
    public void getCmPage() throws Exception {
        // Initialize the database
        cmPageRepository.saveAndFlush(cmPage);

        // Get the cmPage
        restCmPageMockMvc.perform(get("/api/cm-pages/{id}", cmPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmPage.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.metaTitle").value(DEFAULT_META_TITLE.toString()))
            .andExpect(jsonPath("$.metaDescription").value(DEFAULT_META_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.sort").value(DEFAULT_SORT))
            .andExpect(jsonPath("$.layout").value(DEFAULT_LAYOUT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCmPage() throws Exception {
        // Get the cmPage
        restCmPageMockMvc.perform(get("/api/cm-pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmPage() throws Exception {
        // Initialize the database
        cmPageRepository.saveAndFlush(cmPage);
        int databaseSizeBeforeUpdate = cmPageRepository.findAll().size();

        // Update the cmPage
        CmPage updatedCmPage = cmPageRepository.findOne(cmPage.getId());
        // Disconnect from session so that the updates on updatedCmPage are not directly saved in db
        em.detach(updatedCmPage);
        updatedCmPage
            .title(UPDATED_TITLE)
            .metaTitle(UPDATED_META_TITLE)
            .metaDescription(UPDATED_META_DESCRIPTION)
            .sort(UPDATED_SORT)
            .layout(UPDATED_LAYOUT);
        CmPageDTO cmPageDTO = cmPageMapper.toDto(updatedCmPage);

        restCmPageMockMvc.perform(put("/api/cm-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageDTO)))
            .andExpect(status().isOk());

        // Validate the CmPage in the database
        List<CmPage> cmPageList = cmPageRepository.findAll();
        assertThat(cmPageList).hasSize(databaseSizeBeforeUpdate);
        CmPage testCmPage = cmPageList.get(cmPageList.size() - 1);
        assertThat(testCmPage.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCmPage.getMetaTitle()).isEqualTo(UPDATED_META_TITLE);
        assertThat(testCmPage.getMetaDescription()).isEqualTo(UPDATED_META_DESCRIPTION);
        assertThat(testCmPage.getSort()).isEqualTo(UPDATED_SORT);
        assertThat(testCmPage.getLayout()).isEqualTo(UPDATED_LAYOUT);
    }

    @Test
    @Transactional
    public void updateNonExistingCmPage() throws Exception {
        int databaseSizeBeforeUpdate = cmPageRepository.findAll().size();

        // Create the CmPage
        CmPageDTO cmPageDTO = cmPageMapper.toDto(cmPage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmPageMockMvc.perform(put("/api/cm-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageDTO)))
            .andExpect(status().isCreated());

        // Validate the CmPage in the database
        List<CmPage> cmPageList = cmPageRepository.findAll();
        assertThat(cmPageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmPage() throws Exception {
        // Initialize the database
        cmPageRepository.saveAndFlush(cmPage);
        int databaseSizeBeforeDelete = cmPageRepository.findAll().size();

        // Get the cmPage
        restCmPageMockMvc.perform(delete("/api/cm-pages/{id}", cmPage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmPage> cmPageList = cmPageRepository.findAll();
        assertThat(cmPageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmPage.class);
        CmPage cmPage1 = new CmPage();
        cmPage1.setId(1L);
        CmPage cmPage2 = new CmPage();
        cmPage2.setId(cmPage1.getId());
        assertThat(cmPage1).isEqualTo(cmPage2);
        cmPage2.setId(2L);
        assertThat(cmPage1).isNotEqualTo(cmPage2);
        cmPage1.setId(null);
        assertThat(cmPage1).isNotEqualTo(cmPage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmPageDTO.class);
        CmPageDTO cmPageDTO1 = new CmPageDTO();
        cmPageDTO1.setId(1L);
        CmPageDTO cmPageDTO2 = new CmPageDTO();
        assertThat(cmPageDTO1).isNotEqualTo(cmPageDTO2);
        cmPageDTO2.setId(cmPageDTO1.getId());
        assertThat(cmPageDTO1).isEqualTo(cmPageDTO2);
        cmPageDTO2.setId(2L);
        assertThat(cmPageDTO1).isNotEqualTo(cmPageDTO2);
        cmPageDTO1.setId(null);
        assertThat(cmPageDTO1).isNotEqualTo(cmPageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmPageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmPageMapper.fromId(null)).isNull();
    }
}
