package com.cs2utils.service;

import com.cs2utils.entity.Stuff;
import com.cs2utils.repository.StuffRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StuffService {

    private final StuffRepo stuffRepo;

    public List<Stuff> getAllStuffs(){
        return stuffRepo.findAll();
    }
}