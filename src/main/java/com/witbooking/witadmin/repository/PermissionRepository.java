package com.witbooking.witadmin.repository;

import com.witbooking.witadmin.domain.Permission;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Permission entity.
 */
public interface PermissionRepository extends JpaRepository<Permission,Long> {

}
