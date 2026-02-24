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
@Table(name = "lineup")
public class Lineup {

    @Id
    private int id;
    private String map_id;
    private String sutff_id;
    private String team_id;
    private String video_link;
    private int coords_x;
    private int coords_y;
    private String click_type;
    private String position;
    private boolean jump;
    private String movement;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}