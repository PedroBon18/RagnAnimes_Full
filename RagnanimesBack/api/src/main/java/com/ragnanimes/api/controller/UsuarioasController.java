package com.ragnanimes.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ragnanimes.api.models.usuario.DadosCadastroUsuario;
import com.ragnanimes.api.models.usuario.Usuario;
import com.ragnanimes.api.models.usuario.UsuarioRepository;


@RestController
@RequestMapping("/cadastro")
public class UsuarioasController {
    @Autowired
    private UsuarioRepository repository;
    @PostMapping
    @Transactional
    public void cadastroUsuario (@RequestBody DadosCadastroUsuario dados){
        repository.save(new Usuario(dados));
    }
}
