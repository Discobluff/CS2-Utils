package com.cs2utils.service;

import com.cs2utils.dto.request.MapRequest;
import com.cs2utils.entity.Map;
import com.cs2utils.repository.MapRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MapService {

    private final MapRepo mapRepo;

    public List<Map> getAllMaps(){
        return mapRepo.findAll();
    }

    public Map getMapById(String id){
        Optional<Map> optionalMap = mapRepo.findById(id);
        if(optionalMap.isPresent()){
            return optionalMap.get();
        }
        log.info("Map with id: {} doesn't exist", id);
        return null;
    }

    public Map saveMap (MapRequest mapRequest){
        Map map = new Map();
        String id = mapRequest.getName().toLowerCase().replaceAll("\\s+", "_");
        map.setId(id);
        map.setName(mapRequest.getName());
        map.setAssetName(mapRequest.getAsset_name());
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        Map savedMap = mapRepo.save(map);

        MultipartFile asset = mapRequest.getAsset();
        if (asset != null && !asset.isEmpty()) {
            try {
                Path assetsDir = Paths.get("src/main/assets/maps");
                Files.createDirectories(assetsDir);
                Path assetFile = assetsDir.resolve(map.getAssetName() + ".png");
                Files.write(assetFile, asset.getBytes());
                log.info("Asset saved to {}", assetFile.toAbsolutePath());
            } catch (IOException e) {
                log.error("Failed to save asset for map {}: {}", map.getId(), e.getMessage());
            }
        }

        log.info("Map with id: {} saved successfully", map.getId());
        return savedMap;
    }

    public Map updateMap (Map map) {
        Optional<Map> existingMap = mapRepo.findById(map.getId());
        map.setCreatedAt(existingMap.get().getCreatedAt());
        map.setUpdatedAt(LocalDateTime.now());

        Map updatedMap = mapRepo.save(map);

        log.info("Map with id: {} updated successfully", map.getId());
        return updatedMap;
    }

    public void deleteMapById (String id) {
        mapRepo.deleteById(id);
    }

}