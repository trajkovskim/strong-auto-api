package org.example.strongauto.rest.converter;

import com.example.rest.model.LocalizedText;
import org.example.strongauto.core.model.dto.LocalizedTextDto;
import org.example.strongauto.core.model.dto.LocalizedTextListDto;
import org.example.strongauto.core.model.enums.LanguageEnum;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * Localized text converter.
 */
@Mapper
public interface LocalizedTextConverter {

  LocalizedTextDto map(LocalizedText localizedText);

  default LocalizedTextListDto map(List<LocalizedText> textList) {
    if (textList == null) {
      return null;
    }

    List<LocalizedTextDto> localizedTextDtos = textList.stream().map(this::map).toList();

    return LocalizedTextListDto.builder().textList(localizedTextDtos).build();
  }

  default String convert(LocalizedTextListDto localizedTextListDto, @Context String language) {
    if(language == null) {
      return null;
    }

    LanguageEnum languageEnum = LanguageEnum.valueOf(language);

    return localizedTextListDto.getTextList()
        .stream()
        .filter(localizedTextDto -> languageEnum.equals(localizedTextDto.getLanguage()))
        .findAny()
        .map(LocalizedTextDto::getText)
        .orElse(null);
  }
}
