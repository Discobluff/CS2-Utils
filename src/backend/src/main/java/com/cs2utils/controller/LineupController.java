package com.cs2utils.controller;

import com.cs2utils.entity.Lineup;
import com.cs2utils.service.LineupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/lineups")
@RequiredArgsConstructor
@Validated
public class LineupController {

    private final LineupService lineupService;

    @GetMapping
    public ResponseEntity<List<Lineup>> getAllLineups(){
        return ResponseEntity.ok().body(lineupService.getAllLineups());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lineup> getLineupById(@PathVariable Integer id)
    {
        return ResponseEntity.ok().body(lineupService.getLineupById(id));
    }

    @PostMapping
    public ResponseEntity<Lineup> saveLineup(@RequestBody Lineup lineup)
    {
        return ResponseEntity.ok().body(lineupService.saveLineup(lineup));
    }

    @PutMapping
    public ResponseEntity<Lineup> updateLineup(@RequestBody Lineup lineup)
    {
        return ResponseEntity.ok().body(lineupService.updateLineup(lineup));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLineupById(@PathVariable Integer id)
    {
        lineupService.deleteLineupById(id);
        return ResponseEntity.ok().body("Deleted lineup successfully");
    }
}