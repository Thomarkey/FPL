package com.example.FPL.Scraper.Selenium.Driver;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class WebDriverProvider {

    static org.openqa.selenium.WebDriver webDriver;

    public static void setUpDriver(boolean headless) {
        //TODO relative path
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\thoma\\Documents\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();

        if (headless) {
            options.addArguments("--headless");
        }

        webDriver = new ChromeDriver(options);
        webDriver.manage().window().setSize(new Dimension(1920, 1080));
    }

    public static org.openqa.selenium.WebDriver getDriver() {
        return webDriver;
    }

    public static void quitDriver() {
        if (webDriver != null) {
            webDriver.quit();
        }
    }

    public static void goToURL(String url) {
        webDriver.get(url);
    }

}
