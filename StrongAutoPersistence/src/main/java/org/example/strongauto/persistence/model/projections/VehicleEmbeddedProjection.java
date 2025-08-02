package org.example.strongauto.persistence.model.projections;

import org.example.strongauto.persistence.model.LocalizedTextList;
import org.example.strongauto.persistence.model.VehicleVariant;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.VehicleState;

import java.util.List;

/**
 * Vehicle embedded projection
 */
public interface VehicleEmbeddedProjection {

  Long getId();

  VehicleState getState();

  LocalizedTextList getTitle();

  LocalizedTextList getSummary();

  VehicleVariant getVariant();

  Integer getMileage();

  Integer getYear();

  Double getTotalAmount();

  Double getTotalPromoAmount();

  Currency getCurrency();

  List<VehicleImageEmbeddedProjection> getImages();
}
