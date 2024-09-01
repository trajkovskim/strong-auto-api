package org.example.strongauto.core.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.converter.VehicleImageConverter;
import org.example.strongauto.core.exception.EntityNotFoundException;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.VehicleEmbeddedDto;
import org.example.strongauto.core.model.dto.VehicleImageDto;
import org.example.strongauto.core.utils.PageUtils;
import org.example.strongauto.persistence.model.VehicleImage;
import org.example.strongauto.persistence.model.projections.VehicleEmbeddedProjection;
import org.example.strongauto.persistence.repository.VehicleImageRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleImageService {

  private final VehicleRepository vehicleRepository;
  private final VehicleImageRepository vehicleImageRepository;
  private final VehicleImageConverter vehicleImageConverter;

  public VehicleImageDto findById(Long id) {

    return vehicleImageRepository.findById(id)
        .map(vehicleImageConverter::convertVehicleImage)
        .orElseThrow(() -> new EntityNotFoundException("Vehicle image not found: " + id));
  }

  public PageInfoDto<VehicleImageDto> findAllPageable(Long vehicleId, Integer pageNumber, Integer pageSize, List<String> sortBy) {

    Pageable pageable = PageUtils.createPageRequest(pageNumber, pageSize, sortBy);

    Page<VehicleImage> page = vehicleRepository.findVehicleImagesById(vehicleId, pageable);

    Collection<VehicleImageDto> items =
        page.get().map(vehicleImageConverter::convertVehicleImage).toList();

    return PageInfoDto.<VehicleImageDto>builder()
        .totalPages(page.getTotalPages())
        .totalElements(page.getTotalElements())
        .pageSize(page.getSize())
        .pageNumber(page.getNumber())
        .items(items)
        .build();
  }
}
