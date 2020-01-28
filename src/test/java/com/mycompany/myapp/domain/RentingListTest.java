package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class RentingListTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RentingList.class);
        RentingList rentingList1 = new RentingList();
        rentingList1.setId(1L);
        RentingList rentingList2 = new RentingList();
        rentingList2.setId(rentingList1.getId());
        assertThat(rentingList1).isEqualTo(rentingList2);
        rentingList2.setId(2L);
        assertThat(rentingList1).isNotEqualTo(rentingList2);
        rentingList1.setId(null);
        assertThat(rentingList1).isNotEqualTo(rentingList2);
    }
}
