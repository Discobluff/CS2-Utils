package com.cs2utils.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String map_id;
    private String stuff_id;
    private String team_id;
    private String video_link;
    private Integer video_start;
    private Integer video_end;
    private Float coords_x_start;
    private Float coords_y_start;
    private Float coords_x_end;
    private Float coords_y_end;
    private String click_type;
    private String position;
    private Boolean jump;
    private String movement;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}