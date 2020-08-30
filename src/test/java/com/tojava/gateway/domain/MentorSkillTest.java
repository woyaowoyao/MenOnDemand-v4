package com.tojava.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tojava.gateway.web.rest.TestUtil;

public class MentorSkillTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MentorSkill.class);
        MentorSkill mentorSkill1 = new MentorSkill();
        mentorSkill1.setId(1L);
        MentorSkill mentorSkill2 = new MentorSkill();
        mentorSkill2.setId(mentorSkill1.getId());
        assertThat(mentorSkill1).isEqualTo(mentorSkill2);
        mentorSkill2.setId(2L);
        assertThat(mentorSkill1).isNotEqualTo(mentorSkill2);
        mentorSkill1.setId(null);
        assertThat(mentorSkill1).isNotEqualTo(mentorSkill2);
    }
}
