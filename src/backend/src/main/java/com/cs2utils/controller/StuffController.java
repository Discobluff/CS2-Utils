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

    @GetMapping("/{id}")
    public ResponseEntity<Stuff> getStuffById(@PathVariable String id)
    {
        return ResponseEntity.ok().body(stuffService.getStuffById(id));
    }

    @PostMapping
    public ResponseEntity<Stuff> saveStuff(@RequestBody Stuff stuff)
    {
        return ResponseEntity.ok().body(stuffService.saveStuff(stuff));
    }

    @PutMapping
    public ResponseEntity<Stuff> updateStuff(@RequestBody Stuff stuff)
    {
        return ResponseEntity.ok().body(stuffService.updateStuff(stuff));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStuffById(@PathVariable String id)
    {
        stuffService.deleteStuffById(id);
        return ResponseEntity.ok().body("Deleted stuff successfully");
    }
}