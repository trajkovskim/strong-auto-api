package org.example.strongauto.integration.google.converter;

import com.google.maps.places.v1.Review;
import org.example.strongauto.core.model.dto.reviews.ReviewDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.google.protobuf.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Mapper
public interface ReviewsConverter {

  default LocalDateTime map(Timestamp value) {
    return LocalDateTime.ofEpochSecond(value.getSeconds(), value.getNanos(), ZoneOffset.UTC);
  }

  @Mapping(target = "platform", constant = "GOOGLE")
  ReviewDto convertReview(Review review);
}
