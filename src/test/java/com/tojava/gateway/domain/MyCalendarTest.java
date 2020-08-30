package com.tojava.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tojava.gateway.web.rest.TestUtil;

public class MyCalendarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MyCalendar.class);
        MyCalendar myCalendar1 = new MyCalendar();
        myCalendar1.setId(1L);
        MyCalendar myCalendar2 = new MyCalendar();
        myCalendar2.setId(myCalendar1.getId());
        assertThat(myCalendar1).isEqualTo(myCalendar2);
        myCalendar2.setId(2L);
        assertThat(myCalendar1).isNotEqualTo(myCalendar2);
        myCalendar1.setId(null);
        assertThat(myCalendar1).isNotEqualTo(myCalendar2);
    }
}
