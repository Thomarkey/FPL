package com.example.FPL.Scraper.Selenium.Pages.Calendar;

import com.example.FPL.Scraper.Selenium.Pages.GenericAbstractPage;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class CookiesPopupPage extends GenericAbstractPage {

    @FindBy(id = "qc-cmp2-ui")
    WebElement popupBody;

    @FindBy(css = "button[mode='primary']")
    WebElement acceptBtn;

    public void clickAcceptCookies(){
        waitShortForElementVisibility(popupBody);
        acceptBtn.click();
    }
}
