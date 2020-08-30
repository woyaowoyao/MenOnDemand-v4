package com.tojava.gateway.service.impl;

import com.tojava.gateway.service.MyCalendarService;
import com.tojava.gateway.domain.MyCalendar;
import com.tojava.gateway.repository.MyCalendarRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link MyCalendar}.
 */
@Service
@Transactional
public class MyCalendarServiceImpl implements MyCalendarService {

    private final Logger log = LoggerFactory.getLogger(MyCalendarServiceImpl.class);

    private final MyCalendarRepository myCalendarRepository;

    public MyCalendarServiceImpl(MyCalendarRepository myCalendarRepository) {
        this.myCalendarRepository = myCalendarRepository;
    }

    @Override
    public MyCalendar save(MyCalendar myCalendar) {
        log.debug("Request to save MyCalendar : {}", myCalendar);
        return myCalendarRepository.save(myCalendar);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MyCalendar> findAll() {
        log.debug("Request to get all MyCalendars");
        return myCalendarRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<MyCalendar> findOne(Long id) {
        log.debug("Request to get MyCalendar : {}", id);
        return myCalendarRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MyCalendar : {}", id);
        myCalendarRepository.deleteById(id);
    }
}
