package com.ragnanimes.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.ragnanimes.api.models.likes.Likes;
import com.ragnanimes.api.models.likes.DadosCadastroLikes;
import com.ragnanimes.api.models.likes.LikesRepository;



@RestController
@RequestMapping("/link")
public class LikesController {
    @Autowired
    private LikesRepository repository;

    @PostMapping
    @Transactional
    public void cadastrarLink(@RequestBody DadosCadastroLikes dados){
        repository.save(new Likes(dados));
    }
    @GetMapping("/{id}")
    public List<Likes> getAnimeLinksById(@PathVariable Integer id){
        return repository.findByAnimeId(id);
    }
    @PostMapping("/toggle/{id}")
    @Transactional
    public void toggleAtivo(@PathVariable Integer id) {
        Optional<Likes> linkOpt = repository.findById(id);
        if (linkOpt.isPresent()) {
            Likes link = linkOpt.get();
            link.setAtivo(!link.isAtivo()); // inverte o valor atual
            repository.save(link);
        }
}
    
}
