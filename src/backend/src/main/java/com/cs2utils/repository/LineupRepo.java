package com.cs2utils.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs2utils.entity.Lineup;

public interface LineupRepo extends JpaRepository<Lineup, Integer> {
}