package com.example.FPL.Scraper;

import com.example.FPL.Model.Team;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ScraperHelper {

    List<String> readMatchLinksFromFile(String fileName) {
        List<String> matchList = new ArrayList<>();

        try {
            InputStream inputStream = getClass().getResourceAsStream(fileName);
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            while ((line = reader.readLine()) != null) {
                matchList.add(line);
            }

            reader.close();
        } catch (IOException e) {
            // Handle IOException (e.g., file not found)
            e.printStackTrace();
        }

        return matchList;
    }

    public static String getExtractedValue(String input, int groupIndex) {
        String regexPattern = "^(.+)/(.+)$";

        Pattern pattern = Pattern.compile(regexPattern);
        Matcher matcher = pattern.matcher(input);

        if (matcher.matches()) {
            return matcher.group(groupIndex);
        } else {
            System.out.println("Regex did not match.");
            return null;
        }
    }


    static String getExtractedPlayerName(String uniquePlayerWithTeamName) {
        return getExtractedValue(uniquePlayerWithTeamName, 1);
    }

    static Team getExtractedTeamName(String uniquePlayerWithTeamName) {
        return Team.fromAbbreviation(getExtractedValue(uniquePlayerWithTeamName, 2));
    }


}
