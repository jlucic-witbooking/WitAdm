package com.witbooking.witadmin.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.witbooking.witadmin.domain.UserGroup;
import com.witbooking.witadmin.repository.UserGroupRepository;
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
 * REST controller for managing UserGroup.
 */
@RestController
@RequestMapping("/api")
public class UserGroupResource {

    private final Logger log = LoggerFactory.getLogger(UserGroupResource.class);

    @Inject
    private UserGroupRepository userGroupRepository;

    /**
     * POST  /userGroups -> Create a new userGroup.
     */
    @RequestMapping(value = "/userGroups",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserGroup> create(@Valid @RequestBody UserGroup userGroup) throws URISyntaxException {
        log.debug("REST request to save UserGroup : {}", userGroup);
        if (userGroup.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new userGroup cannot already have an ID").body(null);
        }
        UserGroup result = userGroupRepository.save(userGroup);
        return ResponseEntity.created(new URI("/api/userGroups/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("userGroup", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /userGroups -> Updates an existing userGroup.
     */
    @RequestMapping(value = "/userGroups",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserGroup> update(@Valid @RequestBody UserGroup userGroup) throws URISyntaxException {
        log.debug("REST request to update UserGroup : {}", userGroup);
        if (userGroup.getId() == null) {
            return create(userGroup);
        }
        UserGroup result = userGroupRepository.save(userGroup);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("userGroup", userGroup.getId().toString()))
                .body(result);
    }

    /**
     * GET  /userGroups -> get all the userGroups.
     */
    @RequestMapping(value = "/userGroups",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<UserGroup>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<UserGroup> page = userGroupRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/userGroups", offset, limit);
        return new ResponseEntity<List<UserGroup>>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /userGroups/:id -> get the "id" userGroup.
     */
    @RequestMapping(value = "/userGroups/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserGroup> get(@PathVariable Long id, HttpServletResponse response) {
        log.debug("REST request to get UserGroup : {}", id);
        UserGroup userGroup = userGroupRepository.findOneWithEagerRelationships(id);
        if (userGroup == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userGroup, HttpStatus.OK);
    }

    /**
     * DELETE  /userGroups/:id -> delete the "id" userGroup.
     */
    @RequestMapping(value = "/userGroups/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete UserGroup : {}", id);
        userGroupRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("userGroup", id.toString())).build();
    }
}
