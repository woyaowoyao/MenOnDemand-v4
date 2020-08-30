package com.tojava.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tojava.gateway.web.rest.TestUtil;

public class MentorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mentor.class);
        Mentor mentor1 = new Mentor();
        mentor1.setId(1L);
        Mentor mentor2 = new Mentor();
        mentor2.setId(mentor1.getId());
        assertThat(mentor1).isEqualTo(mentor2);
        mentor2.setId(2L);
        assertThat(mentor1).isNotEqualTo(mentor2);
        mentor1.setId(null);
        assertThat(mentor1).isNotEqualTo(mentor2);
    }
}
