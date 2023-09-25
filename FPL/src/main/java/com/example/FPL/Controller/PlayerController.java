package com.example.FPL.Controller;

import com.example.FPL.Model.Player;
import com.example.FPL.Repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200"})
public class PlayerController {
    @Autowired
    private final PlayerRepository playerRepository;

    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

//    @RequestMapping(method = RequestMethod.GET, path = "players")
    @GetMapping("/players")
    public List<Player> getAllPlayers() {
        System.out.println("getAllPlayers(): " + LocalDateTime.now());
        return playerRepository.findAll();
    }

    // @GetMapping("/helloWorld")
    // public String helloWorld(){
    //     System.out.println("helloWorld(): " + LocalDateTime.now());
    //     return "hello World!";
    // }
}
