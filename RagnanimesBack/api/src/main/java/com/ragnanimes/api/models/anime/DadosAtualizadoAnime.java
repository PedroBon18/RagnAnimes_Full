package com.ragnanimes.api.models.anime;

public record DadosAtualizadoAnime(
    Integer id,
    String nome,
    String estudio,
    String imagem,
    String sinopse,
    Genero genero,
    String anoLancamento,
    String trailer,
    boolean ativo
) {
    
}
