package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongautoreviews.model.Review;
import com.example.strongauto.rest.api.strongautoreviews.model.Reviews;
import org.example.strongauto.core.model.dto.reviews.ReviewDto;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ReviewsRestConverter {

  @Mapping(target = "reviewer", source = "authorAttribution")
  @Mapping(target = "text", source = "text.text")
  Review convertReview(ReviewDto review);

  Reviews convertReviews(ReviewsDto reviews);
}
