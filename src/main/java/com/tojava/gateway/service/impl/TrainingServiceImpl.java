package com.tojava.gateway.service.impl;

import com.tojava.gateway.service.TrainingService;
import com.tojava.gateway.domain.Training;
import com.tojava.gateway.repository.TrainingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Training}.
 */
@Service
@Transactional
public class TrainingServiceImpl implements TrainingService {

    private final Logger log = LoggerFactory.getLogger(TrainingServiceImpl.class);

    private final TrainingRepository trainingRepository;

    public TrainingServiceImpl(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    @Override
    public Training save(Training training) {
        log.debug("Request to save Training : {}", training);
        return trainingRepository.save(training);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Training> findAll(Pageable pageable) {
        log.debug("Request to get all Trainings");
        return trainingRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Training> findOne(Long id) {
        log.debug("Request to get Training : {}", id);
        return trainingRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Training : {}", id);
        trainingRepository.deleteById(id);
    }
}
