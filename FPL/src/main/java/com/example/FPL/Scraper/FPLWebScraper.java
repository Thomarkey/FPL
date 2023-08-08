package com.example.FPL.Scraper;

import com.example.FPL.Scraper.Selenium.Driver.WebDriverProvider;
import com.example.FPL.Scraper.Selenium.Pages.CookiesPopupPage;
import com.example.FPL.Scraper.Selenium.Pages.MatchPage;

import java.util.Map;



public class FPLWebScraper {

    public void scrapeAndUpdateStats() {
        WebDriverProvider.setUpDriver(false);
        //https://fantasy.proleague.be/match/41861 FIRST MATCH
        WebDriverProvider.goToURL("https://fantasy.proleague.be/match/41861");
        new CookiesPopupPage().rejectCookies();

        Map<String, Map<String, Integer>> map = getUpdatedStats();

        //LOGIC

        WebDriverProvider.quitDriver();

    }

    public Map<String, Map<String, Integer>> getUpdatedStats(){
       return new MatchPage().scrapeStats();
    }
}
