package com.witbooking.witadmin.repository;

import com.witbooking.witadmin.domain.AuthorizedEstablishmentUser;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the AuthorizedEstablishmentUser entity.
 */
public interface AuthorizedEstablishmentUserRepository extends JpaRepository<AuthorizedEstablishmentUser,Long> {

    @Query("select authorizedEstablishmentUser from AuthorizedEstablishmentUser authorizedEstablishmentUser where authorizedEstablishmentUser.user.login = ?#{principal.username}")
    List<AuthorizedEstablishmentUser> findAllForCurrentUser();

}
