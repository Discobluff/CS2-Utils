package com.cs2utils.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs2utils.entity.Map;

public interface MapRepo extends JpaRepository<Map, Integer> {
}