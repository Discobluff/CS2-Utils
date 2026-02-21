package com.cs2utils.service;

import com.cs2utils.entity.Stuff;
import com.cs2utils.repository.StuffRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StuffService {

    private final StuffRepo stuffRepo;

    public List<Stuff> getAllStuffs(){
        return stuffRepo.findAll();
    }

    public Stuff getStuffById(String id){
        Optional<Stuff> optionalStuff = stuffRepo.findById(id);
        if(optionalStuff.isPresent()){
            return optionalStuff.get();
        }
        log.info("Stuff with id: {} doesn't exist", id);
        return null;
    }

    public Stuff saveStuff (Stuff stuff){
        stuff.setCreatedAt(LocalDateTime.now());
        stuff.setUpdatedAt(LocalDateTime.now());
        Stuff savedStuff = stuffRepo.save(stuff);

        log.info("Stuff with id: {} saved successfully", stuff.getId());
        return savedStuff;
    }

    public Stuff updateStuff (Stuff stuff) {
        Optional<Stuff> existingStuff = stuffRepo.findById(stuff.getId());
        stuff.setCreatedAt(existingStuff.get().getCreatedAt());
        stuff.setUpdatedAt(LocalDateTime.now());

        Stuff updatedStuff = stuffRepo.save(stuff);

        log.info("Stuff with id: {} updated successfully", stuff.getId());
        return updatedStuff;
    }

    public void deleteStuffById (String id) {
        stuffRepo.deleteById(id);
    }

}