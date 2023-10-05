package com.example.FPL.Scraper.Selenium.Pages.Calendar;

import com.example.FPL.Scraper.ScraperHelper;
import com.example.FPL.Scraper.Selenium.Pages.GenericAbstractPage;
import com.opencsv.CSVWriter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.io.FileWriter;
import java.io.IOException;

import java.util.List;

public class CalendarPage extends GenericAbstractPage {


    @FindBy(css = ".table.table-sm")
    WebElement calendarTable;

    public void scrapeAndWriteToCSV(String csvFilePath) {
        try (CSVWriter writer = new CSVWriter(new FileWriter(csvFilePath))) {
            List<WebElement> rounds = calendarTable.findElements(By.cssSelector("tbody"));
            List<WebElement> theads = calendarTable.findElements(By.cssSelector("thead"));
            int counter = 0;

            for (WebElement tableRound : rounds) {
                List<WebElement> matches = tableRound.findElements(By.cssSelector("tr"));
                //added counter for reading what round we are in the current header because of inconsistent counting
                int round = ScraperHelper.parseRoundNumberFromString(theads.get(counter).findElement(By.cssSelector("a")).getText());

                for (WebElement match : matches) {
                    String homeTeam = match.findElement(By.cssSelector("td.text-right")).getText();
                    String awayTeam = match.findElement(By.cssSelector("td.text-left")).getText();

                    String[] fixture = {round + "," + homeTeam + "," + awayTeam};
                    writer.writeNext(fixture);
                }
                counter++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

