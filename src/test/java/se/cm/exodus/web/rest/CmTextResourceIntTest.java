package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmText;
import se.cm.exodus.repository.CmTextRepository;
import se.cm.exodus.service.CmTextService;
import se.cm.exodus.service.dto.CmTextDTO;
import se.cm.exodus.service.mapper.CmTextMapper;
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

import se.cm.exodus.domain.enumeration.TextType;
import se.cm.exodus.domain.enumeration.LayoutType;
/**
 * Test class for the CmTextResource REST controller.
 *
 * @see CmTextResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmTextResourceIntTest {

    private static final String DEFAULT_TEXT_SV = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_SV = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_EN = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_EN = "BBBBBBBBBB";

    private static final String DEFAULT_FONT_SIZE = "AAAAAAAAAA";
    private static final String UPDATED_FONT_SIZE = "BBBBBBBBBB";

    private static final String DEFAULT_FONT_WEIGHT = "AAAAAAAAAA";
    private static final String UPDATED_FONT_WEIGHT = "BBBBBBBBBB";

    private static final TextType DEFAULT_TEXT_TYPE = TextType.TITLE;
    private static final TextType UPDATED_TEXT_TYPE = TextType.INGRESS;

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
    private CmTextRepository cmTextRepository;

    @Autowired
    private CmTextMapper cmTextMapper;

    @Autowired
    private CmTextService cmTextService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmTextMockMvc;

    private CmText cmText;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmTextResource cmTextResource = new CmTextResource(cmTextService);
        this.restCmTextMockMvc = MockMvcBuilders.standaloneSetup(cmTextResource)
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
    public static CmText createEntity(EntityManager em) {
        CmText cmText = new CmText()
            .textSv(DEFAULT_TEXT_SV)
            .textEn(DEFAULT_TEXT_EN)
            .fontSize(DEFAULT_FONT_SIZE)
            .fontWeight(DEFAULT_FONT_WEIGHT)
            .textType(DEFAULT_TEXT_TYPE)
            .sorted(DEFAULT_SORTED)
            .layout(DEFAULT_LAYOUT)
            .date(DEFAULT_DATE)
            .publishDate(DEFAULT_PUBLISH_DATE)
            .publish(DEFAULT_PUBLISH);
        return cmText;
    }

    @Before
    public void initTest() {
        cmText = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmText() throws Exception {
        int databaseSizeBeforeCreate = cmTextRepository.findAll().size();

        // Create the CmText
        CmTextDTO cmTextDTO = cmTextMapper.toDto(cmText);
        restCmTextMockMvc.perform(post("/api/cm-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTextDTO)))
            .andExpect(status().isCreated());

        // Validate the CmText in the database
        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeCreate + 1);
        CmText testCmText = cmTextList.get(cmTextList.size() - 1);
        assertThat(testCmText.getTextSv()).isEqualTo(DEFAULT_TEXT_SV);
        assertThat(testCmText.getTextEn()).isEqualTo(DEFAULT_TEXT_EN);
        assertThat(testCmText.getFontSize()).isEqualTo(DEFAULT_FONT_SIZE);
        assertThat(testCmText.getFontWeight()).isEqualTo(DEFAULT_FONT_WEIGHT);
        assertThat(testCmText.getTextType()).isEqualTo(DEFAULT_TEXT_TYPE);
        assertThat(testCmText.getSorted()).isEqualTo(DEFAULT_SORTED);
        assertThat(testCmText.getLayout()).isEqualTo(DEFAULT_LAYOUT);
        assertThat(testCmText.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCmText.getPublishDate()).isEqualTo(DEFAULT_PUBLISH_DATE);
        assertThat(testCmText.isPublish()).isEqualTo(DEFAULT_PUBLISH);
    }

    @Test
    @Transactional
    public void createCmTextWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmTextRepository.findAll().size();

        // Create the CmText with an existing ID
        cmText.setId(1L);
        CmTextDTO cmTextDTO = cmTextMapper.toDto(cmText);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmTextMockMvc.perform(post("/api/cm-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTextDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmText in the database
        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTextSvIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmTextRepository.findAll().size();
        // set the field null
        cmText.setTextSv(null);

        // Create the CmText, which fails.
        CmTextDTO cmTextDTO = cmTextMapper.toDto(cmText);

        restCmTextMockMvc.perform(post("/api/cm-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTextDTO)))
            .andExpect(status().isBadRequest());

        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPublishIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmTextRepository.findAll().size();
        // set the field null
        cmText.setPublish(null);

        // Create the CmText, which fails.
        CmTextDTO cmTextDTO = cmTextMapper.toDto(cmText);

        restCmTextMockMvc.perform(post("/api/cm-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTextDTO)))
            .andExpect(status().isBadRequest());

        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmTexts() throws Exception {
        // Initialize the database
        cmTextRepository.saveAndFlush(cmText);

        // Get all the cmTextList
        restCmTextMockMvc.perform(get("/api/cm-texts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmText.getId().intValue())))
            .andExpect(jsonPath("$.[*].textSv").value(hasItem(DEFAULT_TEXT_SV.toString())))
            .andExpect(jsonPath("$.[*].textEn").value(hasItem(DEFAULT_TEXT_EN.toString())))
            .andExpect(jsonPath("$.[*].fontSize").value(hasItem(DEFAULT_FONT_SIZE.toString())))
            .andExpect(jsonPath("$.[*].fontWeight").value(hasItem(DEFAULT_FONT_WEIGHT.toString())))
            .andExpect(jsonPath("$.[*].textType").value(hasItem(DEFAULT_TEXT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].sorted").value(hasItem(DEFAULT_SORTED)))
            .andExpect(jsonPath("$.[*].layout").value(hasItem(DEFAULT_LAYOUT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].publishDate").value(hasItem(DEFAULT_PUBLISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].publish").value(hasItem(DEFAULT_PUBLISH.booleanValue())));
    }

    @Test
    @Transactional
    public void getCmText() throws Exception {
        // Initialize the database
        cmTextRepository.saveAndFlush(cmText);

        // Get the cmText
        restCmTextMockMvc.perform(get("/api/cm-texts/{id}", cmText.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmText.getId().intValue()))
            .andExpect(jsonPath("$.textSv").value(DEFAULT_TEXT_SV.toString()))
            .andExpect(jsonPath("$.textEn").value(DEFAULT_TEXT_EN.toString()))
            .andExpect(jsonPath("$.fontSize").value(DEFAULT_FONT_SIZE.toString()))
            .andExpect(jsonPath("$.fontWeight").value(DEFAULT_FONT_WEIGHT.toString()))
            .andExpect(jsonPath("$.textType").value(DEFAULT_TEXT_TYPE.toString()))
            .andExpect(jsonPath("$.sorted").value(DEFAULT_SORTED))
            .andExpect(jsonPath("$.layout").value(DEFAULT_LAYOUT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.publishDate").value(DEFAULT_PUBLISH_DATE.toString()))
            .andExpect(jsonPath("$.publish").value(DEFAULT_PUBLISH.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCmText() throws Exception {
        // Get the cmText
        restCmTextMockMvc.perform(get("/api/cm-texts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmText() throws Exception {
        // Initialize the database
        cmTextRepository.saveAndFlush(cmText);
        int databaseSizeBeforeUpdate = cmTextRepository.findAll().size();

        // Update the cmText
        CmText updatedCmText = cmTextRepository.findOne(cmText.getId());
        // Disconnect from session so that the updates on updatedCmText are not directly saved in db
        em.detach(updatedCmText);
        updatedCmText
            .textSv(UPDATED_TEXT_SV)
            .textEn(UPDATED_TEXT_EN)
            .fontSize(UPDATED_FONT_SIZE)
            .fontWeight(UPDATED_FONT_WEIGHT)
            .textType(UPDATED_TEXT_TYPE)
            .sorted(UPDATED_SORTED)
            .layout(UPDATED_LAYOUT)
            .date(UPDATED_DATE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .publish(UPDATED_PUBLISH);
        CmTextDTO cmTextDTO = cmTextMapper.toDto(updatedCmText);

        restCmTextMockMvc.perform(put("/api/cm-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTextDTO)))
            .andExpect(status().isOk());

        // Validate the CmText in the database
        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeUpdate);
        CmText testCmText = cmTextList.get(cmTextList.size() - 1);
        assertThat(testCmText.getTextSv()).isEqualTo(UPDATED_TEXT_SV);
        assertThat(testCmText.getTextEn()).isEqualTo(UPDATED_TEXT_EN);
        assertThat(testCmText.getFontSize()).isEqualTo(UPDATED_FONT_SIZE);
        assertThat(testCmText.getFontWeight()).isEqualTo(UPDATED_FONT_WEIGHT);
        assertThat(testCmText.getTextType()).isEqualTo(UPDATED_TEXT_TYPE);
        assertThat(testCmText.getSorted()).isEqualTo(UPDATED_SORTED);
        assertThat(testCmText.getLayout()).isEqualTo(UPDATED_LAYOUT);
        assertThat(testCmText.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCmText.getPublishDate()).isEqualTo(UPDATED_PUBLISH_DATE);
        assertThat(testCmText.isPublish()).isEqualTo(UPDATED_PUBLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingCmText() throws Exception {
        int databaseSizeBeforeUpdate = cmTextRepository.findAll().size();

        // Create the CmText
        CmTextDTO cmTextDTO = cmTextMapper.toDto(cmText);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmTextMockMvc.perform(put("/api/cm-texts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmTextDTO)))
            .andExpect(status().isCreated());

        // Validate the CmText in the database
        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmText() throws Exception {
        // Initialize the database
        cmTextRepository.saveAndFlush(cmText);
        int databaseSizeBeforeDelete = cmTextRepository.findAll().size();

        // Get the cmText
        restCmTextMockMvc.perform(delete("/api/cm-texts/{id}", cmText.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmText> cmTextList = cmTextRepository.findAll();
        assertThat(cmTextList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmText.class);
        CmText cmText1 = new CmText();
        cmText1.setId(1L);
        CmText cmText2 = new CmText();
        cmText2.setId(cmText1.getId());
        assertThat(cmText1).isEqualTo(cmText2);
        cmText2.setId(2L);
        assertThat(cmText1).isNotEqualTo(cmText2);
        cmText1.setId(null);
        assertThat(cmText1).isNotEqualTo(cmText2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmTextDTO.class);
        CmTextDTO cmTextDTO1 = new CmTextDTO();
        cmTextDTO1.setId(1L);
        CmTextDTO cmTextDTO2 = new CmTextDTO();
        assertThat(cmTextDTO1).isNotEqualTo(cmTextDTO2);
        cmTextDTO2.setId(cmTextDTO1.getId());
        assertThat(cmTextDTO1).isEqualTo(cmTextDTO2);
        cmTextDTO2.setId(2L);
        assertThat(cmTextDTO1).isNotEqualTo(cmTextDTO2);
        cmTextDTO1.setId(null);
        assertThat(cmTextDTO1).isNotEqualTo(cmTextDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmTextMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmTextMapper.fromId(null)).isNull();
    }
}
