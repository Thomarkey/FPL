package com.example.FPL;

import com.example.FPL.Loader.ExcelDataLoader;
import com.example.FPL.Model.Player;
import com.example.FPL.Scraper.FPLWebScraper;
import com.example.FPL.Service.PlayerService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.List;

@SpringBootApplication
public class FplApplication {
//
//	public static void main(String[] args) {
//		ConfigurableApplicationContext context = SpringApplication.run(FplApplication.class, args);
//		PlayerService playerService = context.getBean(PlayerService.class);
//
//		// Load players from Excel file
//		List<Player> players = ExcelDataLoader.loadPlayers("FPL/src/main/resources/spelers_JPL_2024.xlsx");
//
//		// Save players to the database
//		playerService.savePlayers(players);
//
//		context.close();
//	}

//    public static void main(String[] args) {
//        ConfigurableApplicationContext context = SpringApplication.run(FplApplication.class, args);
//        PlayerService playerService = context.getBean(PlayerService.class);
//
//        Player player = new Player("Markey", Team.ROYALE_UNION_SAINT_GILLOISE, Position.DEFENDER);
//        Player player2 = new Player("Markey", Team.CLUB_BRUGGE, Position.DEFENDER);
//
//        // Save players to the player
//        playerService.savePlayer(player);
//        playerService.savePlayer(player2);
//
//        Player foundPlayer = playerService.getPlayerByName("Markey");
//        Player foundPlayer2 = playerService.getPlayerByNameAndTeam("Markey", Team.CLUB_BRUGGE);
//        String name = foundPlayer.getName();
//        System.out.println("Found player: " + name);
//
//        context.close();
//    }

//		public static void main(String[] args) {
//			ConfigurableApplicationContext context = SpringApplication.run(FplApplication.class, args);
//			PlayerService playerService = context.getBean(PlayerService.class);
//
//			FPLWebScraper webScraper = new FPLWebScraper(playerService);
//			webScraper.scrapeAndUpdateStats();
//			context.close();
//		}

    public static void main(String[] args) throws InterruptedException {
        ConfigurableApplicationContext context = SpringApplication.run(FplApplication.class, args);
        PlayerService playerService = context.getBean(PlayerService.class);

        // Load players from Excel file
        List<Player> players = ExcelDataLoader.loadPlayers("FPL/src/main/resources/spelers_JPL_2024.xlsx");

        // Save players to the db
        playerService.savePlayers(players);

        // Scrape players data from FPL website
        FPLWebScraper webScraper = new FPLWebScraper(playerService);
        //setup selenium webDriver
        webScraper.setUpWebDriver(false);
        // Update players' stats in db
        webScraper.scrapeAndUpdateStats();
        // Shut down selenium webDriver
        webScraper.quitDriver();

//        context.close();
    }

}
