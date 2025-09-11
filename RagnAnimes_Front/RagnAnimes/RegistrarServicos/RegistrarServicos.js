window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("servico-form");
  const animeSelect = document.getElementById("anime-id");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const animeId = animeSelect.value; // pega o valor do select atualizado
    const nomes = document.querySelectorAll("input[name='nome_servico[]']");
    const urls = document.querySelectorAll("input[name='url_servico[]']");
    const imagens = document.querySelectorAll("input[name='imagem[]']");

    if (!animeId || animeId === "0") {
      alert("Selecione um anime válido.");
      return;
    }

    const servicos = [];

    for (let i = 0; i < nomes.length; i++) {
      servicos.push({
        nome: nomes[i].value,
        link: urls[i].value,
        imagem: imagens[i].value,
        conteudo: "Serviço de streaming",
        anime: { id: parseInt(animeId) }
      });
    }

    try {
      for (const servico of servicos) {
        const response = await fetch("http://localhost:8080/link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(servico)
        });

        if (!response.ok) {
          throw new Error("Erro ao salvar serviço: " + (await response.text()));
        }
      }

      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "Serviços registrados com sucesso!";
      mensagem.style.color = "green";
      form.reset();
    } catch (error) {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "Erro: " + error.message;
      mensagem.style.color = "red";
    }
  });
});
