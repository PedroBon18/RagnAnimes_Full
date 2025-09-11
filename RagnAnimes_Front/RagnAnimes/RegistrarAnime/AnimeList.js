// Referência ao select
const animeIdSelect = document.getElementById("anime-id");

// Função para carregar IDs e nomes dos animes existentes
async function carregarAnimesNoSelect() {
  try {
    const response = await fetch("http://localhost:8080/anime/lista-basica");
    if (!response.ok) throw new Error("Erro ao buscar animes");

    const animes = await response.json();

    // Limpa as opções antigas (mantém apenas o "Novo Id")
    animeIdSelect.innerHTML = `
      <option value="0">Novo Id</option>
    `;

    // Adiciona cada anime como <option>
    animes.forEach(anime => {
      const option = document.createElement("option");
      option.value = anime.id;
      option.textContent = `${anime.id} - ${anime.nome}`;
      animeIdSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar animes no select:", error);
  }
}

// Chama ao carregar a página
window.addEventListener("DOMContentLoaded", carregarAnimesNoSelect);
