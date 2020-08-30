package com.tojava.gateway.service.impl;

import com.tojava.gateway.service.TechnologyService;
import com.tojava.gateway.domain.Technology;
import com.tojava.gateway.repository.TechnologyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Technology}.
 */
@Service
@Transactional
public class TechnologyServiceImpl implements TechnologyService {

    private final Logger log = LoggerFactory.getLogger(TechnologyServiceImpl.class);

    private final TechnologyRepository technologyRepository;

    public TechnologyServiceImpl(TechnologyRepository technologyRepository) {
        this.technologyRepository = technologyRepository;
    }

    @Override
    public Technology save(Technology technology) {
        log.debug("Request to save Technology : {}", technology);
        return technologyRepository.save(technology);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Technology> findAll() {
        log.debug("Request to get all Technologies");
        return technologyRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Technology> findOne(Long id) {
        log.debug("Request to get Technology : {}", id);
        return technologyRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Technology : {}", id);
        technologyRepository.deleteById(id);
    }
}
