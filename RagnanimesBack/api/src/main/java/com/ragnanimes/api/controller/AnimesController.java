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
import java.util.stream.Collectors;

import com.ragnanimes.api.models.anime.Anime;
import com.ragnanimes.api.models.anime.AnimeRepository;
import com.ragnanimes.api.models.anime.DadosCadastroAnime;
// import com.ragnanimes.api.models.likes.LikesRepository;
// import com.ragnanimes.api.models.anime.AnimeComLikesDTO;

@RestController
@RequestMapping("/anime")
public class AnimesController {
    @Autowired
    private AnimeRepository repository;

    // @Autowired
    // private LikesRepository likesRepository;

    @PostMapping
    @Transactional
    public void cadastraAnime(@RequestBody DadosCadastroAnime dados){
        repository.save(new Anime(dados));
    }
    @GetMapping
    public List<Anime> getAllAnimes() {
        return repository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Anime> getAnimeById(@PathVariable Integer id) {
        Optional<Anime> animeOpt = repository.findById(id);

        if (animeOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Retorna apenas o objeto Anime
        return ResponseEntity.ok(animeOpt.get());
    }
    @PostMapping("/update/{id}")
    @Transactional
    public ResponseEntity<Anime> updateAnime(@PathVariable Integer id, @RequestBody com.ragnanimes.api.models.anime.DadosAtualizadoAnime dados) {
        Optional<Anime> animeOpt = repository.findById(id);
        if (animeOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Anime anime = animeOpt.get();
        anime.atualizaInfo(dados);
        repository.save(anime);
        return ResponseEntity.ok(anime);
    }
    @PostMapping("/ativo/{id}")
    @Transactional
    public ResponseEntity<Anime> toggleAtivo(@PathVariable Integer id) {
        Optional<Anime> animeOpt = repository.findById(id);
        if (animeOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Anime anime = animeOpt.get();
        anime.setAtivo(!anime.isAtivo()); // inverte o valor atual
        repository.save(anime);

        return ResponseEntity.ok(anime);
    }
    // Retorna id, nome e imagem
    @GetMapping("/lista-com-imagem")
    public List<Map<String, Object>> listarIdNomeImagem() {
        
        return repository.findAll().stream()
            .map(anime -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", anime.getId());
                map.put("nome", anime.getNome());
                map.put("imagem", anime.getImagem());
                map.put("genero", anime.getGenero());
                return map;
            })
            .collect(Collectors.toList());
    }
    @GetMapping("/lista-basica")
    public List<Map<String, Object>> listarIdENome() {
        return repository.findAll().stream()
            .map(anime -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", anime.getId());
                map.put("nome", anime.getNome());
                return map;
            })
            .collect(Collectors.toList());
    }
}
