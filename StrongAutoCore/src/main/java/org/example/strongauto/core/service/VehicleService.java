package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleConverter;
import org.example.strongauto.core.exception.VehicleFeaturesMissingException;
import org.example.strongauto.core.exception.VehicleModelNotPresentInMakeException;
import org.example.strongauto.core.exception.VehicleNotFoundException;
import org.example.strongauto.core.model.dto.LocalizedTextListDto;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleFeatureDto;
import org.example.strongauto.core.model.dto.VehicleFiltersDto;
import org.example.strongauto.core.model.dto.VehicleMakeDto;
import org.example.strongauto.core.model.dto.VehicleModelDto;
import org.example.strongauto.core.utils.PageUtils;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleFeature;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.VehicleFeatureRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class VehicleService {

  private final VehicleMakeService vehicleMakeService;
  private final VehicleFeatureRepository vehicleFeatureRepository;

  private final VehicleRepository vehicleRepository;

  private final VehicleConverter vehicleConverter;

  public VehicleDto findById(Long id) {
    final Vehicle vehicle =
        vehicleRepository.findById(id).orElseThrow(() -> new VehicleNotFoundException("Vehicle not found: " + id));

    return vehicleConverter.convertVehicle(vehicle);
  }

  public PageInfoDto<VehicleEmbeddedDto> findAllPageable(
      VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy) {

    VehicleFilters vehicleFilters = vehicleConverter.convertVehicleFilters(vehicleFiltersDto);
    Pageable pageRequest = PageUtils.createPageRequest(pageNumber, pageSize, sortBy);

    final Page<VehicleEmbeddedProjection> page = vehicleRepository.findAllBy(vehicleFilters, pageRequest);

    Collection<VehicleEmbeddedDto> items = page.get().map(vehicleConverter::convertVehicle).toList();

    return PageInfoDto.<VehicleEmbeddedDto>builder()
        .totalPages(page.getTotalPages())
        .totalElements(page.getTotalElements())
        .pageSize(page.getSize())
        .pageNumber(page.getNumber())
        .items(items)
        .build();
  }

  private Optional<VehicleModelDto> getModelFromMake(VehicleMakeDto make, String model) {

    return make.getModels().stream().filter(makeModel -> model.equals(makeModel.getModel())).findFirst();
  }

  private VehicleDto finalizeVehicleDto(VehicleDto vehicleDto) {

    VehicleMakeDto vehicleMakeDto = vehicleDto.getMake();

    if (vehicleMakeDto == null) {
      return vehicleDto;
    }

    VehicleMakeDto foundVehicleMakeDto = vehicleMakeService.findByMakeName(vehicleMakeDto.getMake());
    VehicleModelDto vehicleModelDto = vehicleDto.getModel();

    if(vehicleModelDto == null) {

      return vehicleDto.toBuilder()
          .make(foundVehicleMakeDto)
          .build();
    }

    VehicleModelDto foundVehicleModelDto = getModelFromMake(foundVehicleMakeDto, vehicleModelDto.getModel())
        .orElseThrow(() -> new VehicleModelNotPresentInMakeException(
            "Model %s not present in %s".formatted(foundVehicleMakeDto.getMake(), vehicleModelDto.getModel())));

    return vehicleDto.toBuilder()
        .make(foundVehicleMakeDto)
        .model(foundVehicleModelDto)
        .build();
  }

  public Long createVehicle(VehicleDto vehicleDto) {

    VehicleDto finalizedVehicleDto = finalizeVehicleDto(vehicleDto);

    Vehicle vehicle = vehicleConverter.convertVehicle(finalizedVehicleDto);

    Vehicle savedVehicle = vehicleRepository.save(vehicle);

    return savedVehicle.getId();
  }

  public VehicleDto finalizeVehicleDto(VehicleDto vehicleDto, VehicleDto foundVehicleDto) {

    LocalizedTextListDto title = vehicleDto.getTitle().toBuilder()
        .id(foundVehicleDto.getTitle().getId())
        .build();


    LocalizedTextListDto description = Optional.ofNullable(foundVehicleDto.getDescription())
        .map(LocalizedTextListDto::getId)
        .flatMap(foundVehicleDescriptionId ->
            Optional.ofNullable(vehicleDto.getDescription())
                .map(LocalizedTextListDto::toBuilder)
                .map(x -> x.id(foundVehicleDescriptionId)))
        .map(LocalizedTextListDto.LocalizedTextListDtoBuilder::build)
        .orElse(null);

    LocalizedTextListDto summary = Optional.ofNullable(foundVehicleDto.getSummary())
        .map(LocalizedTextListDto::getId)
        .flatMap(localizedTextListId ->
            Optional.of(vehicleDto.getSummary())
                .map(LocalizedTextListDto::toBuilder)
                .map(x -> x.id(localizedTextListId)))
        .map(LocalizedTextListDto.LocalizedTextListDtoBuilder::build)
        .orElse(null);

    return vehicleDto.toBuilder()
        .id(foundVehicleDto.getId())
        .title(title)
        .description(description)
        .summary(summary)
        .build();
  }

  public Long updateVehicle(Long id, VehicleDto vehicleDto) {

    VehicleDto foundVehicle = findById(id);
    VehicleDto finalizedVehicleDto = finalizeVehicleDto(vehicleDto, foundVehicle);

    Vehicle vehicle = vehicleConverter.convertVehicle(finalizedVehicleDto);

    List<VehicleFeatureDto> vehicleFeatures = finalizedVehicleDto.getFeatures();

    if(vehicleFeatures != null) {

      Map<VehicleFeatureDto, Optional<VehicleFeature>> vehicleFeaturesMap = vehicleFeatures
          .parallelStream()
          .collect(Collectors.toMap(
              vehicleFeatureDto -> vehicleFeatureDto,
              feature -> vehicleFeatureRepository.findByGroupKeyAndFeatureKey(
                  feature.getGroupKey(), feature.getFeatureKey())));

      String missingVehicleFeatures = vehicleFeaturesMap.entrySet()
          .parallelStream()
          .filter(entry -> entry.getValue().isEmpty())
          .map(Map.Entry::getKey)
          .map(feature -> "%s:%s".formatted(feature.getGroupKey(), feature.getFeatureKey()))
          .collect(Collectors.joining(", "));

      if (!missingVehicleFeatures.isEmpty()) {
        throw new VehicleFeaturesMissingException("Vehicle features missing: " + missingVehicleFeatures);
      }

      Set<VehicleFeature> vehicleFeatureEntities =
          vehicleFeaturesMap.values().parallelStream().map(Optional::get).collect(Collectors.toSet());

      vehicle.setFeatures(vehicleFeatureEntities);
    }

    Vehicle savedVehicle = vehicleRepository.save(vehicle);

    return savedVehicle.getId();
  }
  public void deleteVehicle(Long id) {

    vehicleRepository.deleteById(id);
  }
}
