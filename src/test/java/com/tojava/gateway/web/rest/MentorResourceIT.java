package com.tojava.gateway.web.rest;

import com.tojava.gateway.VueGatewayv4App;
import com.tojava.gateway.domain.Mentor;
import com.tojava.gateway.repository.MentorRepository;
import com.tojava.gateway.service.MentorService;

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

import com.tojava.gateway.domain.enumeration.TrainStatus;
/**
 * Integration tests for the {@link MentorResource} REST controller.
 */
@SpringBootTest(classes = VueGatewayv4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class MentorResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINKEDIN = "AAAAAAAAAA";
    private static final String UPDATED_LINKEDIN = "BBBBBBBBBB";

    private static final Instant DEFAULT_REG_DATETIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REG_DATETIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_REG_CODE = "AAAAAAAAAA";
    private static final String UPDATED_REG_CODE = "BBBBBBBBBB";

    private static final Float DEFAULT_EXPERIENCE = 1F;
    private static final Float UPDATED_EXPERIENCE = 2F;

    private static final TrainStatus DEFAULT_STATUS = TrainStatus.Active;
    private static final TrainStatus UPDATED_STATUS = TrainStatus.Inactive;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private MentorService mentorService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMentorMockMvc;

    private Mentor mentor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mentor createEntity(EntityManager em) {
        Mentor mentor = new Mentor()
            .username(DEFAULT_USERNAME)
            .linkedin(DEFAULT_LINKEDIN)
            .regDatetime(DEFAULT_REG_DATETIME)
            .regCode(DEFAULT_REG_CODE)
            .experience(DEFAULT_EXPERIENCE)
            .status(DEFAULT_STATUS);
        return mentor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mentor createUpdatedEntity(EntityManager em) {
        Mentor mentor = new Mentor()
            .username(UPDATED_USERNAME)
            .linkedin(UPDATED_LINKEDIN)
            .regDatetime(UPDATED_REG_DATETIME)
            .regCode(UPDATED_REG_CODE)
            .experience(UPDATED_EXPERIENCE)
            .status(UPDATED_STATUS);
        return mentor;
    }

    @BeforeEach
    public void initTest() {
        mentor = createEntity(em);
    }

    @Test
    @Transactional
    public void createMentor() throws Exception {
        int databaseSizeBeforeCreate = mentorRepository.findAll().size();
        // Create the Mentor
        restMentorMockMvc.perform(post("/api/mentors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mentor)))
            .andExpect(status().isCreated());

        // Validate the Mentor in the database
        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeCreate + 1);
        Mentor testMentor = mentorList.get(mentorList.size() - 1);
        assertThat(testMentor.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testMentor.getLinkedin()).isEqualTo(DEFAULT_LINKEDIN);
        assertThat(testMentor.getRegDatetime()).isEqualTo(DEFAULT_REG_DATETIME);
        assertThat(testMentor.getRegCode()).isEqualTo(DEFAULT_REG_CODE);
        assertThat(testMentor.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
        assertThat(testMentor.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createMentorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mentorRepository.findAll().size();

        // Create the Mentor with an existing ID
        mentor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMentorMockMvc.perform(post("/api/mentors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mentor)))
            .andExpect(status().isBadRequest());

        // Validate the Mentor in the database
        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = mentorRepository.findAll().size();
        // set the field null
        mentor.setUsername(null);

        // Create the Mentor, which fails.


        restMentorMockMvc.perform(post("/api/mentors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mentor)))
            .andExpect(status().isBadRequest());

        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = mentorRepository.findAll().size();
        // set the field null
        mentor.setStatus(null);

        // Create the Mentor, which fails.


        restMentorMockMvc.perform(post("/api/mentors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mentor)))
            .andExpect(status().isBadRequest());

        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMentors() throws Exception {
        // Initialize the database
        mentorRepository.saveAndFlush(mentor);

        // Get all the mentorList
        restMentorMockMvc.perform(get("/api/mentors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mentor.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].linkedin").value(hasItem(DEFAULT_LINKEDIN)))
            .andExpect(jsonPath("$.[*].regDatetime").value(hasItem(DEFAULT_REG_DATETIME.toString())))
            .andExpect(jsonPath("$.[*].regCode").value(hasItem(DEFAULT_REG_CODE)))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getMentor() throws Exception {
        // Initialize the database
        mentorRepository.saveAndFlush(mentor);

        // Get the mentor
        restMentorMockMvc.perform(get("/api/mentors/{id}", mentor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mentor.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.linkedin").value(DEFAULT_LINKEDIN))
            .andExpect(jsonPath("$.regDatetime").value(DEFAULT_REG_DATETIME.toString()))
            .andExpect(jsonPath("$.regCode").value(DEFAULT_REG_CODE))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMentor() throws Exception {
        // Get the mentor
        restMentorMockMvc.perform(get("/api/mentors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMentor() throws Exception {
        // Initialize the database
        mentorService.save(mentor);

        int databaseSizeBeforeUpdate = mentorRepository.findAll().size();

        // Update the mentor
        Mentor updatedMentor = mentorRepository.findById(mentor.getId()).get();
        // Disconnect from session so that the updates on updatedMentor are not directly saved in db
        em.detach(updatedMentor);
        updatedMentor
            .username(UPDATED_USERNAME)
            .linkedin(UPDATED_LINKEDIN)
            .regDatetime(UPDATED_REG_DATETIME)
            .regCode(UPDATED_REG_CODE)
            .experience(UPDATED_EXPERIENCE)
            .status(UPDATED_STATUS);

        restMentorMockMvc.perform(put("/api/mentors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMentor)))
            .andExpect(status().isOk());

        // Validate the Mentor in the database
        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeUpdate);
        Mentor testMentor = mentorList.get(mentorList.size() - 1);
        assertThat(testMentor.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testMentor.getLinkedin()).isEqualTo(UPDATED_LINKEDIN);
        assertThat(testMentor.getRegDatetime()).isEqualTo(UPDATED_REG_DATETIME);
        assertThat(testMentor.getRegCode()).isEqualTo(UPDATED_REG_CODE);
        assertThat(testMentor.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
        assertThat(testMentor.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingMentor() throws Exception {
        int databaseSizeBeforeUpdate = mentorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMentorMockMvc.perform(put("/api/mentors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mentor)))
            .andExpect(status().isBadRequest());

        // Validate the Mentor in the database
        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMentor() throws Exception {
        // Initialize the database
        mentorService.save(mentor);

        int databaseSizeBeforeDelete = mentorRepository.findAll().size();

        // Delete the mentor
        restMentorMockMvc.perform(delete("/api/mentors/{id}", mentor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mentor> mentorList = mentorRepository.findAll();
        assertThat(mentorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
