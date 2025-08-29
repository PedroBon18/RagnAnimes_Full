package com.ragnanimes.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.ragnanimes.api.models.anime.Anime;
import com.ragnanimes.api.models.anime.AnimeRepository;
import com.ragnanimes.api.models.anime.DadosCadastroAnime;

@RestController
@RequestMapping("/anime")
public class AnimesController {
    @Autowired
    private AnimeRepository repository;

    @PostMapping
    @Transactional
    public void cadastraAnime(@RequestBody DadosCadastroAnime dados){
        repository.save(new Anime(dados));
    }
    @GetMapping
    public List<Anime> getAllAnimes() {
        return repository.findAll();
    }
}
