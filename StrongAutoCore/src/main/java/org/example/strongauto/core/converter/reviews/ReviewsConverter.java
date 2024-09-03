package org.example.strongauto.core.converter.reviews;

import com.example.strongauto.webclient.model.reviews.Reviews;
import org.example.strongauto.core.model.dto.reviews.ReviewsDto;
import org.mapstruct.Mapper;

@Mapper
public interface ReviewsConverter {

  ReviewsDto convertReviews(Reviews reviews);
}
