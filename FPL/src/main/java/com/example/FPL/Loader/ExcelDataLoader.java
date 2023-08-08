package com.example.FPL.Loader;

import org.apache.poi.ss.usermodel.*;
import com.example.FPL.Model.Player;
import com.example.FPL.Model.Position;
import com.example.FPL.Model.Team;
import com.example.FPL.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Component
public class ExcelDataLoader {

    private final PlayerService playerService;

    @Autowired
    public ExcelDataLoader(PlayerService playerService) {
        this.playerService = playerService;
    }

    public static List<Player> loadPlayers(String filePath) {
        List<Player> players = new ArrayList<>();

        try (InputStream inputStream = new FileInputStream(filePath)) {

            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
                Row row = sheet.getRow(rowIndex);

                String teamName = row.getCell(0).getStringCellValue();
                Position position = Position.valueOf(row.getCell(1).getStringCellValue().toUpperCase());
                String name = row.getCell(2).getStringCellValue();

                Team team;
                if (teamName.equals("Standard de Liège")) {
                    team = Team.STANDARD_DE_LIEGE;
                } else {
                    team = Team.valueOf(teamName.replace(" ", "_").replace("-","_").toUpperCase());
                }
                Player player = new Player(name, team, position);

                players.add(player);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return players;
    }


}
