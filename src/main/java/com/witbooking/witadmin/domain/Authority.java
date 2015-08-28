package com.witbooking.witadmin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A Authority.
 */
@Entity
@Table(name = "JHI_AUTHORITY")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Authority implements Serializable {

    @NotNull
    @Size(min = 1, max = 50)
    @Id
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "AUTHORITY_PERMISSION",
               joinColumns = @JoinColumn(name="authority_name", referencedColumnName="name"),
               inverseJoinColumns = @JoinColumn(name="permission_id", referencedColumnName="id"))
    private Set<Permission> permissions = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public boolean hasPermission(Permission testPermission){
        for (Permission permission : permissions){
            if(testPermission.getName().equals(permission.getName())){
                return true;
            }
        }
        return false;
    }

    public boolean hasPermission(String testPermission){
        for (Permission permission : permissions){
            if(testPermission.equals(permission.getName())){
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Authority authority = (Authority) o;

        if (name != null ? !name.equals(authority.name) : authority.name != null) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Authority{" +
            "name='" + name + '\'' +
            "}";
    }
}
