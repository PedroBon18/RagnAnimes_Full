package com.ragnanimes.api.models.likes;

import com.ragnanimes.api.models.anime.Anime;


import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String imagem;
    private String conteudo;
    private String link;

    @ManyToOne
    @JoinColumn(name = "anime_id")
    private Anime anime;

    public Likes(DadosCadastroLikes dados){
        this.nome = dados.nome();
        this.imagem = dados.imagem();
        this.conteudo = dados.conteudo();
        this.link = dados.link();
    }
}
