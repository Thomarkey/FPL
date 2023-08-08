package com.example.FPL;

import com.example.FPL.Loader.ExcelDataLoader;
import com.example.FPL.Model.Player;
import com.example.FPL.Service.PlayerService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.List;

@SpringBootApplication
public class FplApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(FplApplication.class, args);
		PlayerService playerService = context.getBean(PlayerService.class);

		// Load players from Excel file
		List<Player> players = ExcelDataLoader.loadPlayers("FPL/src/main/resources/spelers_JPL_2024.xlsx");

		// Save players to the database
		playerService.savePlayers(players);

		context.close();
	}

}
