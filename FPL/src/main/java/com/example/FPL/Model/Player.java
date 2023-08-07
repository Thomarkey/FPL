package com.example.FPL.Model;

import java.util.HashMap;

public class Player {

    private String name;
    private Team team;
    private Position position;
    private HashMap<StatName, Integer> stats;

    public Player(String name, Team team, Position position) {
        this.name = name;
        this.team = team;
        this.position = position;
        this.stats = initStats();
    }

    private HashMap<StatName, Integer> initStats() {
        // Initialize stats with their names and initial values

        HashMap<StatName, Integer> initializedStats = new HashMap<>();
        for (StatName stat : StatName.values()) {
            initializedStats.put(stat, 0);
        }

        return initializedStats;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public HashMap<StatName, Integer> getStats() {
        return stats;
    }

    public void setPlayerStats(HashMap<StatName, Integer> stats) {
        this.stats = stats;
    }
}
