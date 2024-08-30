package org.example.strongauto.persistence.model.projections;

import org.example.strongauto.persistence.model.LocalizedTextList;
import org.example.strongauto.persistence.model.VehicleImage;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.VehicleModel;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.VehicleDriveType;
import org.example.strongauto.persistence.model.enums.VehicleFuelType;
import org.example.strongauto.persistence.model.enums.VehicleState;
import org.example.strongauto.persistence.model.enums.VehicleTransmission;

import java.util.List;

/**
 * Vehicle embedded projection
 */
public interface VehicleEmbeddedProjection {

  Long getId();

  VehicleState getState();

  LocalizedTextList getTitle();

  LocalizedTextList getSummary();

  VehicleMake getMake();

  VehicleModel getModel();

  VehicleTransmission getTransmission();

  VehicleDriveType getDriveType();

  VehicleFuelType getFuelType();

  Integer getMileage();

  Integer getYear();

  Double getTotalAmount();

  Double getTotalPromoAmount();

  Currency getCurrency();

  List<VehicleImage> getImages();
}
