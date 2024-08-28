package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleConverter;
import org.example.strongauto.core.converter.VehicleMakeConverter;
import org.example.strongauto.core.exception.VehicleMakeNotFoundException;
import org.example.strongauto.core.exception.VehicleNotFoundException;
import org.example.strongauto.core.model.PageInfoDto;
import org.example.strongauto.core.model.VehicleDto;
import org.example.strongauto.core.model.VehicleEmbeddedDto;
import org.example.strongauto.core.model.VehicleFiltersDto;
import org.example.strongauto.core.model.VehicleMakeDto;
import org.example.strongauto.persistence.model.Vehicle;
import org.example.strongauto.persistence.model.VehicleMake;
import org.example.strongauto.persistence.model.filters.VehicleFilters;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.VehicleMakeRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class VehicleService {

  private final VehicleRepository vehicleRepository;
  private final VehicleMakeRepository vehicleMakeRepository;

  private final VehicleConverter vehicleConverter;
  private final VehicleMakeConverter vehicleMakeConverter;

  public VehicleDto findById(Long id) {
    final Vehicle vehicle = vehicleRepository
        .findById(id)
        .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found: " + id));

    return vehicleConverter.convertVehicle(vehicle);
  }

  public PageInfoDto<VehicleEmbeddedDto> findAllPageable(VehicleFiltersDto vehicleFiltersDto, Integer pageNumber, Integer pageSize, List<String> sortBy) {
    List<Sort.Order> orders = sortBy.stream().map(sorter -> {
      final String[] x = sorter.split("=");
      return x[1] != null && x[1].equals("desc") ? Sort.Order.desc(x[0]) : Sort.Order.asc(x[0]);
    }).toList();

    final Sort sort = Sort.by(orders);
    final Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

    VehicleFilters vehicleFilters = vehicleConverter.convertVehicleFilters(vehicleFiltersDto);
    final Page<VehicleEmbeddedProjection> page = vehicleRepository.findAllBy(vehicleFilters, pageable);

    Collection<VehicleEmbeddedDto> items = page
        .get()
        .map(vehicleConverter::convertVehicle)
        .toList();

    return PageInfoDto.<VehicleEmbeddedDto>builder()
        .pageNumber(page.getNumber())
        .totalPages(page.getTotalPages())
        .items(items)
        .build();
  }

  public VehicleMakeDto findVehicleMakeByMake(String make) {

    VehicleMake foundVehicleMake = vehicleMakeRepository
        .findByMake(make)
        .orElseThrow(() -> new VehicleMakeNotFoundException("Vehicle make not found: " + make));

    return vehicleMakeConverter.convertVehicleMake(foundVehicleMake);
  }

  public List<VehicleMakeDto> findVehicleMakes() {

    List<VehicleMake> foundVehicleMake = vehicleMakeRepository.findAll();

    return foundVehicleMake.stream().map(vehicleMakeConverter::convertVehicleMake).toList();
  }
}
