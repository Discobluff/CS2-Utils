package com.cs2utils.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.cs2utils.entity.Lineup;

public interface LineupRepo extends JpaRepository<Lineup, Integer>, JpaSpecificationExecutor<Lineup> {
}