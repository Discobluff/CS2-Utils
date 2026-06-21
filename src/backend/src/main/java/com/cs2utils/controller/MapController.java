package com.cs2utils.controller;

import com.cs2utils.entity.Map;
import com.cs2utils.service.MapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cs2utils.dto.request.MapRequest;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/maps")
@RequiredArgsConstructor
@Validated
public class MapController {

    private final MapService mapService;

    @GetMapping
    public ResponseEntity<List<Map>> getAllMaps(){
        return ResponseEntity.ok().body(mapService.getAllMaps());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map> getMapById(@PathVariable String id)
    {
        return ResponseEntity.ok().body(mapService.getMapById(id));
    }

    @PostMapping
    public ResponseEntity<Map> saveMap(@ModelAttribute MapRequest mapRequest)
    {
        return ResponseEntity.ok().body(mapService.saveMap(mapRequest));
    }

    @PostMapping("/{id}/callouts")
    public ResponseEntity<String> saveCallout(@PathVariable String id, @RequestParam("file") MultipartFile file)
    {
        mapService.saveCallout(id, file);
        return ResponseEntity.ok().body("Callout saved successfully");
    }

    @PutMapping
    public ResponseEntity<Map> updateMap(@RequestBody Map map)
    {
        return ResponseEntity.ok().body(mapService.updateMap(map));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMapById(@PathVariable String id)
    {
        mapService.deleteMapById(id);
        return ResponseEntity.ok().body("Deleted map successfully");
    }
}