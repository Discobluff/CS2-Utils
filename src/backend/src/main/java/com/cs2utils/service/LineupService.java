package com.cs2utils.service;

import com.cs2utils.entity.Lineup;
import com.cs2utils.repository.LineupRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LineupService {

    private final LineupRepo lineupRepo;

    public List<Lineup> getAllLineups(){
        return lineupRepo.findAll();
    }

    public List<Lineup> getLineups(String map_id){//, String stuffId, String teamId) {
        Specification<Lineup> spec = (root, query, cb) -> cb.conjunction();

        if (map_id != null)   spec = spec.and((root, query, cb) -> cb.equal(root.get("map_id"), map_id));
        // if (stuffId != null) spec = spec.and((root, query, cb) -> cb.equal(root.get("stuffId"), stuffId));
        // if (teamId != null)  spec = spec.and((root, query, cb) -> cb.equal(root.get("teamId"), teamId));

        return lineupRepo.findAll(spec);
    }

    public Lineup getLineupById(Integer id){
        Optional<Lineup> optionalLineup = lineupRepo.findById(id);
        if(optionalLineup.isPresent()){
            return optionalLineup.get();
        }
        log.info("Lineup with id: {} doesn't exist", id);
        return null;
    }

    public Lineup saveLineup (Lineup lineup){
        lineup.setCreatedAt(LocalDateTime.now());
        lineup.setUpdatedAt(LocalDateTime.now());
        Lineup savedLineup = lineupRepo.save(lineup);

        log.info("Lineup with id: {} saved successfully", lineup.getId());
        return savedLineup;
    }

    public Lineup updateLineup (Lineup lineup) {
        Optional<Lineup> existingLineup = lineupRepo.findById(lineup.getId());
        lineup.setCreatedAt(existingLineup.get().getCreatedAt());
        lineup.setUpdatedAt(LocalDateTime.now());

        Lineup updatedLineup = lineupRepo.save(lineup);

        log.info("Lineup with id: {} updated successfully", lineup.getId());
        return updatedLineup;
    }

    public void deleteLineupById (Integer id) {
        lineupRepo.deleteById(id);
    }

}