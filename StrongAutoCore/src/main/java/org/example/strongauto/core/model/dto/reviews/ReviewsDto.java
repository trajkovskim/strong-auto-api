package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ReviewsDto {

  private List<ReviewDto> reviews;
}
