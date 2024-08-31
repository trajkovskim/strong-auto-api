package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.LocalizedText;
import org.example.strongauto.persistence.model.LocalizedTextList;
import org.example.strongauto.persistence.model.enums.Language;
import org.example.strongauto.persistence.repository.configuration.RepositoryTestConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for {@link VehicleRepository}.
 */
@DataJpaTest
@ContextConfiguration(classes = RepositoryTestConfiguration.class)
@ActiveProfiles("test")
public class LocalizedTextListRepositoryTest {

  @Autowired
  private LocalizedTextListRepository localizedTextListRepository;

  @Autowired
  private LocalizedTextRepository localizedTextRepository;

  private LocalizedText createLocalizedText(String text, Language language) {

    LocalizedText localizedText = new LocalizedText();
    localizedText.setText(text);
    localizedText.setLanguage(language);

    return localizedText;
  }

  /** See method name. */
  @Test
  void shouldUpdateLocalizedTextList() {

    // Given
    LocalizedText textMK = createLocalizedText("textMK", Language.MK);
    LocalizedText textEN = createLocalizedText("textEN", Language.EN);

    LocalizedTextList localizedTextList = new LocalizedTextList();
    localizedTextList.setTextList(new HashSet<>(List.of(textMK, textEN)));
    localizedTextListRepository.saveAndFlush(localizedTextList);

    // When
    localizedTextList.getTextList().clear();
    localizedTextList.getTextList().add(createLocalizedText("textMK", Language.MK));
    LocalizedTextList updated = localizedTextListRepository.saveAndFlush(localizedTextList);

    // Then
    assertThat(updated).isNotNull();
    assertThat(updated.getTextList()).hasSize(1);

    List<LocalizedText> all = localizedTextRepository.findAll();
    assertThat(all).hasSize(1);
  }
}
