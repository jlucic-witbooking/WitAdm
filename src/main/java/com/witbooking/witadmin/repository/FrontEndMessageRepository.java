package com.witbooking.witadmin.repository;

import com.witbooking.witadmin.domain.FrontEndMessage;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the FrontEndMessage entity.
 */
public interface FrontEndMessageRepository extends JpaRepository<FrontEndMessage,Long> {

}
