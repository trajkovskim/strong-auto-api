package org.example.strongauto.webclient.model.google.place;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class Review {
//  {
//    "reviews": [
//    {
//      "name": "places/ChIJ8SSGZkn_qRQR0O1XSyLI_s8/reviews/ChZDSUhNMG9nS0VJQ0FnSUNIaHZQNllnEAE",
//        "relativePublishTimeDescription": "in the last week",
//        "rating": 5,
//        "text": {
//      "text": "Great service",
//          "languageCode": "en"
//    },
//      "originalText": {
//      "text": "Great service",
//          "languageCode": "en"
//    },
//      "authorAttribution": {
//      "displayName": "Marjan Trajkovski",
//          "uri": "https://www.google.com/maps/contrib/104613739638686309673/reviews",
//          "photoUri": "https://lh3.googleusercontent.com/a/ACg8ocJ4jSCM7V7g7V_ShgylgDAFhoEw7ax5YhVPKCSdiGBkZrsOAg=s128-c0x00000000-cc-rp-mo"
//    },
//      "publishTime": "2024-09-04T08:28:49Z"
//    }
//  ]
//  }

  private String name;
  private String relativePublishTimeDescription;
  private LocalizedText text;
  private LocalizedText originalText;
  private Double rating;
  private AuthorAttribution authorAttribution;
  private LocalDateTime publishTime;
}
