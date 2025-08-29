package com.ragnanimes.api.models.usuario;

import com.ragnanimes.api.models.comentario.Comentario;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String usur;
    private String senha;
    private String dataCriacao;
    private String email;
    private String imagem;
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    public Usuario(DadosCadastroUsuario dados){
        this.usur = dados.user();
        this.senha = dados.senha();
        this.email = dados.email();
        this.dataCriacao = dados.dataCriacao();
    }
}
