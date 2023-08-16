package com.example.FPL.Scraper.Selenium.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


import java.util.HashMap;
import java.util.Map;

public class PlayerMatchStatsPage extends GenericAbstractPage {


    public Map<String, Map<String, String>> readPlayerStats(boolean startingPlayer, Integer counter) {
        Map<String, Map<String, String>> statList = new HashMap<>();
        waitShortForElementVisibility(webDriver.findElement((By.cssSelector("#rcDialogTitle" + counter))));
        String currentModalSelector = "[aria-labelledby='rcDialogTitle" + counter + "'] ";

        Map<String, String> playerStatsMap = new HashMap<>();

        //EXTRACT LASTNAME AND CLUB TO CREATE UNIQUE NAME FOR SEARCH PURPOSE (DUPLICATE NAMES)
        String playerName = webDriver.findElement((By.cssSelector(currentModalSelector + ".surname"))).getText();
        String teamName = webDriver.findElement((By.cssSelector(currentModalSelector + ".club"))).getText();

        //ADD GAME STARTED STAT ONLY FOR STARTING PLAYERS
        if (startingPlayer) {
            playerStatsMap.put("GAME_STARTED", "1");
        }

        for (WebElement stat : webDriver.findElements(By.cssSelector(currentModalSelector + "tbody tr"))) {
            String statName = stat.findElement((By.cssSelector("td:nth-child(1)"))).getText();
            String statValue = stat.findElement((By.cssSelector("td:nth-child(3)"))).getText();
            playerStatsMap.put(statName, statValue);
        }
        webDriver.findElement(By.cssSelector(currentModalSelector + "button[aria-label='Close']")).click();

        //UNIQUE NAME FOR SEARCH PURPOSE (DUPLICATE NAMES)
        statList.put(playerName + "/" + teamName, playerStatsMap);

        return statList;
    }

}
