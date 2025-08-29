package com.ragnanimes.api.models.comentario;

import com.ragnanimes.api.models.anime.Anime;
import com.ragnanimes.api.models.usuario.Usuario;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String autor;
    private String conteudo;
    private String creiadoEm;
    private boolean ativo = true;
    
    @ManyToOne
    @JoinColumn(name = "anime_id")
    private Anime anime;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Comentario(DadosCadastroComentario dados){
        this.autor = dados.autor();
        this.anime = dados.anime();
        this.conteudo = dados.conteudo();
        this.creiadoEm = dados.creiadoEm();
    }
}
