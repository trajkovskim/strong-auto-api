package org.example.strongauto.webclient.configuration;

import org.example.strongauto.webclient.model.google.GoogleApiHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GoogleWebClientConfiguration {

  @Value("${google.placesApi.uri}")
  private String googlePlaceApiUri;

  @Value("${google.placesApi.apiKey}")
  private String googlePlaceApiKey;

  @Value("${google.businessApi.uri}")
  private String googleBusinessApiUri;

  @Bean(name = "googleBusinessApiWebClientConfigured")
  public WebClient googleBusinessApiWebClient() {

    return WebClient.builder().baseUrl(googleBusinessApiUri).build();
  }

  @Bean(name = "googlePlacesApiWebClientConfigured")
  public WebClient googlePlacesApiWebClient() {

    return WebClient.builder()
        .baseUrl(googlePlaceApiUri)
        .defaultHeader(GoogleApiHeaders.API_KEY, googlePlaceApiKey)
        .build();
  }
}
