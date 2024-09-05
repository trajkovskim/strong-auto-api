package org.example.strongauto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@SpringBootApplication
public class StrongAutoApplication {

  public static void main(String[] args) {
    SpringApplication.run(StrongAutoApplication.class, args);
  }

  @Bean
  CommonsRequestLoggingFilter loggingFilter() {
    CommonsRequestLoggingFilter logFilter = new CommonsRequestLoggingFilter();

    logFilter.setIncludeHeaders(true);
    logFilter.setIncludePayload(true);
    logFilter.setIncludeClientInfo(true);

    return logFilter;
  }

}
