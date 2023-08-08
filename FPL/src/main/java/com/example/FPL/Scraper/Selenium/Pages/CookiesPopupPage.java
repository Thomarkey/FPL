package com.example.FPL.Scraper.Selenium.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class CookiesPopupPage extends GenericAbstractPage{

    @FindBy(css = "body aside")
    WebElement body;

    public MatchPage rejectCookies(){
        waitShortForElementVisibility(body.getShadowRoot().findElement(By.cssSelector(".ct-button")));
        body.getShadowRoot().findElement(By.cssSelector(".ct-button")).click();
        return new MatchPage();
    }
}
