package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmModule;
import se.cm.exodus.repository.CmModuleRepository;
import se.cm.exodus.service.dto.CmModuleDTO;
import se.cm.exodus.service.mapper.CmModuleMapper;
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

import se.cm.exodus.domain.enumeration.ModuleType;
import se.cm.exodus.domain.enumeration.LayoutType;
/**
 * Test class for the CmModuleResource REST controller.
 *
 * @see CmModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmModuleResourceIntTest {

    private static final Integer DEFAULT_SORT = 1;
    private static final Integer UPDATED_SORT = 2;

    private static final ModuleType DEFAULT_TYPE = ModuleType.TEXT;
    private static final ModuleType UPDATED_TYPE = ModuleType.IMAGE;

    private static final LayoutType DEFAULT_LAYOUT = LayoutType.LEFT;
    private static final LayoutType UPDATED_LAYOUT = LayoutType.RIGHT;

    @Autowired
    private CmModuleRepository cmModuleRepository;

    @Autowired
    private CmModuleMapper cmModuleMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmModuleMockMvc;

    private CmModule cmModule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmModuleResource cmModuleResource = new CmModuleResource(cmModuleRepository, cmModuleMapper);
        this.restCmModuleMockMvc = MockMvcBuilders.standaloneSetup(cmModuleResource)
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
    public static CmModule createEntity(EntityManager em) {
        CmModule cmModule = new CmModule()
            .sort(DEFAULT_SORT)
            .type(DEFAULT_TYPE)
            .layout(DEFAULT_LAYOUT);
        return cmModule;
    }

    @Before
    public void initTest() {
        cmModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmModule() throws Exception {
        int databaseSizeBeforeCreate = cmModuleRepository.findAll().size();

        // Create the CmModule
        CmModuleDTO cmModuleDTO = cmModuleMapper.toDto(cmModule);
        restCmModuleMockMvc.perform(post("/api/cm-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmModuleDTO)))
            .andExpect(status().isCreated());

        // Validate the CmModule in the database
        List<CmModule> cmModuleList = cmModuleRepository.findAll();
        assertThat(cmModuleList).hasSize(databaseSizeBeforeCreate + 1);
        CmModule testCmModule = cmModuleList.get(cmModuleList.size() - 1);
        assertThat(testCmModule.getSort()).isEqualTo(DEFAULT_SORT);
        assertThat(testCmModule.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCmModule.getLayout()).isEqualTo(DEFAULT_LAYOUT);
    }

    @Test
    @Transactional
    public void createCmModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmModuleRepository.findAll().size();

        // Create the CmModule with an existing ID
        cmModule.setId(1L);
        CmModuleDTO cmModuleDTO = cmModuleMapper.toDto(cmModule);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmModuleMockMvc.perform(post("/api/cm-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmModuleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmModule in the database
        List<CmModule> cmModuleList = cmModuleRepository.findAll();
        assertThat(cmModuleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCmModules() throws Exception {
        // Initialize the database
        cmModuleRepository.saveAndFlush(cmModule);

        // Get all the cmModuleList
        restCmModuleMockMvc.perform(get("/api/cm-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].sort").value(hasItem(DEFAULT_SORT)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].layout").value(hasItem(DEFAULT_LAYOUT.toString())));
    }

    @Test
    @Transactional
    public void getCmModule() throws Exception {
        // Initialize the database
        cmModuleRepository.saveAndFlush(cmModule);

        // Get the cmModule
        restCmModuleMockMvc.perform(get("/api/cm-modules/{id}", cmModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmModule.getId().intValue()))
            .andExpect(jsonPath("$.sort").value(DEFAULT_SORT))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.layout").value(DEFAULT_LAYOUT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCmModule() throws Exception {
        // Get the cmModule
        restCmModuleMockMvc.perform(get("/api/cm-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmModule() throws Exception {
        // Initialize the database
        cmModuleRepository.saveAndFlush(cmModule);
        int databaseSizeBeforeUpdate = cmModuleRepository.findAll().size();

        // Update the cmModule
        CmModule updatedCmModule = cmModuleRepository.findOne(cmModule.getId());
        // Disconnect from session so that the updates on updatedCmModule are not directly saved in db
        em.detach(updatedCmModule);
        updatedCmModule
            .sort(UPDATED_SORT)
            .type(UPDATED_TYPE)
            .layout(UPDATED_LAYOUT);
        CmModuleDTO cmModuleDTO = cmModuleMapper.toDto(updatedCmModule);

        restCmModuleMockMvc.perform(put("/api/cm-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmModuleDTO)))
            .andExpect(status().isOk());

        // Validate the CmModule in the database
        List<CmModule> cmModuleList = cmModuleRepository.findAll();
        assertThat(cmModuleList).hasSize(databaseSizeBeforeUpdate);
        CmModule testCmModule = cmModuleList.get(cmModuleList.size() - 1);
        assertThat(testCmModule.getSort()).isEqualTo(UPDATED_SORT);
        assertThat(testCmModule.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCmModule.getLayout()).isEqualTo(UPDATED_LAYOUT);
    }

    @Test
    @Transactional
    public void updateNonExistingCmModule() throws Exception {
        int databaseSizeBeforeUpdate = cmModuleRepository.findAll().size();

        // Create the CmModule
        CmModuleDTO cmModuleDTO = cmModuleMapper.toDto(cmModule);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmModuleMockMvc.perform(put("/api/cm-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmModuleDTO)))
            .andExpect(status().isCreated());

        // Validate the CmModule in the database
        List<CmModule> cmModuleList = cmModuleRepository.findAll();
        assertThat(cmModuleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmModule() throws Exception {
        // Initialize the database
        cmModuleRepository.saveAndFlush(cmModule);
        int databaseSizeBeforeDelete = cmModuleRepository.findAll().size();

        // Get the cmModule
        restCmModuleMockMvc.perform(delete("/api/cm-modules/{id}", cmModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmModule> cmModuleList = cmModuleRepository.findAll();
        assertThat(cmModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmModule.class);
        CmModule cmModule1 = new CmModule();
        cmModule1.setId(1L);
        CmModule cmModule2 = new CmModule();
        cmModule2.setId(cmModule1.getId());
        assertThat(cmModule1).isEqualTo(cmModule2);
        cmModule2.setId(2L);
        assertThat(cmModule1).isNotEqualTo(cmModule2);
        cmModule1.setId(null);
        assertThat(cmModule1).isNotEqualTo(cmModule2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmModuleDTO.class);
        CmModuleDTO cmModuleDTO1 = new CmModuleDTO();
        cmModuleDTO1.setId(1L);
        CmModuleDTO cmModuleDTO2 = new CmModuleDTO();
        assertThat(cmModuleDTO1).isNotEqualTo(cmModuleDTO2);
        cmModuleDTO2.setId(cmModuleDTO1.getId());
        assertThat(cmModuleDTO1).isEqualTo(cmModuleDTO2);
        cmModuleDTO2.setId(2L);
        assertThat(cmModuleDTO1).isNotEqualTo(cmModuleDTO2);
        cmModuleDTO1.setId(null);
        assertThat(cmModuleDTO1).isNotEqualTo(cmModuleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmModuleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmModuleMapper.fromId(null)).isNull();
    }
}
