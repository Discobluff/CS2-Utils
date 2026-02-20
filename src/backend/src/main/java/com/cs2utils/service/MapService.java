package com.cs2utils.service;

import com.cs2utils.entity.Map;
import com.cs2utils.repository.MapRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    public Map getMapById(Integer id){
        Optional<Map> optionalMap = mapRepo.findById(id);
        if(optionalMap.isPresent()){
            return optionalMap.get();
        }
        log.info("Map with id: {} doesn't exist", id);
        return null;
    }

    public Map saveMap (Map map){
        map.setCreatedAt(LocalDateTime.now());
        map.setUpdatedAt(LocalDateTime.now());
        Map savedMap = mapRepo.save(map);

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

    public void deleteMapById (Integer id) {
        mapRepo.deleteById(id);
    }

}