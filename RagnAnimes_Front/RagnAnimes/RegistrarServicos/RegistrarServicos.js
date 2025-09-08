document.getElementById("servico-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const animeId = document.getElementById("anime_id").value;
    const nomes = document.querySelectorAll("input[name='nome_servico[]']");
    const urls = document.querySelectorAll("input[name='url_servico[]']");
    const imagens = document.querySelectorAll("input[name='imagem[]']");
  
    const servicos = [];
  
    for (let i = 0; i < nomes.length; i++) {
      servicos.push({
        nome: nomes[i].value,
        link: urls[i].value,
        imagem: imagens[i].value,
        conteudo: "Serviço de streaming", // Você pode personalizar
        anime: { id: parseInt(animeId) } // Importante: o backend espera um Anime
      });
    }
  
    try {
      for (const servico of servicos) {
        const response = await fetch("http://localhost:8080/link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(servico)
        });
  
        if (!response.ok) {
          throw new Error("Erro ao salvar serviço: " + (await response.text()));
        }
      }
  
      document.getElementById("mensagem").textContent = "Serviços registrados com sucesso!";
      document.getElementById("mensagem").style.color = "green";
      document.getElementById("servico-form").reset();
  
    } catch (error) {
      document.getElementById("mensagem").textContent = "Erro: " + error.message;
      document.getElementById("mensagem").style.color = "red";
    }
  });
  