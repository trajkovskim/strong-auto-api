package org.example.strongauto.persistence.converter;

import org.example.strongauto.core.model.dto.LocalizedTextDto;
import org.example.strongauto.persistence.model.LocalizedText;
import org.example.strongauto.persistence.model.LocalizedTextList;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface LocalizedTextConverter {

  LocalizedTextDto convert(LocalizedText localizedText);
  LocalizedText convert(LocalizedTextDto localizedTextDto);

  default List<LocalizedTextDto> convert(LocalizedTextList localizedTextList) {
    return localizedTextList.getTextList().stream().map(this::convert).collect(Collectors.toList());
  }

  default LocalizedTextList convert(List<LocalizedTextDto> localizedTextDtoList) {

    LocalizedTextList localizedTextList = new LocalizedTextList();

    Set<LocalizedText> textList = localizedTextDtoList.stream().map(this::convert).collect(Collectors.toSet());
    localizedTextList.setTextList(textList);

    return localizedTextList;
  }

}
