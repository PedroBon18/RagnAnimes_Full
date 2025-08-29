package com.ragnanimes.api.models.usuario;


public record DadosCadastroUsuario (
    Integer id,
    String user,
    String senha,
    String dataCriacao,
    String email,
    String imagem,
    Role role
){
    
}
