package com.ragnanimes.api.models.likes;

import com.ragnanimes.api.models.anime.Anime;


import jakarta.persistence.*;
import lombok.*;

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
    private boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "anime_id")
    private Anime anime;

    public Likes(DadosCadastroLikes dados){
        this.nome = dados.nome();
        this.imagem = dados.imagem();
        this.conteudo = dados.conteudo();
        this.link = dados.link();
        this.anime = dados.anime();
    }
    public void atualizaInfo(DadosAtualizadoLikes dados){
        if (dados.nome() != null){
            this.nome = dados.nome();
        }
        if (dados.imagem() != null){
            this.imagem = dados.imagem();
        }
        if (dados.conteudo() != null){
            this.conteudo = dados.conteudo();
        }
        if (dados.link() != null){
            this.link = dados.link();
        }
        if (dados.anime() != null){
            this.anime = dados.anime();  
        }
        if (dados.ativo() != true){
            this.ativo = dados.ativo();
        }
    }
}
