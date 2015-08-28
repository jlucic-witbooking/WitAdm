package com.witbooking.witadmin.web.rest;

import com.witbooking.witadmin.Application;
import com.witbooking.witadmin.domain.Permission;
import com.witbooking.witadmin.repository.PermissionRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the PermissionResource REST controller.
 *
 * @see PermissionResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class PermissionResourceTest {

    private static final String DEFAULT_NAME = "SAMPLE_TEXT";
    private static final String UPDATED_NAME = "UPDATED_TEXT";
    private static final String DEFAULT_DESCRIPTION = "SAMPLE_TEXT";
    private static final String UPDATED_DESCRIPTION = "UPDATED_TEXT";

    @Inject
    private PermissionRepository permissionRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    private MockMvc restPermissionMockMvc;

    private Permission permission;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PermissionResource permissionResource = new PermissionResource();
        ReflectionTestUtils.setField(permissionResource, "permissionRepository", permissionRepository);
        this.restPermissionMockMvc = MockMvcBuilders.standaloneSetup(permissionResource).setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        permission = new Permission();
        permission.setName(DEFAULT_NAME);
        permission.setDescription(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPermission() throws Exception {
        int databaseSizeBeforeCreate = permissionRepository.findAll().size();

        // Create the Permission

        restPermissionMockMvc.perform(post("/api/permissions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(permission)))
                .andExpect(status().isCreated());

        // Validate the Permission in the database
        List<Permission> permissions = permissionRepository.findAll();
        assertThat(permissions).hasSize(databaseSizeBeforeCreate + 1);
        Permission testPermission = permissions.get(permissions.size() - 1);
        assertThat(testPermission.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPermission.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = permissionRepository.findAll().size();
        // set the field null
        permission.setName(null);

        // Create the Permission, which fails.

        restPermissionMockMvc.perform(post("/api/permissions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(permission)))
                .andExpect(status().isBadRequest());

        List<Permission> permissions = permissionRepository.findAll();
        assertThat(permissions).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPermissions() throws Exception {
        // Initialize the database
        permissionRepository.saveAndFlush(permission);

        // Get all the permissions
        restPermissionMockMvc.perform(get("/api/permissions"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(permission.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getPermission() throws Exception {
        // Initialize the database
        permissionRepository.saveAndFlush(permission);

        // Get the permission
        restPermissionMockMvc.perform(get("/api/permissions/{id}", permission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(permission.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPermission() throws Exception {
        // Get the permission
        restPermissionMockMvc.perform(get("/api/permissions/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermission() throws Exception {
        // Initialize the database
        permissionRepository.saveAndFlush(permission);

		int databaseSizeBeforeUpdate = permissionRepository.findAll().size();

        // Update the permission
        permission.setName(UPDATED_NAME);
        permission.setDescription(UPDATED_DESCRIPTION);
        

        restPermissionMockMvc.perform(put("/api/permissions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(permission)))
                .andExpect(status().isOk());

        // Validate the Permission in the database
        List<Permission> permissions = permissionRepository.findAll();
        assertThat(permissions).hasSize(databaseSizeBeforeUpdate);
        Permission testPermission = permissions.get(permissions.size() - 1);
        assertThat(testPermission.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPermission.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deletePermission() throws Exception {
        // Initialize the database
        permissionRepository.saveAndFlush(permission);

		int databaseSizeBeforeDelete = permissionRepository.findAll().size();

        // Get the permission
        restPermissionMockMvc.perform(delete("/api/permissions/{id}", permission.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Permission> permissions = permissionRepository.findAll();
        assertThat(permissions).hasSize(databaseSizeBeforeDelete - 1);
    }
}
