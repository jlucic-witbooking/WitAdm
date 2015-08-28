package com.witbooking.witadmin.security;

import com.witbooking.witadmin.domain.Authority;
import com.witbooking.witadmin.domain.AuthorizedEstablishmentUser;
import com.witbooking.witadmin.domain.User;
import com.witbooking.witadmin.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailsService.class);

    @Inject
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        String lowercaseLogin = login.toLowerCase();
        User userFromDatabase = userRepository.findOneByLogin(lowercaseLogin);
        if (userFromDatabase == null) {
            throw new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database");
        } else if (!userFromDatabase.getActivated()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }

        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (AuthorizedEstablishmentUser authorizedEstablishmentUser : userFromDatabase.getAuthorizedEstablishmentUsers()) {
            if(authorizedEstablishmentUser.getBookingEngine() == null){
                PermissionGrantedAuthority grantedAuthority = new PermissionGrantedAuthority();
                grantedAuthority.setAuthority(authorizedEstablishmentUser.getAuthority());
                grantedAuthorities.add(grantedAuthority);
            }else{
                EstablishmentGrantedAuthority grantedAuthority = new EstablishmentGrantedAuthority();
                grantedAuthority.setDomainObjectIdentifier(authorizedEstablishmentUser.getBookingEngine().getTicker());
                grantedAuthority.setAuthority(authorizedEstablishmentUser.getAuthority());
                grantedAuthorities.add(grantedAuthority);
            }
        }

        return new org.springframework.security.core.userdetails.User(lowercaseLogin,
            userFromDatabase.getPassword(), grantedAuthorities);
    }
}