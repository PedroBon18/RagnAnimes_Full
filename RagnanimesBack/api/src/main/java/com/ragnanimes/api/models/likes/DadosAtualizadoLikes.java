package com.ragnanimes.api.models.likes;

import com.ragnanimes.api.models.anime.Anime;

public record DadosAtualizadoLikes(
    Integer id,
    String nome,
    String imagem,
    String conteudo,
    String link,
    Anime anime,
    boolean ativo
) {
}