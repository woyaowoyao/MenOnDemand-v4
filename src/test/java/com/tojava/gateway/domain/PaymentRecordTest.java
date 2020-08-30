package com.tojava.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tojava.gateway.web.rest.TestUtil;

public class PaymentRecordTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentRecord.class);
        PaymentRecord paymentRecord1 = new PaymentRecord();
        paymentRecord1.setId(1L);
        PaymentRecord paymentRecord2 = new PaymentRecord();
        paymentRecord2.setId(paymentRecord1.getId());
        assertThat(paymentRecord1).isEqualTo(paymentRecord2);
        paymentRecord2.setId(2L);
        assertThat(paymentRecord1).isNotEqualTo(paymentRecord2);
        paymentRecord1.setId(null);
        assertThat(paymentRecord1).isNotEqualTo(paymentRecord2);
    }
}
