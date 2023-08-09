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

import java.util.Map;


@Component
public class FPLWebScraper {

    private final PlayerService playerService;

    @Autowired
    public FPLWebScraper(PlayerService playerService) {
        this.playerService = playerService;
    }

    public void scrapeAndUpdateStats() {
        //TODO: when headless set locale to BE-NL
        WebDriverProvider.setUpDriver(false);
        //https://fantasy.proleague.be/match/41861 FIRST MATCH
        WebDriverProvider.goToURL("https://fantasy.proleague.be/match/41861");
        new CookiesPopupPage().rejectCookies();

        Map<String, Map<String, String>> map = getUpdatedStats();

        WebDriverProvider.quitDriver();

        updateDataBaseWithData(map);

    }

    public Map<String, Map<String, String>> getUpdatedStats(){
       return new MatchPage().scrapeStats();
    }

    public void updateDataBaseWithData(Map<String, Map<String, String>> scrapedData){
            for (Map.Entry<String, Map<String, String>> entry : scrapedData.entrySet()) {
                String playerName = entry.getKey();
                Map<String, String> statMap = entry.getValue();
                Team teamName = Team.fromAbbreviation(statMap.get("TEAM"));

                // Fetch the player by playerName and TEAM.Name (team because some people have same name)
                Player player = playerService.getPlayerByNameAndTeam(playerName, teamName);

                statMap.remove("TEAM"); // Remove the "team" entry from the map (not needed anymore, rest are INTS stats values)

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
                    System.out.println(playerName + " not found in players!!");
                    // Handle if the player is not found in the database
                }
            }

}

}
