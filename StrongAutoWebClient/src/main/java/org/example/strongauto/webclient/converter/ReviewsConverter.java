package org.example.strongauto.webclient.converter;

import org.example.strongauto.core.model.dto.reviews.ReviewDto;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.webclient.model.google.place.PlaceData;
import org.example.strongauto.webclient.model.google.place.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ReviewsConverter {

  @Mapping(target = "platform", constant = "GOOGLE")
  ReviewDto convertReview(Review review);

  ReviewsDto convertReviews(PlaceData reviews);
}
