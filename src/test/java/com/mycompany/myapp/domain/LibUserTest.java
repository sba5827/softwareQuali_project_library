package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class LibUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LibUser.class);
        LibUser libUser1 = new LibUser();
        libUser1.setId(1L);
        LibUser libUser2 = new LibUser();
        libUser2.setId(libUser1.getId());
        assertThat(libUser1).isEqualTo(libUser2);
        libUser2.setId(2L);
        assertThat(libUser1).isNotEqualTo(libUser2);
        libUser1.setId(null);
        assertThat(libUser1).isNotEqualTo(libUser2);
    }
}
