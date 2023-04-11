package org.example.strongauto.persistence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "vehicle")
@NoArgsConstructor
public class Vehicle {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String title;

  private String description;

  private Double amount;

  private String currency;
}
