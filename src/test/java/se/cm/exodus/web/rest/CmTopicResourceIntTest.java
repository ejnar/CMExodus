package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmTopic;
import se.cm.exodus.repository.CmTopicRepository;
import se.cm.exodus.service.CmTopicService;
import se.cm.exodus.service.dto.CmTopicDTO;
import se.cm.exodus.service.mapper.CmTopicMapper;
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
 * Test class for the CmTopicResource REST controller.
 *
 * @see CmTopicResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmTopicResourceIntTest {

    private static final String DEFAULT_NAME_EN = "AAAAAAAAAA";
    private static final String UPDATED_NAME_EN = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_SV = "AAAAAAAAAA";
    private static final String UPDATED_NAME_SV = "BBBBBBBBBB";

    @Autowired
    private CmTopicRepository cmTopicRepository;

    @Autowired
    private CmTopicMapper cmTopicMapper;

    @Autowired
    private CmTopicService cmTopicService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmTopicMockMvc;

    private CmTopic cmTopic;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmTopicResource cmTopicResource = new CmTopicResource(cmTopicService);
        this.restCmTopicMockMvc = MockMvcBuilders.standaloneSetup(cmTopicResource)
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
    public static CmTopic createEntity(EntityManager em) {
        CmTopic cmTopic = new CmTopic()
            .nameEn(DEFAULT_NAME_EN)
            .nameSv(DEFAULT_NAME_SV);
        return cmTopic;
    }

    @Before
    public void initTest() {
        cmTopic = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmTopic() throws Exception {
        int databaseSizeBeforeCreate = cmTopicRepository.findAll().size();

        // Create the CmTopic
        CmTopicDTO cmTopicDTO = cmTopicMapper.toDto(cmTopic);
        restCmTopicMockMvc.perform(post("/api/cm-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTopicDTO)))
            .andExpect(status().isCreated());

        // Validate the CmTopic in the database
        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeCreate + 1);
        CmTopic testCmTopic = cmTopicList.get(cmTopicList.size() - 1);
        assertThat(testCmTopic.getNameEn()).isEqualTo(DEFAULT_NAME_EN);
        assertThat(testCmTopic.getNameSv()).isEqualTo(DEFAULT_NAME_SV);
    }

    @Test
    @Transactional
    public void createCmTopicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmTopicRepository.findAll().size();

        // Create the CmTopic with an existing ID
        cmTopic.setId(1L);
        CmTopicDTO cmTopicDTO = cmTopicMapper.toDto(cmTopic);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmTopicMockMvc.perform(post("/api/cm-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTopicDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmTopic in the database
        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameEnIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmTopicRepository.findAll().size();
        // set the field null
        cmTopic.setNameEn(null);

        // Create the CmTopic, which fails.
        CmTopicDTO cmTopicDTO = cmTopicMapper.toDto(cmTopic);

        restCmTopicMockMvc.perform(post("/api/cm-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTopicDTO)))
            .andExpect(status().isBadRequest());

        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameSvIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmTopicRepository.findAll().size();
        // set the field null
        cmTopic.setNameSv(null);

        // Create the CmTopic, which fails.
        CmTopicDTO cmTopicDTO = cmTopicMapper.toDto(cmTopic);

        restCmTopicMockMvc.perform(post("/api/cm-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTopicDTO)))
            .andExpect(status().isBadRequest());

        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmTopics() throws Exception {
        // Initialize the database
        cmTopicRepository.saveAndFlush(cmTopic);

        // Get all the cmTopicList
        restCmTopicMockMvc.perform(get("/api/cm-topics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmTopic.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN.toString())))
            .andExpect(jsonPath("$.[*].nameSv").value(hasItem(DEFAULT_NAME_SV.toString())));
    }

    @Test
    @Transactional
    public void getCmTopic() throws Exception {
        // Initialize the database
        cmTopicRepository.saveAndFlush(cmTopic);

        // Get the cmTopic
        restCmTopicMockMvc.perform(get("/api/cm-topics/{id}", cmTopic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmTopic.getId().intValue()))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN.toString()))
            .andExpect(jsonPath("$.nameSv").value(DEFAULT_NAME_SV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCmTopic() throws Exception {
        // Get the cmTopic
        restCmTopicMockMvc.perform(get("/api/cm-topics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmTopic() throws Exception {
        // Initialize the database
        cmTopicRepository.saveAndFlush(cmTopic);
        int databaseSizeBeforeUpdate = cmTopicRepository.findAll().size();

        // Update the cmTopic
        CmTopic updatedCmTopic = cmTopicRepository.findOne(cmTopic.getId());
        // Disconnect from session so that the updates on updatedCmTopic are not directly saved in db
        em.detach(updatedCmTopic);
        updatedCmTopic
            .nameEn(UPDATED_NAME_EN)
            .nameSv(UPDATED_NAME_SV);
        CmTopicDTO cmTopicDTO = cmTopicMapper.toDto(updatedCmTopic);

        restCmTopicMockMvc.perform(put("/api/cm-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTopicDTO)))
            .andExpect(status().isOk());

        // Validate the CmTopic in the database
        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeUpdate);
        CmTopic testCmTopic = cmTopicList.get(cmTopicList.size() - 1);
        assertThat(testCmTopic.getNameEn()).isEqualTo(UPDATED_NAME_EN);
        assertThat(testCmTopic.getNameSv()).isEqualTo(UPDATED_NAME_SV);
    }

    @Test
    @Transactional
    public void updateNonExistingCmTopic() throws Exception {
        int databaseSizeBeforeUpdate = cmTopicRepository.findAll().size();

        // Create the CmTopic
        CmTopicDTO cmTopicDTO = cmTopicMapper.toDto(cmTopic);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmTopicMockMvc.perform(put("/api/cm-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTopicDTO)))
            .andExpect(status().isCreated());

        // Validate the CmTopic in the database
        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmTopic() throws Exception {
        // Initialize the database
        cmTopicRepository.saveAndFlush(cmTopic);
        int databaseSizeBeforeDelete = cmTopicRepository.findAll().size();

        // Get the cmTopic
        restCmTopicMockMvc.perform(delete("/api/cm-topics/{id}", cmTopic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmTopic> cmTopicList = cmTopicRepository.findAll();
        assertThat(cmTopicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmTopic.class);
        CmTopic cmTopic1 = new CmTopic();
        cmTopic1.setId(1L);
        CmTopic cmTopic2 = new CmTopic();
        cmTopic2.setId(cmTopic1.getId());
        assertThat(cmTopic1).isEqualTo(cmTopic2);
        cmTopic2.setId(2L);
        assertThat(cmTopic1).isNotEqualTo(cmTopic2);
        cmTopic1.setId(null);
        assertThat(cmTopic1).isNotEqualTo(cmTopic2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmTopicDTO.class);
        CmTopicDTO cmTopicDTO1 = new CmTopicDTO();
        cmTopicDTO1.setId(1L);
        CmTopicDTO cmTopicDTO2 = new CmTopicDTO();
        assertThat(cmTopicDTO1).isNotEqualTo(cmTopicDTO2);
        cmTopicDTO2.setId(cmTopicDTO1.getId());
        assertThat(cmTopicDTO1).isEqualTo(cmTopicDTO2);
        cmTopicDTO2.setId(2L);
        assertThat(cmTopicDTO1).isNotEqualTo(cmTopicDTO2);
        cmTopicDTO1.setId(null);
        assertThat(cmTopicDTO1).isNotEqualTo(cmTopicDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmTopicMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmTopicMapper.fromId(null)).isNull();
    }
}
