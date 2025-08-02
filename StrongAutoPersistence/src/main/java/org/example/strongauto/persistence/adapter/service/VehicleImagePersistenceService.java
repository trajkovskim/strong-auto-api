package org.example.strongauto.persistence.adapter.service;

import lombok.RequiredArgsConstructor;
import org.example.strongauto.core.model.dto.ImageDto;
import org.example.strongauto.persistence.converter.VehicleImageConverter;
import org.example.strongauto.core.exception.EntityNotFoundException;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.persistence.utils.PageUtils;
import org.example.strongauto.persistence.model.VehicleImage;
import org.example.strongauto.persistence.repository.VehicleImageRepository;
import org.example.strongauto.persistence.repository.VehicleRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleImagePersistenceService {

  private final VehicleRepository vehicleRepository;
  private final VehicleImageRepository vehicleImageRepository;
  private final VehicleImageConverter vehicleImageConverter;

  public ImageDto getVehicleImage(Long id) {

    return vehicleImageRepository.findById(id)
        .map(vehicleImageConverter::convertVehicleImage)
        .orElseThrow(() -> new EntityNotFoundException("Vehicle image not found: " + id));
  }

  public PageInfoDto<ImageDto> getVehicleImages(
      Long vehicleId, Integer pageNumber, Integer pageSize, List<String> sortBy) {

    Pageable pageable = PageUtils.createPageRequest(pageNumber, pageSize, sortBy);
    Page<VehicleImage> page = vehicleRepository.findVehicleImagesById(vehicleId, pageable);

    Collection<ImageDto> items = page.get().map(vehicleImageConverter::convertVehicleImage).toList();
    return PageInfoDto.<ImageDto>builder()
        .totalPages(page.getTotalPages())
        .totalElements(page.getTotalElements())
        .pageSize(page.getSize())
        .pageNumber(page.getNumber())
        .items(items)
        .build();
  }
}
