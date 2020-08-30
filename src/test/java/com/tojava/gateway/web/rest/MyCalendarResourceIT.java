package com.tojava.gateway.web.rest;

import com.tojava.gateway.VueGatewayv4App;
import com.tojava.gateway.domain.MyCalendar;
import com.tojava.gateway.repository.MyCalendarRepository;
import com.tojava.gateway.service.MyCalendarService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.tojava.gateway.domain.enumeration.DurationType;
/**
 * Integration tests for the {@link MyCalendarResource} REST controller.
 */
@SpringBootTest(classes = VueGatewayv4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class MyCalendarResourceIT {

    private static final Instant DEFAULT_CAL_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CAL_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final DurationType DEFAULT_DURATION = DurationType.Morning0800;
    private static final DurationType UPDATED_DURATION = DurationType.Morning1000;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private MyCalendarRepository myCalendarRepository;

    @Autowired
    private MyCalendarService myCalendarService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMyCalendarMockMvc;

    private MyCalendar myCalendar;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MyCalendar createEntity(EntityManager em) {
        MyCalendar myCalendar = new MyCalendar()
            .calDate(DEFAULT_CAL_DATE)
            .duration(DEFAULT_DURATION)
            .remarks(DEFAULT_REMARKS);
        return myCalendar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MyCalendar createUpdatedEntity(EntityManager em) {
        MyCalendar myCalendar = new MyCalendar()
            .calDate(UPDATED_CAL_DATE)
            .duration(UPDATED_DURATION)
            .remarks(UPDATED_REMARKS);
        return myCalendar;
    }

    @BeforeEach
    public void initTest() {
        myCalendar = createEntity(em);
    }

    @Test
    @Transactional
    public void createMyCalendar() throws Exception {
        int databaseSizeBeforeCreate = myCalendarRepository.findAll().size();
        // Create the MyCalendar
        restMyCalendarMockMvc.perform(post("/api/my-calendars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(myCalendar)))
            .andExpect(status().isCreated());

        // Validate the MyCalendar in the database
        List<MyCalendar> myCalendarList = myCalendarRepository.findAll();
        assertThat(myCalendarList).hasSize(databaseSizeBeforeCreate + 1);
        MyCalendar testMyCalendar = myCalendarList.get(myCalendarList.size() - 1);
        assertThat(testMyCalendar.getCalDate()).isEqualTo(DEFAULT_CAL_DATE);
        assertThat(testMyCalendar.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testMyCalendar.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createMyCalendarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = myCalendarRepository.findAll().size();

        // Create the MyCalendar with an existing ID
        myCalendar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMyCalendarMockMvc.perform(post("/api/my-calendars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(myCalendar)))
            .andExpect(status().isBadRequest());

        // Validate the MyCalendar in the database
        List<MyCalendar> myCalendarList = myCalendarRepository.findAll();
        assertThat(myCalendarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMyCalendars() throws Exception {
        // Initialize the database
        myCalendarRepository.saveAndFlush(myCalendar);

        // Get all the myCalendarList
        restMyCalendarMockMvc.perform(get("/api/my-calendars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(myCalendar.getId().intValue())))
            .andExpect(jsonPath("$.[*].calDate").value(hasItem(DEFAULT_CAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)));
    }
    
    @Test
    @Transactional
    public void getMyCalendar() throws Exception {
        // Initialize the database
        myCalendarRepository.saveAndFlush(myCalendar);

        // Get the myCalendar
        restMyCalendarMockMvc.perform(get("/api/my-calendars/{id}", myCalendar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(myCalendar.getId().intValue()))
            .andExpect(jsonPath("$.calDate").value(DEFAULT_CAL_DATE.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS));
    }
    @Test
    @Transactional
    public void getNonExistingMyCalendar() throws Exception {
        // Get the myCalendar
        restMyCalendarMockMvc.perform(get("/api/my-calendars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMyCalendar() throws Exception {
        // Initialize the database
        myCalendarService.save(myCalendar);

        int databaseSizeBeforeUpdate = myCalendarRepository.findAll().size();

        // Update the myCalendar
        MyCalendar updatedMyCalendar = myCalendarRepository.findById(myCalendar.getId()).get();
        // Disconnect from session so that the updates on updatedMyCalendar are not directly saved in db
        em.detach(updatedMyCalendar);
        updatedMyCalendar
            .calDate(UPDATED_CAL_DATE)
            .duration(UPDATED_DURATION)
            .remarks(UPDATED_REMARKS);

        restMyCalendarMockMvc.perform(put("/api/my-calendars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMyCalendar)))
            .andExpect(status().isOk());

        // Validate the MyCalendar in the database
        List<MyCalendar> myCalendarList = myCalendarRepository.findAll();
        assertThat(myCalendarList).hasSize(databaseSizeBeforeUpdate);
        MyCalendar testMyCalendar = myCalendarList.get(myCalendarList.size() - 1);
        assertThat(testMyCalendar.getCalDate()).isEqualTo(UPDATED_CAL_DATE);
        assertThat(testMyCalendar.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testMyCalendar.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingMyCalendar() throws Exception {
        int databaseSizeBeforeUpdate = myCalendarRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMyCalendarMockMvc.perform(put("/api/my-calendars")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(myCalendar)))
            .andExpect(status().isBadRequest());

        // Validate the MyCalendar in the database
        List<MyCalendar> myCalendarList = myCalendarRepository.findAll();
        assertThat(myCalendarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMyCalendar() throws Exception {
        // Initialize the database
        myCalendarService.save(myCalendar);

        int databaseSizeBeforeDelete = myCalendarRepository.findAll().size();

        // Delete the myCalendar
        restMyCalendarMockMvc.perform(delete("/api/my-calendars/{id}", myCalendar.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MyCalendar> myCalendarList = myCalendarRepository.findAll();
        assertThat(myCalendarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
