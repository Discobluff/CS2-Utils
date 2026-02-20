package com.cs2utils.controller;

import com.cs2utils.entity.Map;
import com.cs2utils.service.MapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/maps/v1")
@RequiredArgsConstructor
@Validated
public class MapController {

    private final MapService mapService;

    @GetMapping
    public ResponseEntity<List<Map>> getAllMaps(){
        return ResponseEntity.ok().body(mapService.getAllMaps());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map> getMapById(@PathVariable Integer id)
    {
        return ResponseEntity.ok().body(mapService.getMapById(id));
    }

    @PostMapping
    public ResponseEntity<Map> saveMap(@RequestBody Map map)
    {
        return ResponseEntity.ok().body(mapService.saveMap(map));
    }

    @PutMapping
    public ResponseEntity<Map> updateMap(@RequestBody Map map)
    {
        return ResponseEntity.ok().body(mapService.updateMap(map));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMapById(@PathVariable Integer id)
    {
        mapService.deleteMapById(id);
        return ResponseEntity.ok().body("Deleted map successfully");
    }
}