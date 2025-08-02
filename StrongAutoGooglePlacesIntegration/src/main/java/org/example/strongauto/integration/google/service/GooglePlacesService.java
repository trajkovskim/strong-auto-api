package org.example.strongauto.integration.google.service;

import com.google.maps.places.v1.GetPlaceRequest;
import com.google.maps.places.v1.Place;
import com.google.maps.places.v1.PlaceName;
import com.google.maps.places.v1.PlacesClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GooglePlacesService {

  private final PlacesClient placesClient;

  public Place getPlace(String placeId, String languageCode) {

    GetPlaceRequest getPlaceRequest = GetPlaceRequest.newBuilder()
        .setName(PlaceName.of(placeId).toString())
        .setLanguageCode(languageCode)
        .build();

    return placesClient.getPlace(getPlaceRequest);
  }
}
