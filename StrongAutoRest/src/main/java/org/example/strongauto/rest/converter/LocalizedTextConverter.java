package org.example.strongauto.rest.converter;

import com.example.strongauto.rest.api.strongauto.model.LocalizedText;
import org.example.strongauto.core.model.dto.LocalizedTextDto;
import org.example.strongauto.core.model.enums.LanguageEnum;
import org.mapstruct.Mapper;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.util.CollectionUtils;

import java.util.Arrays;
import java.util.List;

/**
 * Localized text converter.
 */
@Mapper
public interface LocalizedTextConverter {

  LocalizedTextDto map(LocalizedText localizedText);

  default String convert(List<LocalizedTextDto> localizedTextListDto) {

    String language = LocaleContextHolder.getLocale().getLanguage();

    if (CollectionUtils.isEmpty(localizedTextListDto)) {
      return null;
    }

    LanguageEnum parsedLanguage = Arrays.stream(LanguageEnum.values())
        .filter(value -> language.contains(value.toString().toLowerCase()))
        .findFirst()
        .orElse(LanguageEnum.EN);

    return localizedTextListDto
        .stream()
        .filter(localizedTextDto -> parsedLanguage.equals(localizedTextDto.getLanguage()))
        .findAny()
        .map(LocalizedTextDto::getText)
        .orElse(null);
  }
}
