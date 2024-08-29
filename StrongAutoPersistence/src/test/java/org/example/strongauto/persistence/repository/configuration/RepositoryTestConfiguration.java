package org.example.strongauto.persistence.repository.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "org.example.strongauto.persistence")
@EnableJpaRepositories(basePackages = "org.example.strongauto.persistence.repository")
@EntityScan(basePackages = "org.example.strongauto.persistence.model")
@EnableAutoConfiguration
public class RepositoryTestConfiguration {

}
