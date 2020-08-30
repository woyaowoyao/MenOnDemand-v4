package com.tojava.gateway.repository;

import com.tojava.gateway.domain.PaymentRecord;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PaymentRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
}
