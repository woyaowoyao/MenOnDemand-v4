package com.tojava.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tojava.gateway.web.rest.TestUtil;

public class TrainingRecordTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingRecord.class);
        TrainingRecord trainingRecord1 = new TrainingRecord();
        trainingRecord1.setId(1L);
        TrainingRecord trainingRecord2 = new TrainingRecord();
        trainingRecord2.setId(trainingRecord1.getId());
        assertThat(trainingRecord1).isEqualTo(trainingRecord2);
        trainingRecord2.setId(2L);
        assertThat(trainingRecord1).isNotEqualTo(trainingRecord2);
        trainingRecord1.setId(null);
        assertThat(trainingRecord1).isNotEqualTo(trainingRecord2);
    }
}
