package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmImage;
import se.cm.exodus.repository.CmImageRepository;
import se.cm.exodus.service.CmImageService;
import se.cm.exodus.service.dto.CmImageDTO;
import se.cm.exodus.service.mapper.CmImageMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static se.cm.exodus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import se.cm.exodus.domain.enumeration.LayoutType;
/**
 * Test class for the CmImageResource REST controller.
 *
 * @see CmImageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmImageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_TOOL_TIP = "AAAAAAAAAA";
    private static final String UPDATED_TOOL_TIP = "BBBBBBBBBB";

    private static final Integer DEFAULT_SORTED = 1;
    private static final Integer UPDATED_SORTED = 2;

    private static final LayoutType DEFAULT_LAYOUT = LayoutType.LEFT;
    private static final LayoutType UPDATED_LAYOUT = LayoutType.RIGHT;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PUBLISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PUBLISH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_PUBLISH = false;
    private static final Boolean UPDATED_PUBLISH = true;

    @Autowired
    private CmImageRepository cmImageRepository;

    @Autowired
    private CmImageMapper cmImageMapper;

    @Autowired
    private CmImageService cmImageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmImageMockMvc;

    private CmImage cmImage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmImageResource cmImageResource = new CmImageResource(cmImageService);
        this.restCmImageMockMvc = MockMvcBuilders.standaloneSetup(cmImageResource)
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
    public static CmImage createEntity(EntityManager em) {
        CmImage cmImage = new CmImage()
            .name(DEFAULT_NAME)
            .imageType(DEFAULT_IMAGE_TYPE)
            .toolTip(DEFAULT_TOOL_TIP)
            .sorted(DEFAULT_SORTED)
            .layout(DEFAULT_LAYOUT)
            .date(DEFAULT_DATE)
            .publishDate(DEFAULT_PUBLISH_DATE)
            .publish(DEFAULT_PUBLISH);
        return cmImage;
    }

    @Before
    public void initTest() {
        cmImage = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmImage() throws Exception {
        int databaseSizeBeforeCreate = cmImageRepository.findAll().size();

        // Create the CmImage
        CmImageDTO cmImageDTO = cmImageMapper.toDto(cmImage);
        restCmImageMockMvc.perform(post("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isCreated());

        // Validate the CmImage in the database
        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeCreate + 1);
        CmImage testCmImage = cmImageList.get(cmImageList.size() - 1);
        assertThat(testCmImage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCmImage.getImageType()).isEqualTo(DEFAULT_IMAGE_TYPE);
        assertThat(testCmImage.getToolTip()).isEqualTo(DEFAULT_TOOL_TIP);
        assertThat(testCmImage.getSorted()).isEqualTo(DEFAULT_SORTED);
        assertThat(testCmImage.getLayout()).isEqualTo(DEFAULT_LAYOUT);
        assertThat(testCmImage.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCmImage.getPublishDate()).isEqualTo(DEFAULT_PUBLISH_DATE);
        assertThat(testCmImage.isPublish()).isEqualTo(DEFAULT_PUBLISH);
    }

    @Test
    @Transactional
    public void createCmImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmImageRepository.findAll().size();

        // Create the CmImage with an existing ID
        cmImage.setId(1L);
        CmImageDTO cmImageDTO = cmImageMapper.toDto(cmImage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmImageMockMvc.perform(post("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmImage in the database
        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmImageRepository.findAll().size();
        // set the field null
        cmImage.setName(null);

        // Create the CmImage, which fails.
        CmImageDTO cmImageDTO = cmImageMapper.toDto(cmImage);

        restCmImageMockMvc.perform(post("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isBadRequest());

        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmImageRepository.findAll().size();
        // set the field null
        cmImage.setImageType(null);

        // Create the CmImage, which fails.
        CmImageDTO cmImageDTO = cmImageMapper.toDto(cmImage);

        restCmImageMockMvc.perform(post("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isBadRequest());

        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPublishIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmImageRepository.findAll().size();
        // set the field null
        cmImage.setPublish(null);

        // Create the CmImage, which fails.
        CmImageDTO cmImageDTO = cmImageMapper.toDto(cmImage);

        restCmImageMockMvc.perform(post("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isBadRequest());

        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmImages() throws Exception {
        // Initialize the database
        cmImageRepository.saveAndFlush(cmImage);

        // Get all the cmImageList
        restCmImageMockMvc.perform(get("/api/cm-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].imageType").value(hasItem(DEFAULT_IMAGE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].toolTip").value(hasItem(DEFAULT_TOOL_TIP.toString())))
            .andExpect(jsonPath("$.[*].sorted").value(hasItem(DEFAULT_SORTED)))
            .andExpect(jsonPath("$.[*].layout").value(hasItem(DEFAULT_LAYOUT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].publishDate").value(hasItem(DEFAULT_PUBLISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].publish").value(hasItem(DEFAULT_PUBLISH.booleanValue())));
    }

    @Test
    @Transactional
    public void getCmImage() throws Exception {
        // Initialize the database
        cmImageRepository.saveAndFlush(cmImage);

        // Get the cmImage
        restCmImageMockMvc.perform(get("/api/cm-images/{id}", cmImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmImage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.imageType").value(DEFAULT_IMAGE_TYPE.toString()))
            .andExpect(jsonPath("$.toolTip").value(DEFAULT_TOOL_TIP.toString()))
            .andExpect(jsonPath("$.sorted").value(DEFAULT_SORTED))
            .andExpect(jsonPath("$.layout").value(DEFAULT_LAYOUT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.publishDate").value(DEFAULT_PUBLISH_DATE.toString()))
            .andExpect(jsonPath("$.publish").value(DEFAULT_PUBLISH.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCmImage() throws Exception {
        // Get the cmImage
        restCmImageMockMvc.perform(get("/api/cm-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmImage() throws Exception {
        // Initialize the database
        cmImageRepository.saveAndFlush(cmImage);
        int databaseSizeBeforeUpdate = cmImageRepository.findAll().size();

        // Update the cmImage
        CmImage updatedCmImage = cmImageRepository.findOne(cmImage.getId());
        // Disconnect from session so that the updates on updatedCmImage are not directly saved in db
        em.detach(updatedCmImage);
        updatedCmImage
            .name(UPDATED_NAME)
            .imageType(UPDATED_IMAGE_TYPE)
            .toolTip(UPDATED_TOOL_TIP)
            .sorted(UPDATED_SORTED)
            .layout(UPDATED_LAYOUT)
            .date(UPDATED_DATE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .publish(UPDATED_PUBLISH);
        CmImageDTO cmImageDTO = cmImageMapper.toDto(updatedCmImage);

        restCmImageMockMvc.perform(put("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isOk());

        // Validate the CmImage in the database
        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeUpdate);
        CmImage testCmImage = cmImageList.get(cmImageList.size() - 1);
        assertThat(testCmImage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCmImage.getImageType()).isEqualTo(UPDATED_IMAGE_TYPE);
        assertThat(testCmImage.getToolTip()).isEqualTo(UPDATED_TOOL_TIP);
        assertThat(testCmImage.getSorted()).isEqualTo(UPDATED_SORTED);
        assertThat(testCmImage.getLayout()).isEqualTo(UPDATED_LAYOUT);
        assertThat(testCmImage.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCmImage.getPublishDate()).isEqualTo(UPDATED_PUBLISH_DATE);
        assertThat(testCmImage.isPublish()).isEqualTo(UPDATED_PUBLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingCmImage() throws Exception {
        int databaseSizeBeforeUpdate = cmImageRepository.findAll().size();

        // Create the CmImage
        CmImageDTO cmImageDTO = cmImageMapper.toDto(cmImage);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmImageMockMvc.perform(put("/api/cm-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmImageDTO)))
            .andExpect(status().isCreated());

        // Validate the CmImage in the database
        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmImage() throws Exception {
        // Initialize the database
        cmImageRepository.saveAndFlush(cmImage);
        int databaseSizeBeforeDelete = cmImageRepository.findAll().size();

        // Get the cmImage
        restCmImageMockMvc.perform(delete("/api/cm-images/{id}", cmImage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmImage> cmImageList = cmImageRepository.findAll();
        assertThat(cmImageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmImage.class);
        CmImage cmImage1 = new CmImage();
        cmImage1.setId(1L);
        CmImage cmImage2 = new CmImage();
        cmImage2.setId(cmImage1.getId());
        assertThat(cmImage1).isEqualTo(cmImage2);
        cmImage2.setId(2L);
        assertThat(cmImage1).isNotEqualTo(cmImage2);
        cmImage1.setId(null);
        assertThat(cmImage1).isNotEqualTo(cmImage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmImageDTO.class);
        CmImageDTO cmImageDTO1 = new CmImageDTO();
        cmImageDTO1.setId(1L);
        CmImageDTO cmImageDTO2 = new CmImageDTO();
        assertThat(cmImageDTO1).isNotEqualTo(cmImageDTO2);
        cmImageDTO2.setId(cmImageDTO1.getId());
        assertThat(cmImageDTO1).isEqualTo(cmImageDTO2);
        cmImageDTO2.setId(2L);
        assertThat(cmImageDTO1).isNotEqualTo(cmImageDTO2);
        cmImageDTO1.setId(null);
        assertThat(cmImageDTO1).isNotEqualTo(cmImageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmImageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmImageMapper.fromId(null)).isNull();
    }
}
