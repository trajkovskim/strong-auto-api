package org.example.strongauto.integration.google.configuration;

import com.google.maps.places.v1.PlacesClient;
import com.google.maps.places.v1.PlacesSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class GoogleConfiguration {

  @Value("${google.placesApi.apiKey}")
  private String googlePlaceApiKey;

  @Bean
  PlacesClient createPlacesClient() throws IOException {
    PlacesSettings placesSettings = PlacesSettings.newBuilder()
        .setApiKey(googlePlaceApiKey)
        .build();

    return PlacesClient.create(placesSettings);
  }
}
