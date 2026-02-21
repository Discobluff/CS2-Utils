package com.cs2utils.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs2utils.entity.Team;

public interface TeamRepo extends JpaRepository<Team, String> {
}