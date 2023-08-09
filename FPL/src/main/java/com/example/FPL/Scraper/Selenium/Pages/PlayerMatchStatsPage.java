package com.example.FPL.Scraper.Selenium.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


import java.util.HashMap;
import java.util.Map;

public class PlayerMatchStatsPage extends GenericAbstractPage {


    public Map<String, Map<String, String>> readPlayerStats(Integer counter) {
        Map<String, Map<String, String>> statList = new HashMap<>();
        waitShortForElementVisibility(webDriver.findElement((By.cssSelector("#rcDialogTitle" + counter))));
        String currentModalSelector = "[aria-labelledby='rcDialogTitle" + counter + "'] ";


        Map<String, String> playerStatsMap = new HashMap<>();

        //EXTRACT LASTNAME AND FORMAT TO MATCH DATABASE NAMES
        String playerName = webDriver.findElement((By.cssSelector(currentModalSelector + ".surname"))).getText();
        String teamName = webDriver.findElement((By.cssSelector(currentModalSelector + ".club"))).getText();
        playerStatsMap.put("TEAM", teamName);

        for (WebElement stat : webDriver.findElements(By.cssSelector(currentModalSelector + "tbody tr"))) {
            String statName = stat.findElement((By.cssSelector("td:nth-child(1)"))).getText();
            String statValue = stat.findElement((By.cssSelector("td:nth-child(3)"))).getText();
            playerStatsMap.put(statName, statValue);
        }
        webDriver.findElement(By.cssSelector(currentModalSelector + "button[aria-label='Close']")).click();

        statList.put(playerName, playerStatsMap);

        return statList;
    }

}
