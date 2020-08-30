package com.tojava.gateway.service.impl;

import com.tojava.gateway.service.PaymentRecordService;
import com.tojava.gateway.domain.PaymentRecord;
import com.tojava.gateway.repository.PaymentRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PaymentRecord}.
 */
@Service
@Transactional
public class PaymentRecordServiceImpl implements PaymentRecordService {

    private final Logger log = LoggerFactory.getLogger(PaymentRecordServiceImpl.class);

    private final PaymentRecordRepository paymentRecordRepository;

    public PaymentRecordServiceImpl(PaymentRecordRepository paymentRecordRepository) {
        this.paymentRecordRepository = paymentRecordRepository;
    }

    @Override
    public PaymentRecord save(PaymentRecord paymentRecord) {
        log.debug("Request to save PaymentRecord : {}", paymentRecord);
        return paymentRecordRepository.save(paymentRecord);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentRecord> findAll() {
        log.debug("Request to get all PaymentRecords");
        return paymentRecordRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PaymentRecord> findOne(Long id) {
        log.debug("Request to get PaymentRecord : {}", id);
        return paymentRecordRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaymentRecord : {}", id);
        paymentRecordRepository.deleteById(id);
    }
}
