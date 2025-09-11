document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("http://localhost:8080/anime");
      if (!response.ok) throw new Error("Erro ao carregar animes");
      const animes = await response.json();
  
      // Preenche os carousels de acordo com o gênero
      animes.forEach(anime => {
        // Converte gênero para o mesmo formato do HTML (ex: ACAO, AVENTURA)
        const generoId = anime.genero.toUpperCase();
  
        // Seleciona o carousel correspondente
        const carousel = document.getElementById(`carousel-${generoId}`);
        if (!carousel) return; // ignora gêneros sem seção no HTML
  
        // Cria o card
        const card = document.createElement("a");
        card.href = `/RagnAnimes/AnimePage/anime.html?id=${anime.id}`;
        card.innerHTML = `
          <div class="card">
            <img src="${anime.imagem}" alt="${anime.nome}" />
          </div>
        `;
  
        carousel.appendChild(card);
      });
  
    } catch (error) {
      console.error("Erro ao carregar animes:", error);
    }
  });
  