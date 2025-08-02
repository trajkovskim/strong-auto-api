package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongauto.model.ImageResponse;
import com.example.strongauto.rest.api.strongauto.model.ImagesResponse;
import org.example.strongauto.core.model.dto.PageInfoDto;
import org.example.strongauto.core.model.dto.ImageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ImageRestConverter {

  ImageResponse convert(ImageDto imageDto);

  @Mapping(target = "images", source = "pageDto.items")
  @Mapping(target = "info", source = ".")
  ImagesResponse convert(PageInfoDto<ImageDto> pageDto);
}
