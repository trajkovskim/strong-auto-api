package org.example.strongauto.webclient;

import org.example.strongauto.webclient.model.google.GoogleApiHeaders;
import org.example.strongauto.webclient.model.google.place.PlaceData;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * Google business api web client.
 */
@Component
public class GooglePlacesApiWebClient {

  @Value("${google.placesApi.defaultPlaceId}")
  private String defaultPlaceId;

  private final WebClient client;

  public GooglePlacesApiWebClient(@Qualifier("googlePlacesApiWebClientConfigured") WebClient client) {
    this.client = client;
  }

  public Mono<PlaceData> getPlaceDataReviews(String acceptLanguage) {

    return client.get()
        .uri("/places/{placeId}", defaultPlaceId)
        .header(HttpHeaders.ACCEPT_LANGUAGE, acceptLanguage)
        .header(GoogleApiHeaders.FIELD_MASK, "reviews")
        .accept()
        .retrieve()
        .onStatus(HttpStatusCode::isError, ClientResponse::createException)
        .bodyToMono(PlaceData.class);
  }
}
