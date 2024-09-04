package org.example.strongauto.core.model.dto.reviews;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewDto {

  private String name;
  private String relativePublishTimeDescription;
  private LocalizedTextDto text;
  private LocalizedTextDto originalText;
  private Double rating;
  private ReviewerDto authorAttribution;
  private LocalDateTime publishTime;
  private ReviewPlatformEnum platform;
}
