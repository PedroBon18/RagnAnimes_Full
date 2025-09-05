document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const usur = document.getElementById("nome").value;        // nome do usuário
    const senha = document.getElementById("senha").value;      // senha
    const imagem = ""; // sem campo no formulário atual
    const email = document.getElementById("email").value;      // e-mail
    const role = "USER"; // pode fixar como USER ou criar um select
    const dataCriacao = new Date().toISOString(); // gerado automaticamente
  
    const usuarioData = {
      usur: usur,
      senha: senha,
      imagem: imagem,
      role: role,
      email: email,
      dataCriacao: dataCriacao
    };
  
    try {
      const response = await fetch("http://localhost:8080/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioData)
      });
  
      if (response.ok) {
        alert("Usuário registrado com sucesso!");
        document.getElementById("register-form").reset();
      } else {
        const errorText = await response.text();
        alert("Erro ao registrar: " + errorText);
      }
    } catch (error) {
      alert("Erro de conexão com a API!");
    }
  });
  