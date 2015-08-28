package com.witbooking.witadmin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.witbooking.witadmin.domain.Permission;
import com.witbooking.witadmin.repository.PermissionRepository;
import com.witbooking.witadmin.web.rest.util.HeaderUtil;
import com.witbooking.witadmin.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for managing Permission.
 */
@RestController
@RequestMapping("/api")
public class PermissionResource {

    private final Logger log = LoggerFactory.getLogger(PermissionResource.class);

    @Inject
    private PermissionRepository permissionRepository;

    /**
     * POST  /permissions -> Create a new permission.
     */
    @RequestMapping(value = "/permissions",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Permission> create(@Valid @RequestBody Permission permission) throws URISyntaxException {
        log.debug("REST request to save Permission : {}", permission);
        if (permission.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new permission cannot already have an ID").body(null);
        }
        Permission result = permissionRepository.save(permission);
        return ResponseEntity.created(new URI("/api/permissions/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("permission", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /permissions -> Updates an existing permission.
     */
    @RequestMapping(value = "/permissions",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Permission> update(@Valid @RequestBody Permission permission) throws URISyntaxException {
        log.debug("REST request to update Permission : {}", permission);
        if (permission.getId() == null) {
            return create(permission);
        }
        Permission result = permissionRepository.save(permission);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("permission", permission.getId().toString()))
                .body(result);
    }

    /**
     * GET  /permissions -> get all the permissions.
     */
    @RequestMapping(value = "/permissions",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Permission>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<Permission> page = permissionRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/permissions", offset, limit);
        return new ResponseEntity<List<Permission>>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /permissions/:id -> get the "id" permission.
     */
    @RequestMapping(value = "/permissions/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Permission> get(@PathVariable Long id, HttpServletResponse response) {
        log.debug("REST request to get Permission : {}", id);
        Permission permission = permissionRepository.findOne(id);
        if (permission == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(permission, HttpStatus.OK);
    }

    /**
     * DELETE  /permissions/:id -> delete the "id" permission.
     */
    @RequestMapping(value = "/permissions/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete Permission : {}", id);
        permissionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("permission", id.toString())).build();
    }
}
