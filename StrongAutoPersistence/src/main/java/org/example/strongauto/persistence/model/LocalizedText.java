package org.example.strongauto.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;
import org.example.strongauto.persistence.model.enums.Language;

/**
 * Localized text entity.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.LOCALIZED_TEXT_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class LocalizedText extends BaseEntity<Long> {

  public static final String LOCALIZED_TEXT_TABLE_SEQUENCE = "localized_text_sequence_generator";
  public static final String LOCALIZED_TEXT_TABLE_SEQUENCE_NAME = "localized_text_sequence";

  @Id
  @SequenceGenerator(
      name = LOCALIZED_TEXT_TABLE_SEQUENCE,
      sequenceName = LOCALIZED_TEXT_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = LOCALIZED_TEXT_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "language", nullable = false)
  private Language language;

  @Column(name = "text", nullable = false)
  private String text;
}
