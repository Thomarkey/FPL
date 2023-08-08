package com.example.FPL.Scraper.Selenium.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


import java.util.HashMap;
import java.util.Map;

public class PlayerMatchStatsPage extends GenericAbstractPage {


    public Map<String, Map<String, Integer>> readPlayerStats(Integer counter) {
        Map<String, Map<String, Integer>> statList = new HashMap<>();
        waitShortForElementVisibility(webDriver.findElement((By.cssSelector("#rcDialogTitle" + counter))));
        String playerName = webDriver.findElement((By.cssSelector("#rcDialogTitle" + counter))).getText();

        Map<String, Integer> playerStatsMap = new HashMap<>();

        String currentModalSelector = "[aria-labelledby='rcDialogTitle" + counter + "'] ";

        for (WebElement stat : webDriver.findElements(By.cssSelector(currentModalSelector + "tbody tr"))) {
            String statName = stat.findElement((By.cssSelector("td:nth-child(1)"))).getText();
            int statValue = Integer.parseInt(stat.findElement((By.cssSelector("td:nth-child(3)"))).getText());
            playerStatsMap.put(statName, statValue);
        }

        statList.put(playerName, playerStatsMap);

        webDriver.findElement(By.cssSelector(currentModalSelector + "button[aria-label='Close']")).click();

        return statList;
    }

}
