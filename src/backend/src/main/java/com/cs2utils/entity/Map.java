package com.cs2utils.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "map")
public class Map {

    @Id
    private String id;
    private String name;
    private String assetName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}