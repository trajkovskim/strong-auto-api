package org.example.strongauto.persistence.adapter.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleVariantDto;
import org.example.strongauto.persistence.converter.VehicleVariantConverter;
import org.example.strongauto.persistence.model.VehicleVariant;
import org.example.strongauto.persistence.repository.VehicleVariantRepository;
import org.example.strongauto.persistence.utils.PageUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VehicleVariantPersistenceService {

  private final VehicleVariantRepository vehicleVariantRepository;
  private final VehicleVariantConverter vehicleVariantConverter;

  public PageInfoDto<VehicleVariantDto> getVehicleVariants(Integer page, Integer size, List<String> sortBy) {

    Pageable pageable = PageUtils.createPageRequest(page, size, sortBy);
    Page<VehicleVariant> vehicleVariantsPage = vehicleVariantRepository.findAll(pageable);

    List<VehicleVariantDto> vehicleVariants = vehicleVariantsPage.get().map(vehicleVariantConverter::convert).toList();
    return PageInfoDto.<VehicleVariantDto>builder()
        .items(vehicleVariants)
        .totalPages(vehicleVariantsPage.getTotalPages())
        .totalElements(vehicleVariantsPage.getTotalElements())
        .pageNumber(page)
        .pageSize(size)
        .build();
  }

  public Optional<VehicleVariantDto> getVehicleVariant(Long id) {
    return vehicleVariantRepository.findById(id).map(vehicleVariantConverter::convert);
  }

  public Long createVehicleVariant(VehicleVariantDto vehicleVariantDto) {

    VehicleVariant vehicleVariant = vehicleVariantConverter.convert(vehicleVariantDto);
    VehicleVariant save = vehicleVariantRepository.save(vehicleVariant);

    return save.getId();
  }

  public Long updateVehicleVariant(Long id, VehicleVariantDto vehicleVariantDto) {

    VehicleVariant vehicleVariant = vehicleVariantConverter.convert(vehicleVariantDto);
    vehicleVariant.setId(id);

    vehicleVariantRepository.save(vehicleVariant);

    return vehicleVariant.getId();
  }

  public void deleteVehicleVariant(Long id) {
    vehicleVariantRepository.deleteById(id);
  }
}
