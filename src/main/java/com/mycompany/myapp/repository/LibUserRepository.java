package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LibUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LibUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LibUserRepository extends JpaRepository<LibUser, Long> {

}
