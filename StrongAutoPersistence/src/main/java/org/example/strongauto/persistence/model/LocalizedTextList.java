package org.example.strongauto.persistence.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.strongauto.persistence.model.constants.RepositoryConstants;

import java.util.List;

/**
 * Localized text list.
 */
@Getter
@Setter
@Entity
@Table(name = RepositoryConstants.LOCALIZED_TEXT_REF_TABLE, schema = RepositoryConstants.SCHEMA)
@NoArgsConstructor
public class LocalizedTextList {

  public static final String LOCALIZED_TEXT_REF_TABLE_SEQUENCE = "localized_text_ref_sequence_generator";
  public static final String LOCALIZED_TEXT_REF_TABLE_SEQUENCE_NAME = "localized_text_ref_sequence";

  @Id
  @SequenceGenerator(
      name = LOCALIZED_TEXT_REF_TABLE_SEQUENCE,
      sequenceName = LOCALIZED_TEXT_REF_TABLE_SEQUENCE_NAME,
      schema = RepositoryConstants.SCHEMA,
      allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = LOCALIZED_TEXT_REF_TABLE_SEQUENCE)
  @Column(name = "id")
  private Long id;

  @JoinColumn(name = "localized_text_ref_id", referencedColumnName = "id")
  @OneToMany(cascade = CascadeType.ALL)
  private List<LocalizedText> textList;
}
