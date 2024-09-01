package org.example.strongauto.persistence;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.example.strongauto.persistence.model.LocalizedText;
import org.example.strongauto.persistence.model.LocalizedTextList;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.example.strongauto.persistence.model.VehicleImage;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.VehicleModel;
import org.example.strongauto.persistence.model.enums.Color;
import org.example.strongauto.persistence.model.enums.Currency;
import org.example.strongauto.persistence.model.enums.Language;
import org.example.strongauto.persistence.model.enums.VehicleBodyType;
import org.example.strongauto.persistence.model.enums.VehicleCondition;
import org.example.strongauto.persistence.model.enums.VehicleDriveType;
import org.example.strongauto.persistence.model.enums.VehicleFuelType;
import org.example.strongauto.persistence.model.enums.VehicleState;
import org.example.strongauto.persistence.model.enums.VehicleTransmission;
import org.example.strongauto.persistence.repository.VehicleMakeRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@ConditionalOnProperty(value = "mock-db", havingValue = "true")
@Component
@RequiredArgsConstructor
public class DatabaseBootstrapper {

  private final VehicleRepository vehicleRepository;
  private final VehicleMakeRepository vehicleMakeRepository;

  private VehicleImage createVehicleImage(String name, String contentType, byte[] data) {

    VehicleImage vehicleImage = new VehicleImage();

    vehicleImage.setName(name);
    vehicleImage.setContentType(contentType);
    vehicleImage.setData(data);

    return vehicleImage;
  }

  @SneakyThrows
  private Vehicle createVehicle(VehicleMake make, VehicleModel model, Set<VehicleFeature> features) {

    LocalizedTextList title = new LocalizedTextList();
    title.setTextList(Set.of(
        createLocalizedText("Audi B8 2.0 TDI", Language.MK),
        createLocalizedText("Audi B8 2.0 TDI", Language.EN)));
    LocalizedTextList summary = new LocalizedTextList();
    summary.setTextList(Set.of(
        createLocalizedText("Краток Опис", Language.MK),
        createLocalizedText("Short summary", Language.EN)));
    LocalizedTextList description = new LocalizedTextList();
    description.setTextList(Set.of(
        createLocalizedText("Опис", Language.MK),
        createLocalizedText("Description", Language.EN)));

    Vehicle vehicle = new Vehicle();
    vehicle.setTitle(title);
    vehicle.setSummary(summary);
    vehicle.setDescription(description);
    vehicle.setMake(make);
    vehicle.setModel(model);
    vehicle.setState(VehicleState.SOLD);
    vehicle.setCondition(VehicleCondition.NEW);
    vehicle.setTransmission(VehicleTransmission.AUTOMATIC);
    vehicle.setBodyType(VehicleBodyType.SEDAN);
    vehicle.setDriveType(VehicleDriveType._2WD_FWD);
    vehicle.setFuelType(VehicleFuelType.DIESEL);
    vehicle.setEngineSize("2.0");
    vehicle.setYear(2010);
    vehicle.setMileage(150000);
    vehicle.setDoors(4);
    vehicle.setTotalAmount(10000.0);
    vehicle.setCurrency(Currency.EUR);
    vehicle.setColor(Color.BLACK);
    vehicle.setFeatures(features);

    vehicle.setImages(Set.of(
        createVehicleImage(
            "passat1.jpg",
            "image/jpeg",
            new ClassPathResource("images/passat1.jpg").getInputStream().readAllBytes()),
        createVehicleImage(
            "passat2.jpg",
            "image/jpeg",
            new ClassPathResource("images/passat2.jpg").getInputStream().readAllBytes())));

    return vehicle;
  }

  private VehicleMake createVehicleMake(String make, Set<VehicleModel> models) {

    VehicleMake vehicleMake = new VehicleMake();
    vehicleMake.setMake(make);
    vehicleMake.setModels(models);

    return vehicleMake;
  }

  private LocalizedText createLocalizedText(String text, Language language) {

    LocalizedText localizedText = new LocalizedText();
    localizedText.setText(text);
    localizedText.setLanguage(language);

    return localizedText;
  }

  @PostConstruct
  void init() {

    VehicleModel audiA4 = new VehicleModel();
    audiA4.setModel("A4");
    VehicleModel audiA5 = new VehicleModel();
    audiA5.setModel("A5");

    VehicleModel bmwX1 = new VehicleModel();
    bmwX1.setModel("X1");

    Map<String, VehicleMake> make = new HashMap<>();
    make.put("ABARTH", createVehicleMake("ABARTH", Set.of()));
    make.put("ACURA", createVehicleMake("ACURA", Set.of()));
    make.put("ROMEO", createVehicleMake("ROMEO", Set.of()));
    make.put("MARTIN", createVehicleMake("MARTIN", Set.of()));
    make.put("AUDI", createVehicleMake("AUDI", Set.of(audiA4, audiA5)));
    make.put("BENTLEY", createVehicleMake("BENTLEY", Set.of()));
    make.put("BMW", createVehicleMake("BMW", Set.of(bmwX1)));
    make.put("BUICK", createVehicleMake("BUICK", Set.of()));
    make.put("CADILLAC", createVehicleMake("CADILLAC", Set.of()));
    make.put("CHEVROLET", createVehicleMake("CHEVROLET", Set.of()));
    make.put("CHRYSLER", createVehicleMake("CHRYSLER", Set.of()));
    make.put("CITROEN", createVehicleMake("CITROEN", Set.of()));
    make.put("DACIA", createVehicleMake("DACIA", Set.of()));
    make.put("DODGE", createVehicleMake("DODGE", Set.of()));
    make.put("FERRARI", createVehicleMake("FERRARI", Set.of()));
    make.put("FIAT", createVehicleMake("FIAT", Set.of()));
    make.put("FORD", createVehicleMake("FORD", Set.of()));
    make.put("GMC", createVehicleMake("GMC", Set.of()));
    make.put("HONDA", createVehicleMake("HONDA", Set.of()));
    make.put("HUMMER", createVehicleMake("HUMMER", Set.of()));
    make.put("HYUNDAI", createVehicleMake("HYUNDAI", Set.of()));
    make.put("INFINITI", createVehicleMake("INFINITI", Set.of()));
    make.put("ISUZU", createVehicleMake("ISUZU", Set.of()));
    make.put("JAGUAR", createVehicleMake("JAGUAR", Set.of()));
    make.put("JEEP", createVehicleMake("JEEP", Set.of()));
    make.put("KIA", createVehicleMake("KIA", Set.of()));
    make.put("LAMBORGHINI", createVehicleMake("LAMBORGHINI", Set.of()));
    make.put("LANCIA", createVehicleMake("LANCIA", Set.of()));
    make.put("ROVER", createVehicleMake("ROVER", Set.of()));
    make.put("LEXUS", createVehicleMake("LEXUS", Set.of()));
    make.put("LINCOLN", createVehicleMake("LINCOLN", Set.of()));
    make.put("LOTUS", createVehicleMake("LOTUS", Set.of()));
    make.put("MASERATI", createVehicleMake("MASERATI", Set.of()));
    make.put("MAZDA", createVehicleMake("MAZDA", Set.of()));
    make.put("MERCEDES_BENZ", createVehicleMake("MERCEDES_BENZ", Set.of()));
    make.put("MERCURY", createVehicleMake("MERCURY", Set.of()));
    make.put("MINI", createVehicleMake("MINI", Set.of()));
    make.put("MITSUBISHI", createVehicleMake("MITSUBISHI", Set.of()));
    make.put("NISSAN", createVehicleMake("NISSAN", Set.of()));
    make.put("OPEL", createVehicleMake("OPEL", Set.of()));
    make.put("PEUGEOT", createVehicleMake("PEUGEOT", Set.of()));
    make.put("PONTIAC", createVehicleMake("PONTIAC", Set.of()));
    make.put("PORSCHE", createVehicleMake("PORSCHE", Set.of()));
    make.put("RAM", createVehicleMake("RAM", Set.of()));
    make.put("RENAULT", createVehicleMake("RENAULT", Set.of()));
    make.put("SAAB", createVehicleMake("SAAB", Set.of()));
    make.put("SATURN", createVehicleMake("SATURN", Set.of()));
    make.put("SCION", createVehicleMake("SCION", Set.of()));
    make.put("SEAT", createVehicleMake("SEAT", Set.of()));
    make.put("SKODA", createVehicleMake("SKODA", Set.of()));
    make.put("SMART", createVehicleMake("SMART", Set.of()));
    make.put("SSANGYONG", createVehicleMake("SSANGYONG", Set.of()));
    make.put("SUBARU", createVehicleMake("SUBARU", Set.of()));
    make.put("SUZUKI", createVehicleMake("SUZUKI", Set.of()));
    make.put("TESLA", createVehicleMake("TESLA", Set.of()));
    make.put("TOYOTA", createVehicleMake("TOYOTA", Set.of()));
    make.put("VOLKSWAGEN", createVehicleMake("VOLKSWAGEN", Set.of()));
    make.put("VOLVO", createVehicleMake("VOLVO", Set.of()));
    make.put("WIESMANN", createVehicleMake("WIESMANN", Set.of()));

    vehicleMakeRepository.saveAllAndFlush(make.values());

    Vehicle vehicle1 = createVehicle(make.get("AUDI"), audiA4, null);

    Vehicle vehicle2 = createVehicle(make.get("AUDI"), audiA5, null);
    vehicle2.setYear(2014);

    Vehicle vehicle3 = createVehicle(make.get("BMW"), bmwX1, null);
    vehicle3.setState(VehicleState.FEATURED);
    vehicle3.setBodyType(VehicleBodyType.SUV);
    vehicle3.setYear(2023);

    Vehicle vehicle4 = createVehicle(null, null, null);
    vehicle4.setState(VehicleState.FEATURED);
    vehicle4.setBodyType(VehicleBodyType.TRUCK);
    vehicle4.setYear(2023);

    vehicleRepository.saveAllAndFlush(List.of(vehicle1, vehicle2, vehicle3, vehicle4));
  }

}
