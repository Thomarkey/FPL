package com.example.FPL.Scraper;

import com.example.FPL.Model.Player;
import com.example.FPL.Model.StatName;
import com.example.FPL.Model.Team;
import com.example.FPL.Scraper.Selenium.Driver.WebDriverProvider;
import com.example.FPL.Scraper.Selenium.Pages.CookiesPopupPage;
import com.example.FPL.Scraper.Selenium.Pages.MatchPage;
import com.example.FPL.Service.PlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import static com.example.FPL.Scraper.ScraperHelper.*;


@Component
public class FPLWebScraper {

    private final PlayerService playerService;

    @Autowired
    public FPLWebScraper(PlayerService playerService) {
        this.playerService = playerService;
    }

    public void setUpWebDriver(boolean isHeadless) {
        //TODO: when headless set locale to BE-NL
        WebDriverProvider.setUpDriver(isHeadless);
    }

    public void quitDriver() {
        WebDriverProvider.quitDriver();
    }

    public void scrapeAndUpdateStats() throws InterruptedException {
        WebDriverProvider.goToURL("https://fantasy.proleague.be");
        new CookiesPopupPage().rejectCookies();

        List<String> matchList = new ScraperHelper().readMatchLinksFromFile("/spelers_JPL_2024_updated");

        Map<String, Map<String, String>> playerStatsMap = new HashMap<>();

        for (String match : matchList) {
            WebDriverProvider.goToURL(match);
            Map<String, Map<String, String>> updatedStatsMap = new MatchPage().scrapeStats();
            mergeStats(playerStatsMap, updatedStatsMap);
        }

        updateDataBaseWithData(playerStatsMap);
    }

    private void mergeStats(Map<String, Map<String, String>> targetMap, Map<String, Map<String, String>> sourceMap) {
        for (Map.Entry<String, Map<String, String>> entry : sourceMap.entrySet()) {
            String uniquePlayerWithTeamName = entry.getKey();
            Map<String, String> sourceStats = entry.getValue();

            Map<String, String> targetStats = targetMap.computeIfAbsent(uniquePlayerWithTeamName, k -> new HashMap<>());

            for (Map.Entry<String, String> statEntry : sourceStats.entrySet()) {
                String statKey = statEntry.getKey();
                String newStatValue = statEntry.getValue();
                String existingStatValue = targetStats.get(statKey);

                int sum = (existingStatValue != null && !existingStatValue.isEmpty()) ? Integer.parseInt(existingStatValue) : 0;
                sum += Integer.parseInt(newStatValue);
                targetStats.put(statKey, String.valueOf(sum));
            }
        }
    }

    public void updateDataBaseWithData(Map<String, Map<String, String>> scrapedData) {
        for (Map.Entry<String, Map<String, String>> entry : scrapedData.entrySet()) {
            String uniquePlayerWithTeamName = entry.getKey();
            Map<String, String> statMap = entry.getValue();

            String playerName = getExtractedPlayerName(uniquePlayerWithTeamName);
            Team teamName = getExtractedTeamName(uniquePlayerWithTeamName);

            // Fetch the player by playerName and TEAM.Name (team because some players have same name)
            Player player = playerService.getPlayerByNameAndTeam(playerName, teamName);


            if (player != null) {
                for (Map.Entry<String, String> statEntry : statMap.entrySet()) {
                    String statName = statEntry.getKey();
                    int statValue = Integer.parseInt(statEntry.getValue());

                    // Check if the stat name exists in your StatName enum
                    try {
                        StatName enumStatName = StatName.findByNameOrAlt(statName.toUpperCase().replace(" ", "_"));
                        player.getStats().put(enumStatName, player.getStats().get(enumStatName) + statValue);
                    } catch (IllegalArgumentException e) {
                        System.out.println(statName + " not found in stats!!");
                        // Handle if the stat name is not found in the enum
                    }
                }

                playerService.savePlayer(player);
            } else {
                System.out.println(playerName + "with club " + teamName + " not found in players!!");
                // Handle if the player is not found in the database
            }
        }

    }
}
