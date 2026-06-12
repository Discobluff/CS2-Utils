package com.cs2utils.service;

import com.cs2utils.entity.Team;
import com.cs2utils.repository.TeamRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamService {

    private final TeamRepo teamRepo;

    public List<Team> getAllTeams(){
        return teamRepo.findAll();
    }

}