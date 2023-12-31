package com.example.FPL.Model;

import jakarta.persistence.*;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Primary key

    private String name;
    @Enumerated(EnumType.STRING)
    private Team team;
    @Enumerated(EnumType.STRING)
    private Position position;

    private Integer totalPoints;

    @ElementCollection(fetch = FetchType.EAGER) //fetch the stats collection eagerly instead of lazily to handle LazyInitializationException.
    @CollectionTable(name = "player_stats", joinColumns = @JoinColumn(name = "player_id"))
    @MapKeyEnumerated(EnumType.STRING)
    private Map<StatName, Integer> stats;

    public Player() {
        // Default constructor
        //When using JPA (Java Persistence API), it's required to have a default constructor for your entity classes.
    }

    public Player(String name, Team team, Position position) {
        this.name = name;
        this.team = team;
        this.position = position;
        this.totalPoints = 0;
        this.stats = initStats();
    }


    public Player(String name, Integer totalPoints, Team team, Position position) {
        this.name = name;
        this.totalPoints = totalPoints;
        this.team = team;
        this.position = position;
        this.stats = initStats();
    }

    private Map<StatName, Integer> initStats() {
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

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
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

    public Map<StatName, Integer> getStats() {
        return stats;
    }

    public void setPlayerStats(Map<StatName, Integer> stats) {
        this.stats = stats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
