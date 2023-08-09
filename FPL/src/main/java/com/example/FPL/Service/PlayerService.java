package com.example.FPL.Service;

import com.example.FPL.Model.Player;
import com.example.FPL.Model.Team;
import com.example.FPL.Repository.PlayerRepository;
import org.hibernate.NonUniqueResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    // Define a final PlayerRepository field to hold the repository instance
    private final PlayerRepository playerRepository;

    // Constructor-based dependency injection using @Autowired
    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        // Inject the PlayerRepository instance into the service
        this.playerRepository = playerRepository;
    }

    // This method allows you to save a Player entity to the database
    public void savePlayer(Player player) {
        // Call the save method provided by the repository to save the player entity
        try {
            playerRepository.save(player);
        } catch (Exception e) {
            e.printStackTrace(); // Print the exception details
        }

    }

    public void savePlayers(List<Player> players) {
        for (Player player : players) {
            savePlayer(player);
        }
    }

    public Player getPlayerByNameAndTeam(String playerName, Team teamName) {
        try {
            return getPlayerByName(playerName);
        } catch (NonUniqueResultException | IncorrectResultSizeDataAccessException e) {
            return playerRepository.findByNameAndTeam(playerName, teamName);
        }
    }

    public Player getPlayerByName(String playerName) {
        return playerRepository.findByName(playerName);
    }

}
