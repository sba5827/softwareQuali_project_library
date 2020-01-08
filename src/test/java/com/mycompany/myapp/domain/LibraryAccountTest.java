package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class LibraryAccountTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LibraryAccount.class);
        LibraryAccount libraryAccount1 = new LibraryAccount();
        libraryAccount1.setId(1L);
        LibraryAccount libraryAccount2 = new LibraryAccount();
        libraryAccount2.setId(libraryAccount1.getId());
        assertThat(libraryAccount1).isEqualTo(libraryAccount2);
        libraryAccount2.setId(2L);
        assertThat(libraryAccount1).isNotEqualTo(libraryAccount2);
        libraryAccount1.setId(null);
        assertThat(libraryAccount1).isNotEqualTo(libraryAccount2);
    }
}
