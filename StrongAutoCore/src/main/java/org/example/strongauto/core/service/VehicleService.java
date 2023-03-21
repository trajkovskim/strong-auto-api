package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleCoreConverter;
import org.example.strongauto.core.exception.VehicleNotFoundException;
import org.example.strongauto.core.model.PageInfo;
import org.example.strongauto.core.model.Vehicle;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class VehicleService {

  private final VehicleRepository vehicleRepository;

  private final VehicleCoreConverter vehicleCoreConverter;

  public Vehicle findById(String id) {
    final UUID uuid = UUID.fromString(id);
    final org.example.strongauto.persistence.model.Vehicle vehicle =
        vehicleRepository.findById(uuid).orElseThrow(VehicleNotFoundException::new);

    return vehicleCoreConverter.convertVehicle(vehicle);
  }

  public PageInfo<Vehicle> findAllPageable(Integer pageNumber, Integer pageSize, List<String> sortBy) {
    List<Sort.Order> orders = sortBy.stream().map(sorter -> {
      final String[] x = sorter.split("=");
      return x[1] != null && x[1].equals("desc") ? Sort.Order.desc(x[0]) : Sort.Order.asc(x[0]);
    }).toList();

    final Sort sort = Sort.by(orders);
    final Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
    final Page<org.example.strongauto.persistence.model.Vehicle> page = vehicleRepository.findAll(pageable);

    Collection<Vehicle> items = vehicleCoreConverter.convertListOfVehicleToCore(page.get().toList());

    return PageInfo.<Vehicle>builder()
        .pageNumber(page.getNumber())
        .totalPages(page.getTotalPages())
        .items(items)
        .build();
  }

}
