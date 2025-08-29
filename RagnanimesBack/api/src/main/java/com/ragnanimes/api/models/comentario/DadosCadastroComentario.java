package com.ragnanimes.api.models.comentario;

import com.ragnanimes.api.models.anime.Anime;

public record DadosCadastroComentario(
    Integer id,
    String autor,
    Anime anime,
    String conteudo,
    String creiadoEm,
    boolean ativo
) {
    
}
