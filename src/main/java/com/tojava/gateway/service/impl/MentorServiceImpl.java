package com.tojava.gateway.service.impl;

import com.tojava.gateway.service.MentorService;
import com.tojava.gateway.domain.Mentor;
import com.tojava.gateway.repository.MentorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Mentor}.
 */
@Service
@Transactional
public class MentorServiceImpl implements MentorService {

    private final Logger log = LoggerFactory.getLogger(MentorServiceImpl.class);

    private final MentorRepository mentorRepository;

    public MentorServiceImpl(MentorRepository mentorRepository) {
        this.mentorRepository = mentorRepository;
    }

    @Override
    public Mentor save(Mentor mentor) {
        log.debug("Request to save Mentor : {}", mentor);
        return mentorRepository.save(mentor);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mentor> findAll() {
        log.debug("Request to get all Mentors");
        return mentorRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Mentor> findOne(Long id) {
        log.debug("Request to get Mentor : {}", id);
        return mentorRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mentor : {}", id);
        mentorRepository.deleteById(id);
    }
}
