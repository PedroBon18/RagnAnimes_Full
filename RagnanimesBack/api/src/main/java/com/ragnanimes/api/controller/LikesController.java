package com.ragnanimes.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/toggle/anime/{animeId}")
    @Transactional
    public ResponseEntity<List<Likes>> toggleLinksPorAnime(@PathVariable Integer animeId) {
        List<Likes> links = repository.findByAnimeId(animeId);
        if (links.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Alterna o estado de todos os links encontrados
        links.forEach(link -> link.setAtivo(false)); // <-- se quiser forçar tudo para false
        // ou, se quiser inverter o estado de todos, use:
        // links.forEach(link -> link.setAtivo(!link.isAtivo()));

        repository.saveAll(links);
        return ResponseEntity.ok(links); // retorna os links atualizados
    }


}
