package org.example.strongauto.persistence.repository;

import org.example.strongauto.persistence.model.LocalizedTextList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalizedTextListRepository extends JpaRepository<LocalizedTextList, Long> {
}
