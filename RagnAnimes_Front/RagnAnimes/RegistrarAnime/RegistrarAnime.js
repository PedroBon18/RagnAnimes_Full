document.getElementById("anime-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const animeId = document.getElementById("anime-id").value; // pega o id selecionado
  const nome = document.getElementById("nome").value;
  const estudio = document.getElementById("estudio").value;
  const imagem = document.getElementById("imagem").value;
  const trailer = document.getElementById("trailer").value;
  const descricao = document.getElementById("descricao").value;
  const categoria = document.getElementById("categoria").value;
  const anoLancamento = document.getElementById("anoLancamento").value;

  // Dados que vão ser enviados (mesmo para criar e atualizar)
  const animeData = {
    id: animeId !== "0" ? parseInt(animeId) : null, // backend pode ignorar no POST
    nome: nome,
    estudio: estudio,
    imagem: imagem,
    genero: categoria,   // Enum Genero do backend
    sinopse: descricao,
    anoLancamento: anoLancamento,
    trailer: trailer,
    ativo: true
  };

  try {
    let url, method;

    if (animeId === "0" || animeId === "") {
      // Criar novo anime
      url = "http://localhost:8080/anime";
      method = "POST";
    } else {
      // Atualizar anime existente
      url = `http://localhost:8080/anime/update/${animeId}`;
      method = "POST"; // seu controller usa POST para update
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animeData)
    });

    if (response.ok) {
      const msg = animeId === "0" ? "Anime registrado com sucesso!" : "Anime atualizado com sucesso!";
      document.getElementById("mensagem").textContent = msg;
      document.getElementById("mensagem").style.color = "green";
      document.getElementById("anime-form").reset();

      // Recarrega a lista do select para atualizar com o novo nome/ID
      carregarAnimesNoSelect();
    } else {
      const errorText = await response.text();
      document.getElementById("mensagem").textContent = "Erro: " + errorText;
      document.getElementById("mensagem").style.color = "red";
    }
  } catch (error) {
    document.getElementById("mensagem").textContent = "Erro de conexão com a API!";
    document.getElementById("mensagem").style.color = "red";
  }
});
