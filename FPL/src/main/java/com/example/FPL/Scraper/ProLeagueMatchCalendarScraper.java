package com.example.FPL.Scraper;

import com.example.FPL.Scraper.Selenium.Driver.WebDriverProvider;
import com.example.FPL.Scraper.Selenium.Pages.Calendar.CalendarPage;
import com.example.FPL.Scraper.Selenium.Pages.Calendar.CookiesPopupPage;

import java.io.IOException;

public class ProLeagueMatchCalendarScraper {


    public static void main(String[] args) throws IOException {
        WebDriverProvider.setUpDriver(false);
        WebDriverProvider.goToURL("https://www.voetbalkrant.com/belgie/jupiler-pro-league/kalender");
        new CookiesPopupPage().clickAcceptCookies();
        //TODO switch path to resources folder?
        new CalendarPage().scrapeAndWriteToCSV("fixtures.csv");
        WebDriverProvider.getDriver().quit();
    }

}
