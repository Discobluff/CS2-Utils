package com.cs2utils.service;

import com.cs2utils.entity.Team;
import com.cs2utils.repository.TeamRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamService {

    private final TeamRepo teamRepo;

    public List<Team> getAllTeams(){
        return teamRepo.findAll();
    }

    public Team getTeamById(String id){
        Optional<Team> optionalTeam = teamRepo.findById(id);
        if(optionalTeam.isPresent()){
            return optionalTeam.get();
        }
        log.info("Team with id: {} doesn't exist", id);
        return null;
    }

    public Team saveTeam (Team team){
        team.setCreatedAt(LocalDateTime.now());
        team.setUpdatedAt(LocalDateTime.now());
        Team savedTeam = teamRepo.save(team);

        log.info("Team with id: {} saved successfully", team.getId());
        return savedTeam;
    }

    public Team updateTeam (Team team) {
        Optional<Team> existingTeam = teamRepo.findById(team.getId());
        team.setCreatedAt(existingTeam.get().getCreatedAt());
        team.setUpdatedAt(LocalDateTime.now());

        Team updatedTeam = teamRepo.save(team);

        log.info("Team with id: {} updated successfully", team.getId());
        return updatedTeam;
    }

    public void deleteTeamById (String id) {
        teamRepo.deleteById(id);
    }

}