package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.LocalizedText;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalizedTextRepository extends JpaRepository<LocalizedText, Long> {
}
