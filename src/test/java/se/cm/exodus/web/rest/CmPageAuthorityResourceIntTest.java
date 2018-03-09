package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmPageAuthority;
import se.cm.exodus.repository.CmPageAuthorityRepository;
import se.cm.exodus.service.dto.CmPageAuthorityDTO;
import se.cm.exodus.service.mapper.CmPageAuthorityMapper;
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
 * Test class for the CmPageAuthorityResource REST controller.
 *
 * @see CmPageAuthorityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmPageAuthorityResourceIntTest {

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    @Autowired
    private CmPageAuthorityRepository cmPageAuthorityRepository;

    @Autowired
    private CmPageAuthorityMapper cmPageAuthorityMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmPageAuthorityMockMvc;

    private CmPageAuthority cmPageAuthority;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmPageAuthorityResource cmPageAuthorityResource = new CmPageAuthorityResource(cmPageAuthorityRepository, cmPageAuthorityMapper);
        this.restCmPageAuthorityMockMvc = MockMvcBuilders.standaloneSetup(cmPageAuthorityResource)
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
    public static CmPageAuthority createEntity(EntityManager em) {
        CmPageAuthority cmPageAuthority = new CmPageAuthority()
            .user(DEFAULT_USER)
            .role(DEFAULT_ROLE);
        return cmPageAuthority;
    }

    @Before
    public void initTest() {
        cmPageAuthority = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmPageAuthority() throws Exception {
        int databaseSizeBeforeCreate = cmPageAuthorityRepository.findAll().size();

        // Create the CmPageAuthority
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(cmPageAuthority);
        restCmPageAuthorityMockMvc.perform(post("/api/cm-page-authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageAuthorityDTO)))
            .andExpect(status().isCreated());

        // Validate the CmPageAuthority in the database
        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeCreate + 1);
        CmPageAuthority testCmPageAuthority = cmPageAuthorityList.get(cmPageAuthorityList.size() - 1);
        assertThat(testCmPageAuthority.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testCmPageAuthority.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createCmPageAuthorityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmPageAuthorityRepository.findAll().size();

        // Create the CmPageAuthority with an existing ID
        cmPageAuthority.setId(1L);
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(cmPageAuthority);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmPageAuthorityMockMvc.perform(post("/api/cm-page-authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageAuthorityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmPageAuthority in the database
        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUserIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPageAuthorityRepository.findAll().size();
        // set the field null
        cmPageAuthority.setUser(null);

        // Create the CmPageAuthority, which fails.
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(cmPageAuthority);

        restCmPageAuthorityMockMvc.perform(post("/api/cm-page-authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageAuthorityDTO)))
            .andExpect(status().isBadRequest());

        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRoleIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmPageAuthorityRepository.findAll().size();
        // set the field null
        cmPageAuthority.setRole(null);

        // Create the CmPageAuthority, which fails.
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(cmPageAuthority);

        restCmPageAuthorityMockMvc.perform(post("/api/cm-page-authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageAuthorityDTO)))
            .andExpect(status().isBadRequest());

        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmPageAuthorities() throws Exception {
        // Initialize the database
        cmPageAuthorityRepository.saveAndFlush(cmPageAuthority);

        // Get all the cmPageAuthorityList
        restCmPageAuthorityMockMvc.perform(get("/api/cm-page-authorities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmPageAuthority.getId().intValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }

    @Test
    @Transactional
    public void getCmPageAuthority() throws Exception {
        // Initialize the database
        cmPageAuthorityRepository.saveAndFlush(cmPageAuthority);

        // Get the cmPageAuthority
        restCmPageAuthorityMockMvc.perform(get("/api/cm-page-authorities/{id}", cmPageAuthority.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmPageAuthority.getId().intValue()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCmPageAuthority() throws Exception {
        // Get the cmPageAuthority
        restCmPageAuthorityMockMvc.perform(get("/api/cm-page-authorities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmPageAuthority() throws Exception {
        // Initialize the database
        cmPageAuthorityRepository.saveAndFlush(cmPageAuthority);
        int databaseSizeBeforeUpdate = cmPageAuthorityRepository.findAll().size();

        // Update the cmPageAuthority
        CmPageAuthority updatedCmPageAuthority = cmPageAuthorityRepository.findOne(cmPageAuthority.getId());
        // Disconnect from session so that the updates on updatedCmPageAuthority are not directly saved in db
        em.detach(updatedCmPageAuthority);
        updatedCmPageAuthority
            .user(UPDATED_USER)
            .role(UPDATED_ROLE);
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(updatedCmPageAuthority);

        restCmPageAuthorityMockMvc.perform(put("/api/cm-page-authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageAuthorityDTO)))
            .andExpect(status().isOk());

        // Validate the CmPageAuthority in the database
        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeUpdate);
        CmPageAuthority testCmPageAuthority = cmPageAuthorityList.get(cmPageAuthorityList.size() - 1);
        assertThat(testCmPageAuthority.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testCmPageAuthority.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingCmPageAuthority() throws Exception {
        int databaseSizeBeforeUpdate = cmPageAuthorityRepository.findAll().size();

        // Create the CmPageAuthority
        CmPageAuthorityDTO cmPageAuthorityDTO = cmPageAuthorityMapper.toDto(cmPageAuthority);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmPageAuthorityMockMvc.perform(put("/api/cm-page-authorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmPageAuthorityDTO)))
            .andExpect(status().isCreated());

        // Validate the CmPageAuthority in the database
        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmPageAuthority() throws Exception {
        // Initialize the database
        cmPageAuthorityRepository.saveAndFlush(cmPageAuthority);
        int databaseSizeBeforeDelete = cmPageAuthorityRepository.findAll().size();

        // Get the cmPageAuthority
        restCmPageAuthorityMockMvc.perform(delete("/api/cm-page-authorities/{id}", cmPageAuthority.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmPageAuthority> cmPageAuthorityList = cmPageAuthorityRepository.findAll();
        assertThat(cmPageAuthorityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmPageAuthority.class);
        CmPageAuthority cmPageAuthority1 = new CmPageAuthority();
        cmPageAuthority1.setId(1L);
        CmPageAuthority cmPageAuthority2 = new CmPageAuthority();
        cmPageAuthority2.setId(cmPageAuthority1.getId());
        assertThat(cmPageAuthority1).isEqualTo(cmPageAuthority2);
        cmPageAuthority2.setId(2L);
        assertThat(cmPageAuthority1).isNotEqualTo(cmPageAuthority2);
        cmPageAuthority1.setId(null);
        assertThat(cmPageAuthority1).isNotEqualTo(cmPageAuthority2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmPageAuthorityDTO.class);
        CmPageAuthorityDTO cmPageAuthorityDTO1 = new CmPageAuthorityDTO();
        cmPageAuthorityDTO1.setId(1L);
        CmPageAuthorityDTO cmPageAuthorityDTO2 = new CmPageAuthorityDTO();
        assertThat(cmPageAuthorityDTO1).isNotEqualTo(cmPageAuthorityDTO2);
        cmPageAuthorityDTO2.setId(cmPageAuthorityDTO1.getId());
        assertThat(cmPageAuthorityDTO1).isEqualTo(cmPageAuthorityDTO2);
        cmPageAuthorityDTO2.setId(2L);
        assertThat(cmPageAuthorityDTO1).isNotEqualTo(cmPageAuthorityDTO2);
        cmPageAuthorityDTO1.setId(null);
        assertThat(cmPageAuthorityDTO1).isNotEqualTo(cmPageAuthorityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmPageAuthorityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmPageAuthorityMapper.fromId(null)).isNull();
    }
}
