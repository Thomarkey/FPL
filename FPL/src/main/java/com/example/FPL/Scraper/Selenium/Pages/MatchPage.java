package com.example.FPL.Scraper.Selenium.Pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MatchPage extends GenericAbstractPage {

    @FindBy(css = ".teamPlayer")
    List<WebElement> startingPlayers;

    @FindBy(css = ".substitutes-player")
    List<WebElement> substitutePlayers;


    public Map<String, Map<String, String>> scrapeStats() throws InterruptedException {
        //TODO REWORK TO REMOVE SLEEP
        Thread.sleep(1000);
        Map<String, Map<String, String>> playerStatsHashMap = new HashMap<>();
        for (int i = 0; i < startingPlayers.size(); i++) {
            WebElement player = startingPlayers.get(i);
            player.click();
            Map<String, Map<String, String>> playerStats = new PlayerMatchStatsPage().readPlayerStats(true, i);
            playerStatsHashMap.putAll(playerStats);
        }

        for (int i = 0, counter = startingPlayers.size(); i < substitutePlayers.size(); i++) {
            WebElement player = substitutePlayers.get(i);
            player.click();
            Map<String, Map<String, String>> playerStats = new PlayerMatchStatsPage().readPlayerStats(false, counter + i);
            playerStatsHashMap.putAll(playerStats);
        }

        return playerStatsHashMap;
    }

}
