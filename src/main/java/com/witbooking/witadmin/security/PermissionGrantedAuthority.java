package com.witbooking.witadmin.security;

import com.witbooking.witadmin.domain.Authority;
import com.witbooking.witadmin.domain.Permission;
import org.springframework.security.core.GrantedAuthority;

/**
 * Created by mongoose on 6/04/15.
 * This class is used to represent complex granted authorities (not simple string representation)
 * but roles with given rights (lists of rights), that cannot efficiently be expressed as lists of
 * strings.
 */
public class PermissionGrantedAuthority implements GrantedAuthority {

    private Authority authority;

    public boolean hasAuthority(String testAuthority){
        return authority.getName().equals(testAuthority);
    }

    public boolean hasAuthority(Authority testAuthority){
        return hasAuthority(testAuthority.getName());
    }

    public boolean hasPermission(String right){
        return authority.hasPermission(right);
    }

    public boolean hasPermission(Permission right){
        return hasPermission(right.getName());
    }


    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return null;
    }
}
