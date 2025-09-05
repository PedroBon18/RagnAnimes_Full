document.getElementById("anime-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const estudio = document.getElementById("estudio").value;
  const imagem = document.getElementById("imagem").value;
  const trailer = document.getElementById("trailer").value;
  const descricao = document.getElementById("descricao").value;
  const categoria = document.getElementById("categoria").value;
  const anoLancamento = document.getElementById("anoLancamento").value;

  const animeData = {
    nome: nome,
    estudio: estudio,
    imagem: imagem,
    genero: categoria,   // Enum Genero do backend
    sinopse: descricao,
    anoLancamento: anoLancamento,
    trailer: trailer
  };

  try {
    const response = await fetch("http://localhost:8080/anime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animeData)
    });

    if (response.ok) {
      document.getElementById("mensagem").textContent = "Anime registrado com sucesso!";
      document.getElementById("mensagem").style.color = "green";
      document.getElementById("anime-form").reset();
    } else {
      const errorText = await response.text();
      document.getElementById("mensagem").textContent = "Erro ao registrar: " + errorText;
      document.getElementById("mensagem").style.color = "red";
    }
  } catch (error) {
    document.getElementById("mensagem").textContent = "Erro de conexão com a API!";
    document.getElementById("mensagem").style.color = "red";
  }
});
