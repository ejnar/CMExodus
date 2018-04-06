package se.cm.exodus.web.rest;

import se.cm.exodus.CmExodusApp;

import se.cm.exodus.domain.CmItem;
import se.cm.exodus.repository.CmItemRepository;
import se.cm.exodus.service.CmItemService;
import se.cm.exodus.service.dto.CmItemDTO;
import se.cm.exodus.service.mapper.CmItemMapper;
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

import se.cm.exodus.domain.enumeration.LayoutType;
/**
 * Test class for the CmItemResource REST controller.
 *
 * @see CmItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CmExodusApp.class)
public class CmItemResourceIntTest {

    private static final ZonedDateTime DEFAULT_ITEM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ITEM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_SORTED = 1;
    private static final Integer UPDATED_SORTED = 2;

    private static final String DEFAULT_TOOL_TIP = "AAAAAAAAAA";
    private static final String UPDATED_TOOL_TIP = "BBBBBBBBBB";

    private static final LayoutType DEFAULT_LAYOUT = LayoutType.LEFT;
    private static final LayoutType UPDATED_LAYOUT = LayoutType.RIGHT;

    private static final LocalDate DEFAULT_PUBLISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PUBLISH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_PUBLISH = false;
    private static final Boolean UPDATED_PUBLISH = true;

    @Autowired
    private CmItemRepository cmItemRepository;

    @Autowired
    private CmItemMapper cmItemMapper;

    @Autowired
    private CmItemService cmItemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCmItemMockMvc;

    private CmItem cmItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CmItemResource cmItemResource = new CmItemResource(cmItemService);
        this.restCmItemMockMvc = MockMvcBuilders.standaloneSetup(cmItemResource)
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
    public static CmItem createEntity(EntityManager em) {
        CmItem cmItem = new CmItem()
            .itemDate(DEFAULT_ITEM_DATE)
            .sorted(DEFAULT_SORTED)
            .toolTip(DEFAULT_TOOL_TIP)
            .layout(DEFAULT_LAYOUT)
            .publishDate(DEFAULT_PUBLISH_DATE)
            .publish(DEFAULT_PUBLISH);
        return cmItem;
    }

    @Before
    public void initTest() {
        cmItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCmItem() throws Exception {
        int databaseSizeBeforeCreate = cmItemRepository.findAll().size();

        // Create the CmItem
        CmItemDTO cmItemDTO = cmItemMapper.toDto(cmItem);
        restCmItemMockMvc.perform(post("/api/cm-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CmItem in the database
        List<CmItem> cmItemList = cmItemRepository.findAll();
        assertThat(cmItemList).hasSize(databaseSizeBeforeCreate + 1);
        CmItem testCmItem = cmItemList.get(cmItemList.size() - 1);
        assertThat(testCmItem.getItemDate()).isEqualTo(DEFAULT_ITEM_DATE);
        assertThat(testCmItem.getSorted()).isEqualTo(DEFAULT_SORTED);
        assertThat(testCmItem.getToolTip()).isEqualTo(DEFAULT_TOOL_TIP);
        assertThat(testCmItem.getLayout()).isEqualTo(DEFAULT_LAYOUT);
        assertThat(testCmItem.getPublishDate()).isEqualTo(DEFAULT_PUBLISH_DATE);
        assertThat(testCmItem.isPublish()).isEqualTo(DEFAULT_PUBLISH);
    }

    @Test
    @Transactional
    public void createCmItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cmItemRepository.findAll().size();

        // Create the CmItem with an existing ID
        cmItem.setId(1L);
        CmItemDTO cmItemDTO = cmItemMapper.toDto(cmItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCmItemMockMvc.perform(post("/api/cm-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CmItem in the database
        List<CmItem> cmItemList = cmItemRepository.findAll();
        assertThat(cmItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPublishIsRequired() throws Exception {
        int databaseSizeBeforeTest = cmItemRepository.findAll().size();
        // set the field null
        cmItem.setPublish(null);

        // Create the CmItem, which fails.
        CmItemDTO cmItemDTO = cmItemMapper.toDto(cmItem);

        restCmItemMockMvc.perform(post("/api/cm-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemDTO)))
            .andExpect(status().isBadRequest());

        List<CmItem> cmItemList = cmItemRepository.findAll();
        assertThat(cmItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCmItems() throws Exception {
        // Initialize the database
        cmItemRepository.saveAndFlush(cmItem);

        // Get all the cmItemList
        restCmItemMockMvc.perform(get("/api/cm-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cmItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemDate").value(hasItem(sameInstant(DEFAULT_ITEM_DATE))))
            .andExpect(jsonPath("$.[*].sorted").value(hasItem(DEFAULT_SORTED)))
            .andExpect(jsonPath("$.[*].toolTip").value(hasItem(DEFAULT_TOOL_TIP.toString())))
            .andExpect(jsonPath("$.[*].layout").value(hasItem(DEFAULT_LAYOUT.toString())))
            .andExpect(jsonPath("$.[*].publishDate").value(hasItem(DEFAULT_PUBLISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].publish").value(hasItem(DEFAULT_PUBLISH.booleanValue())));
    }

    @Test
    @Transactional
    public void getCmItem() throws Exception {
        // Initialize the database
        cmItemRepository.saveAndFlush(cmItem);

        // Get the cmItem
        restCmItemMockMvc.perform(get("/api/cm-items/{id}", cmItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cmItem.getId().intValue()))
            .andExpect(jsonPath("$.itemDate").value(sameInstant(DEFAULT_ITEM_DATE)))
            .andExpect(jsonPath("$.sorted").value(DEFAULT_SORTED))
            .andExpect(jsonPath("$.toolTip").value(DEFAULT_TOOL_TIP.toString()))
            .andExpect(jsonPath("$.layout").value(DEFAULT_LAYOUT.toString()))
            .andExpect(jsonPath("$.publishDate").value(DEFAULT_PUBLISH_DATE.toString()))
            .andExpect(jsonPath("$.publish").value(DEFAULT_PUBLISH.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCmItem() throws Exception {
        // Get the cmItem
        restCmItemMockMvc.perform(get("/api/cm-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCmItem() throws Exception {
        // Initialize the database
        cmItemRepository.saveAndFlush(cmItem);
        int databaseSizeBeforeUpdate = cmItemRepository.findAll().size();

        // Update the cmItem
        CmItem updatedCmItem = cmItemRepository.findOne(cmItem.getId());
        // Disconnect from session so that the updates on updatedCmItem are not directly saved in db
        em.detach(updatedCmItem);
        updatedCmItem
            .itemDate(UPDATED_ITEM_DATE)
            .sorted(UPDATED_SORTED)
            .toolTip(UPDATED_TOOL_TIP)
            .layout(UPDATED_LAYOUT)
            .publishDate(UPDATED_PUBLISH_DATE)
            .publish(UPDATED_PUBLISH);
        CmItemDTO cmItemDTO = cmItemMapper.toDto(updatedCmItem);

        restCmItemMockMvc.perform(put("/api/cm-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemDTO)))
            .andExpect(status().isOk());

        // Validate the CmItem in the database
        List<CmItem> cmItemList = cmItemRepository.findAll();
        assertThat(cmItemList).hasSize(databaseSizeBeforeUpdate);
        CmItem testCmItem = cmItemList.get(cmItemList.size() - 1);
        assertThat(testCmItem.getItemDate()).isEqualTo(UPDATED_ITEM_DATE);
        assertThat(testCmItem.getSorted()).isEqualTo(UPDATED_SORTED);
        assertThat(testCmItem.getToolTip()).isEqualTo(UPDATED_TOOL_TIP);
        assertThat(testCmItem.getLayout()).isEqualTo(UPDATED_LAYOUT);
        assertThat(testCmItem.getPublishDate()).isEqualTo(UPDATED_PUBLISH_DATE);
        assertThat(testCmItem.isPublish()).isEqualTo(UPDATED_PUBLISH);
    }

    @Test
    @Transactional
    public void updateNonExistingCmItem() throws Exception {
        int databaseSizeBeforeUpdate = cmItemRepository.findAll().size();

        // Create the CmItem
        CmItemDTO cmItemDTO = cmItemMapper.toDto(cmItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCmItemMockMvc.perform(put("/api/cm-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cmItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CmItem in the database
        List<CmItem> cmItemList = cmItemRepository.findAll();
        assertThat(cmItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCmItem() throws Exception {
        // Initialize the database
        cmItemRepository.saveAndFlush(cmItem);
        int databaseSizeBeforeDelete = cmItemRepository.findAll().size();

        // Get the cmItem
        restCmItemMockMvc.perform(delete("/api/cm-items/{id}", cmItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CmItem> cmItemList = cmItemRepository.findAll();
        assertThat(cmItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmItem.class);
        CmItem cmItem1 = new CmItem();
        cmItem1.setId(1L);
        CmItem cmItem2 = new CmItem();
        cmItem2.setId(cmItem1.getId());
        assertThat(cmItem1).isEqualTo(cmItem2);
        cmItem2.setId(2L);
        assertThat(cmItem1).isNotEqualTo(cmItem2);
        cmItem1.setId(null);
        assertThat(cmItem1).isNotEqualTo(cmItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmItemDTO.class);
        CmItemDTO cmItemDTO1 = new CmItemDTO();
        cmItemDTO1.setId(1L);
        CmItemDTO cmItemDTO2 = new CmItemDTO();
        assertThat(cmItemDTO1).isNotEqualTo(cmItemDTO2);
        cmItemDTO2.setId(cmItemDTO1.getId());
        assertThat(cmItemDTO1).isEqualTo(cmItemDTO2);
        cmItemDTO2.setId(2L);
        assertThat(cmItemDTO1).isNotEqualTo(cmItemDTO2);
        cmItemDTO1.setId(null);
        assertThat(cmItemDTO1).isNotEqualTo(cmItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cmItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cmItemMapper.fromId(null)).isNull();
    }
}
