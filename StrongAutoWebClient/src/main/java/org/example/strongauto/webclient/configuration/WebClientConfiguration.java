package org.example.strongauto.webclient.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfiguration {

  @Value("${googleBuinessApi.url}")
  private String googleBusinessApiUrl;

  @Bean(name = "googleBusinessApiWebClientConfigured")
  public WebClient googleBusinessApiWebClient() {

    return WebClient.builder().baseUrl(googleBusinessApiUrl).build();
  }
}
