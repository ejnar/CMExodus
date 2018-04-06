package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmItemList;
import se.cm.exodus.repository.CmItemListRepository;
import se.cm.exodus.service.CmItemListService;
import se.cm.exodus.service.dto.CmItemListDTO;
import se.cm.exodus.service.mapper.CmItemListMapper;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static se.cm.exodus.web.rest.TestUtil.sameInstant;
import static se.cm.exodus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import se.cm.exodus.domain.enumeration.TypeOfEvent;
/**
 * Test class for the CmItemListResource REST controller.
 *
 * @see CmItemListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmItemListResourceIntTest {

    private static final String DEFAULT_TEXT_SV = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_SV = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_EN = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_EN = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_SV = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_SV = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_EN = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_EN = "BBBBBBBBBB";

    private static final String DEFAULT_INGRESS_SV = "AAAAAAAAAA";
    private static final String UPDATED_INGRESS_SV = "BBBBBBBBBB";

    private static final String DEFAULT_INGRESS_EN = "AAAAAAAAAA";
    private static final String UPDATED_INGRESS_EN = "BBBBBBBBBB";

    private static final Integer DEFAULT_SORTED = 1;
    private static final Integer UPDATED_SORTED = 2;

    private static final String DEFAULT_TOOL_TIP = "AAAAAAAAAA";
    private static final String UPDATED_TOOL_TIP = "BBBBBBBBBB";

    private static final TypeOfEvent DEFAULT_TYPE_OF_EVENT = TypeOfEvent.SERVICE;
    private static final TypeOfEvent UPDATED_TYPE_OF_EVENT = TypeOfEvent.CAFE;

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_ITEM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ITEM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDate DEFAULT_PUBLISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PUBLISH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_PUBLISH = false;
    private static final Boolean UPDATED_PUBLISH = true;

    @Autowired
    private CmItemListRepository cmItemListRepository;

    @Autowired
    private CmItemListMapper cmItemListMapper;

    @Autowired
    private CmItemListService cmItemListService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmItemListMockMvc;

    private CmItemList cmItemList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmItemListResource cmItemListResource = new CmItemListResource(cmItemListService);
        this.restCmItemListMockMvc = MockMvcBuilders.standaloneSetup(cmItemListResource)
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
    public static CmItemList createEntity(EntityManager em) {
        CmItemList cmItemList = new CmItemList()
            .textSv(DEFAULT_TEXT_SV)
            .textEn(DEFAULT_TEXT_EN)
            .titleSv(DEFAULT_TITLE_SV)
            .titleEn(DEFAULT_TITLE_EN)
            .ingressSv(DEFAULT_INGRESS_SV)
            .ingressEn(DEFAULT_INGRESS_EN)
            .sorted(DEFAULT_SORTED)
            .toolTip(DEFAULT_TOOL_TIP)
            .typeOfEvent(DEFAULT_TYPE_OF_EVENT)
            .location(DEFAULT_LOCATION)
            .itemDate(DEFAULT_ITEM_DATE)
            .publishDate(DEFAULT_PUBLISH_DATE)
            .publish(DEFAULT_PUBLISH);
        return cmItemList;
    }

    @Before
    public void initTest() {
        cmItemList = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmItemList() throws Exception {
        int databaseSizeBeforeCreate = cmItemListRepository.findAll().size();

        // Create the CmItemList
        CmItemListDTO cmItemListDTO = cmItemListMapper.toDto(cmItemList);
        restCmItemListMockMvc.perform(post("/api/cm-item-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemListDTO)))
            .andExpect(status().isCreated());

        // Validate the CmItemList in the database
        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeCreate + 1);
        CmItemList testCmItemList = cmItemListList.get(cmItemListList.size() - 1);
        assertThat(testCmItemList.getTextSv()).isEqualTo(DEFAULT_TEXT_SV);
        assertThat(testCmItemList.getTextEn()).isEqualTo(DEFAULT_TEXT_EN);
        assertThat(testCmItemList.getTitleSv()).isEqualTo(DEFAULT_TITLE_SV);
        assertThat(testCmItemList.getTitleEn()).isEqualTo(DEFAULT_TITLE_EN);
        assertThat(testCmItemList.getIngressSv()).isEqualTo(DEFAULT_INGRESS_SV);
        assertThat(testCmItemList.getIngressEn()).isEqualTo(DEFAULT_INGRESS_EN);
        assertThat(testCmItemList.getSorted()).isEqualTo(DEFAULT_SORTED);
        assertThat(testCmItemList.getToolTip()).isEqualTo(DEFAULT_TOOL_TIP);
        assertThat(testCmItemList.getTypeOfEvent()).isEqualTo(DEFAULT_TYPE_OF_EVENT);
        assertThat(testCmItemList.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testCmItemList.getItemDate()).isEqualTo(DEFAULT_ITEM_DATE);
        assertThat(testCmItemList.getPublishDate()).isEqualTo(DEFAULT_PUBLISH_DATE);
        assertThat(testCmItemList.isPublish()).isEqualTo(DEFAULT_PUBLISH);
    }

    @Test
    @Transactional
    public void createCmItemListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmItemListRepository.findAll().size();

        // Create the CmItemList with an existing ID
        cmItemList.setId(1L);
        CmItemListDTO cmItemListDTO = cmItemListMapper.toDto(cmItemList);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmItemListMockMvc.perform(post("/api/cm-item-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmItemList in the database
        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTextSvIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmItemListRepository.findAll().size();
        // set the field null
        cmItemList.setTextSv(null);

        // Create the CmItemList, which fails.
        CmItemListDTO cmItemListDTO = cmItemListMapper.toDto(cmItemList);

        restCmItemListMockMvc.perform(post("/api/cm-item-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemListDTO)))
            .andExpect(status().isBadRequest());

        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPublishIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmItemListRepository.findAll().size();
        // set the field null
        cmItemList.setPublish(null);

        // Create the CmItemList, which fails.
        CmItemListDTO cmItemListDTO = cmItemListMapper.toDto(cmItemList);

        restCmItemListMockMvc.perform(post("/api/cm-item-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemListDTO)))
            .andExpect(status().isBadRequest());

        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmItemLists() throws Exception {
        // Initialize the database
        cmItemListRepository.saveAndFlush(cmItemList);

        // Get all the cmItemListList
        restCmItemListMockMvc.perform(get("/api/cm-item-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmItemList.getId().intValue())))
            .andExpect(jsonPath("$.[*].textSv").value(hasItem(DEFAULT_TEXT_SV.toString())))
            .andExpect(jsonPath("$.[*].textEn").value(hasItem(DEFAULT_TEXT_EN.toString())))
            .andExpect(jsonPath("$.[*].titleSv").value(hasItem(DEFAULT_TITLE_SV.toString())))
            .andExpect(jsonPath("$.[*].titleEn").value(hasItem(DEFAULT_TITLE_EN.toString())))
            .andExpect(jsonPath("$.[*].ingressSv").value(hasItem(DEFAULT_INGRESS_SV.toString())))
            .andExpect(jsonPath("$.[*].ingressEn").value(hasItem(DEFAULT_INGRESS_EN.toString())))
            .andExpect(jsonPath("$.[*].sorted").value(hasItem(DEFAULT_SORTED)))
            .andExpect(jsonPath("$.[*].toolTip").value(hasItem(DEFAULT_TOOL_TIP.toString())))
            .andExpect(jsonPath("$.[*].typeOfEvent").value(hasItem(DEFAULT_TYPE_OF_EVENT.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].itemDate").value(hasItem(sameInstant(DEFAULT_ITEM_DATE))))
            .andExpect(jsonPath("$.[*].publishDate").value(hasItem(DEFAULT_PUBLISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].publish").value(hasItem(DEFAULT_PUBLISH.booleanValue())));
    }

    @Test
    @Transactional
    public void getCmItemList() throws Exception {
        // Initialize the database
        cmItemListRepository.saveAndFlush(cmItemList);

        // Get the cmItemList
        restCmItemListMockMvc.perform(get("/api/cm-item-lists/{id}", cmItemList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmItemList.getId().intValue()))
            .andExpect(jsonPath("$.textSv").value(DEFAULT_TEXT_SV.toString()))
            .andExpect(jsonPath("$.textEn").value(DEFAULT_TEXT_EN.toString()))
            .andExpect(jsonPath("$.titleSv").value(DEFAULT_TITLE_SV.toString()))
            .andExpect(jsonPath("$.titleEn").value(DEFAULT_TITLE_EN.toString()))
            .andExpect(jsonPath("$.ingressSv").value(DEFAULT_INGRESS_SV.toString()))
            .andExpect(jsonPath("$.ingressEn").value(DEFAULT_INGRESS_EN.toString()))
            .andExpect(jsonPath("$.sorted").value(DEFAULT_SORTED))
            .andExpect(jsonPath("$.toolTip").value(DEFAULT_TOOL_TIP.toString()))
            .andExpect(jsonPath("$.typeOfEvent").value(DEFAULT_TYPE_OF_EVENT.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.itemDate").value(sameInstant(DEFAULT_ITEM_DATE)))
            .andExpect(jsonPath("$.publishDate").value(DEFAULT_PUBLISH_DATE.toString()))
            .andExpect(jsonPath("$.publish").value(DEFAULT_PUBLISH.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCmItemList() throws Exception {
        // Get the cmItemList
        restCmItemListMockMvc.perform(get("/api/cm-item-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmItemList() throws Exception {
        // Initialize the database
        cmItemListRepository.saveAndFlush(cmItemList);
        int databaseSizeBeforeUpdate = cmItemListRepository.findAll().size();

        // Update the cmItemList
        CmItemList updatedCmItemList = cmItemListRepository.findOne(cmItemList.getId());
        // Disconnect from session so that the updates on updatedCmItemList are not directly saved in db
        em.detach(updatedCmItemList);
        updatedCmItemList
            .textSv(UPDATED_TEXT_SV)
            .textEn(UPDATED_TEXT_EN)
            .titleSv(UPDATED_TITLE_SV)
            .titleEn(UPDATED_TITLE_EN)
            .ingressSv(UPDATED_INGRESS_SV)
            .ingressEn(UPDATED_INGRESS_EN)
            .sorted(UPDATED_SORTED)
            .toolTip(UPDATED_TOOL_TIP)
            .typeOfEvent(UPDATED_TYPE_OF_EVENT)
            .location(UPDATED_LOCATION)
            .itemDate(UPDATED_ITEM_DATE)
            .publishDate(UPDATED_PUBLISH_DATE)
            .publish(UPDATED_PUBLISH);
        CmItemListDTO cmItemListDTO = cmItemListMapper.toDto(updatedCmItemList);

        restCmItemListMockMvc.perform(put("/api/cm-item-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemListDTO)))
            .andExpect(status().isOk());

        // Validate the CmItemList in the database
        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeUpdate);
        CmItemList testCmItemList = cmItemListList.get(cmItemListList.size() - 1);
        assertThat(testCmItemList.getTextSv()).isEqualTo(UPDATED_TEXT_SV);
        assertThat(testCmItemList.getTextEn()).isEqualTo(UPDATED_TEXT_EN);
        assertThat(testCmItemList.getTitleSv()).isEqualTo(UPDATED_TITLE_SV);
        assertThat(testCmItemList.getTitleEn()).isEqualTo(UPDATED_TITLE_EN);
        assertThat(testCmItemList.getIngressSv()).isEqualTo(UPDATED_INGRESS_SV);
        assertThat(testCmItemList.getIngressEn()).isEqualTo(UPDATED_INGRESS_EN);
        assertThat(testCmItemList.getSorted()).isEqualTo(UPDATED_SORTED);
        assertThat(testCmItemList.getToolTip()).isEqualTo(UPDATED_TOOL_TIP);
        assertThat(testCmItemList.getTypeOfEvent()).isEqualTo(UPDATED_TYPE_OF_EVENT);
        assertThat(testCmItemList.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testCmItemList.getItemDate()).isEqualTo(UPDATED_ITEM_DATE);
        assertThat(testCmItemList.getPublishDate()).isEqualTo(UPDATED_PUBLISH_DATE);
        assertThat(testCmItemList.isPublish()).isEqualTo(UPDATED_PUBLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingCmItemList() throws Exception {
        int databaseSizeBeforeUpdate = cmItemListRepository.findAll().size();

        // Create the CmItemList
        CmItemListDTO cmItemListDTO = cmItemListMapper.toDto(cmItemList);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmItemListMockMvc.perform(put("/api/cm-item-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemListDTO)))
            .andExpect(status().isCreated());

        // Validate the CmItemList in the database
        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmItemList() throws Exception {
        // Initialize the database
        cmItemListRepository.saveAndFlush(cmItemList);
        int databaseSizeBeforeDelete = cmItemListRepository.findAll().size();

        // Get the cmItemList
        restCmItemListMockMvc.perform(delete("/api/cm-item-lists/{id}", cmItemList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmItemList> cmItemListList = cmItemListRepository.findAll();
        assertThat(cmItemListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmItemList.class);
        CmItemList cmItemList1 = new CmItemList();
        cmItemList1.setId(1L);
        CmItemList cmItemList2 = new CmItemList();
        cmItemList2.setId(cmItemList1.getId());
        assertThat(cmItemList1).isEqualTo(cmItemList2);
        cmItemList2.setId(2L);
        assertThat(cmItemList1).isNotEqualTo(cmItemList2);
        cmItemList1.setId(null);
        assertThat(cmItemList1).isNotEqualTo(cmItemList2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmItemListDTO.class);
        CmItemListDTO cmItemListDTO1 = new CmItemListDTO();
        cmItemListDTO1.setId(1L);
        CmItemListDTO cmItemListDTO2 = new CmItemListDTO();
        assertThat(cmItemListDTO1).isNotEqualTo(cmItemListDTO2);
        cmItemListDTO2.setId(cmItemListDTO1.getId());
        assertThat(cmItemListDTO1).isEqualTo(cmItemListDTO2);
        cmItemListDTO2.setId(2L);
        assertThat(cmItemListDTO1).isNotEqualTo(cmItemListDTO2);
        cmItemListDTO1.setId(null);
        assertThat(cmItemListDTO1).isNotEqualTo(cmItemListDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmItemListMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmItemListMapper.fromId(null)).isNull();
    }
}
