package org.example.strongauto.webclient;

import org.example.strongauto.webclient.model.reviews.Reviews;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * Google business api web client.
 */
@Component
public class GoogleBusinessApiWebClient {

  private final WebClient client;

  public GoogleBusinessApiWebClient(@Qualifier("googleBusinessApiWebClientConfigured") WebClient client) {
    this.client = client;
  }

  public Mono<Reviews> getReviews() {

    return client.get()
        .uri("/reviews")
        .retrieve()
        .onStatus(HttpStatusCode::isError, ClientResponse::createException)
        .bodyToMono(Reviews.class);
  }
}
