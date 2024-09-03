package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongautoreviews.model.Reviews;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.example.strongauto.core.model.enums.reviews.StarRating;
import org.mapstruct.Mapper;

@Mapper
public interface ReviewsRestConverter {

  default Integer map(StarRating starRating) {
    return starRating.getRating();
  }

  Reviews convertReviews(ReviewsDto reviews);
}
