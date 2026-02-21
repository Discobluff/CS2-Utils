package com.cs2utils.controller;

import com.cs2utils.entity.Team;
import com.cs2utils.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/teams")
@RequiredArgsConstructor
@Validated
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams(){
        return ResponseEntity.ok().body(teamService.getAllTeams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable String id)
    {
        return ResponseEntity.ok().body(teamService.getTeamById(id));
    }

    @PostMapping
    public ResponseEntity<Team> saveTeam(@RequestBody Team team)
    {
        return ResponseEntity.ok().body(teamService.saveTeam(team));
    }

    @PutMapping
    public ResponseEntity<Team> updateTeam(@RequestBody Team team)
    {
        return ResponseEntity.ok().body(teamService.updateTeam(team));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeamById(@PathVariable String id)
    {
        teamService.deleteTeamById(id);
        return ResponseEntity.ok().body("Deleted team successfully");
    }
}