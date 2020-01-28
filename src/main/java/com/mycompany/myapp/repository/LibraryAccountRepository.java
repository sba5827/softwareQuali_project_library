package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LibraryAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LibraryAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LibraryAccountRepository extends JpaRepository<LibraryAccount, Long> {

}
