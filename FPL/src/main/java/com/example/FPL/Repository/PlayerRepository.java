package com.example.FPL.Repository;

import com.example.FPL.Model.Player;
import com.example.FPL.Model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Player findByName(String playerName);

    Player findByNameAndTeam(String playerName, Team teamName);
}
