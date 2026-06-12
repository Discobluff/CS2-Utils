package com.cs2utils.controller;

import com.cs2utils.entity.Stuff;
import com.cs2utils.service.StuffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/stuffs")
@RequiredArgsConstructor
@Validated
public class StuffController {

    private final StuffService stuffService;

    @GetMapping
    public ResponseEntity<List<Stuff>> getAllStuffs(){
        return ResponseEntity.ok().body(stuffService.getAllStuffs());
    }
}