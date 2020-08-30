package com.tojava.gateway.service.impl;

import com.tojava.gateway.service.MentorSkillService;
import com.tojava.gateway.domain.MentorSkill;
import com.tojava.gateway.repository.MentorSkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link MentorSkill}.
 */
@Service
@Transactional
public class MentorSkillServiceImpl implements MentorSkillService {

    private final Logger log = LoggerFactory.getLogger(MentorSkillServiceImpl.class);

    private final MentorSkillRepository mentorSkillRepository;

    public MentorSkillServiceImpl(MentorSkillRepository mentorSkillRepository) {
        this.mentorSkillRepository = mentorSkillRepository;
    }

    @Override
    public MentorSkill save(MentorSkill mentorSkill) {
        log.debug("Request to save MentorSkill : {}", mentorSkill);
        return mentorSkillRepository.save(mentorSkill);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MentorSkill> findAll() {
        log.debug("Request to get all MentorSkills");
        return mentorSkillRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<MentorSkill> findOne(Long id) {
        log.debug("Request to get MentorSkill : {}", id);
        return mentorSkillRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MentorSkill : {}", id);
        mentorSkillRepository.deleteById(id);
    }
}
