package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmSubTopic;
import se.cm.exodus.repository.CmSubTopicRepository;
import se.cm.exodus.service.dto.CmSubTopicDTO;
import se.cm.exodus.service.mapper.CmSubTopicMapper;
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
 * Test class for the CmSubTopicResource REST controller.
 *
 * @see CmSubTopicResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmSubTopicResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CmSubTopicRepository cmSubTopicRepository;

    @Autowired
    private CmSubTopicMapper cmSubTopicMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmSubTopicMockMvc;

    private CmSubTopic cmSubTopic;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmSubTopicResource cmSubTopicResource = new CmSubTopicResource(cmSubTopicRepository, cmSubTopicMapper);
        this.restCmSubTopicMockMvc = MockMvcBuilders.standaloneSetup(cmSubTopicResource)
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
    public static CmSubTopic createEntity(EntityManager em) {
        CmSubTopic cmSubTopic = new CmSubTopic()
            .name(DEFAULT_NAME);
        return cmSubTopic;
    }

    @Before
    public void initTest() {
        cmSubTopic = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmSubTopic() throws Exception {
        int databaseSizeBeforeCreate = cmSubTopicRepository.findAll().size();

        // Create the CmSubTopic
        CmSubTopicDTO cmSubTopicDTO = cmSubTopicMapper.toDto(cmSubTopic);
        restCmSubTopicMockMvc.perform(post("/api/cm-sub-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmSubTopicDTO)))
            .andExpect(status().isCreated());

        // Validate the CmSubTopic in the database
        List<CmSubTopic> cmSubTopicList = cmSubTopicRepository.findAll();
        assertThat(cmSubTopicList).hasSize(databaseSizeBeforeCreate + 1);
        CmSubTopic testCmSubTopic = cmSubTopicList.get(cmSubTopicList.size() - 1);
        assertThat(testCmSubTopic.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCmSubTopicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmSubTopicRepository.findAll().size();

        // Create the CmSubTopic with an existing ID
        cmSubTopic.setId(1L);
        CmSubTopicDTO cmSubTopicDTO = cmSubTopicMapper.toDto(cmSubTopic);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmSubTopicMockMvc.perform(post("/api/cm-sub-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmSubTopicDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmSubTopic in the database
        List<CmSubTopic> cmSubTopicList = cmSubTopicRepository.findAll();
        assertThat(cmSubTopicList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmSubTopicRepository.findAll().size();
        // set the field null
        cmSubTopic.setName(null);

        // Create the CmSubTopic, which fails.
        CmSubTopicDTO cmSubTopicDTO = cmSubTopicMapper.toDto(cmSubTopic);

        restCmSubTopicMockMvc.perform(post("/api/cm-sub-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmSubTopicDTO)))
            .andExpect(status().isBadRequest());

        List<CmSubTopic> cmSubTopicList = cmSubTopicRepository.findAll();
        assertThat(cmSubTopicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmSubTopics() throws Exception {
        // Initialize the database
        cmSubTopicRepository.saveAndFlush(cmSubTopic);

        // Get all the cmSubTopicList
        restCmSubTopicMockMvc.perform(get("/api/cm-sub-topics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmSubTopic.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCmSubTopic() throws Exception {
        // Initialize the database
        cmSubTopicRepository.saveAndFlush(cmSubTopic);

        // Get the cmSubTopic
        restCmSubTopicMockMvc.perform(get("/api/cm-sub-topics/{id}", cmSubTopic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmSubTopic.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCmSubTopic() throws Exception {
        // Get the cmSubTopic
        restCmSubTopicMockMvc.perform(get("/api/cm-sub-topics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmSubTopic() throws Exception {
        // Initialize the database
        cmSubTopicRepository.saveAndFlush(cmSubTopic);
        int databaseSizeBeforeUpdate = cmSubTopicRepository.findAll().size();

        // Update the cmSubTopic
        CmSubTopic updatedCmSubTopic = cmSubTopicRepository.findOne(cmSubTopic.getId());
        // Disconnect from session so that the updates on updatedCmSubTopic are not directly saved in db
        em.detach(updatedCmSubTopic);
        updatedCmSubTopic
            .name(UPDATED_NAME);
        CmSubTopicDTO cmSubTopicDTO = cmSubTopicMapper.toDto(updatedCmSubTopic);

        restCmSubTopicMockMvc.perform(put("/api/cm-sub-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmSubTopicDTO)))
            .andExpect(status().isOk());

        // Validate the CmSubTopic in the database
        List<CmSubTopic> cmSubTopicList = cmSubTopicRepository.findAll();
        assertThat(cmSubTopicList).hasSize(databaseSizeBeforeUpdate);
        CmSubTopic testCmSubTopic = cmSubTopicList.get(cmSubTopicList.size() - 1);
        assertThat(testCmSubTopic.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCmSubTopic() throws Exception {
        int databaseSizeBeforeUpdate = cmSubTopicRepository.findAll().size();

        // Create the CmSubTopic
        CmSubTopicDTO cmSubTopicDTO = cmSubTopicMapper.toDto(cmSubTopic);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmSubTopicMockMvc.perform(put("/api/cm-sub-topics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmSubTopicDTO)))
            .andExpect(status().isCreated());

        // Validate the CmSubTopic in the database
        List<CmSubTopic> cmSubTopicList = cmSubTopicRepository.findAll();
        assertThat(cmSubTopicList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmSubTopic() throws Exception {
        // Initialize the database
        cmSubTopicRepository.saveAndFlush(cmSubTopic);
        int databaseSizeBeforeDelete = cmSubTopicRepository.findAll().size();

        // Get the cmSubTopic
        restCmSubTopicMockMvc.perform(delete("/api/cm-sub-topics/{id}", cmSubTopic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmSubTopic> cmSubTopicList = cmSubTopicRepository.findAll();
        assertThat(cmSubTopicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmSubTopic.class);
        CmSubTopic cmSubTopic1 = new CmSubTopic();
        cmSubTopic1.setId(1L);
        CmSubTopic cmSubTopic2 = new CmSubTopic();
        cmSubTopic2.setId(cmSubTopic1.getId());
        assertThat(cmSubTopic1).isEqualTo(cmSubTopic2);
        cmSubTopic2.setId(2L);
        assertThat(cmSubTopic1).isNotEqualTo(cmSubTopic2);
        cmSubTopic1.setId(null);
        assertThat(cmSubTopic1).isNotEqualTo(cmSubTopic2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmSubTopicDTO.class);
        CmSubTopicDTO cmSubTopicDTO1 = new CmSubTopicDTO();
        cmSubTopicDTO1.setId(1L);
        CmSubTopicDTO cmSubTopicDTO2 = new CmSubTopicDTO();
        assertThat(cmSubTopicDTO1).isNotEqualTo(cmSubTopicDTO2);
        cmSubTopicDTO2.setId(cmSubTopicDTO1.getId());
        assertThat(cmSubTopicDTO1).isEqualTo(cmSubTopicDTO2);
        cmSubTopicDTO2.setId(2L);
        assertThat(cmSubTopicDTO1).isNotEqualTo(cmSubTopicDTO2);
        cmSubTopicDTO1.setId(null);
        assertThat(cmSubTopicDTO1).isNotEqualTo(cmSubTopicDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmSubTopicMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmSubTopicMapper.fromId(null)).isNull();
    }
}
