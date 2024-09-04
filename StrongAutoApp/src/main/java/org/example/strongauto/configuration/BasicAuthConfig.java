package org.example.strongauto.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class BasicAuthConfig {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http.authorizeHttpRequests(authorize -> authorize
            .requestMatchers(HttpMethod.GET, "/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/v1/vehicles/search").permitAll()
            .requestMatchers(HttpMethod.POST).authenticated()
            .requestMatchers(HttpMethod.PUT).authenticated()
            .requestMatchers(HttpMethod.DELETE).authenticated());

    return http
        .httpBasic(Customizer.withDefaults())
        .cors().disable()
        .csrf().disable()
        .build();
  }
}
