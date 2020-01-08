package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RentingList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RentingList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RentingListRepository extends JpaRepository<RentingList, Long> {

}
