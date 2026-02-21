package com.cs2utils.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs2utils.entity.Stuff;

public interface StuffRepo extends JpaRepository<Stuff, String> {
}