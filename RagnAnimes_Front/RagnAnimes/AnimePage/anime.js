// Pega o id do anime a partir da URL (ex: anime.html?id=2)
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")); // Converte o valor para número

// Referências aos elementos do DOM
const imgElem = document.getElementById("imagem");
const tituloElem = document.getElementById("titulo");
const descricaoElem = document.getElementById("descricao");
const trailerSection = document.getElementById("trailer-section");
const trailerIframe = document.getElementById("trailer");
const errorSection = document.getElementById("error-section");
const animeDetailsDiv = document.querySelector(".anime-details");
const servicosContainer = document.getElementById("servicos-container");

// Função principal para carregar o anime
async function carregarAnime() {
  if (!id) {
    console.error("ID do anime não definido na URL");
    errorSection.style.display = "block";
    animeDetailsDiv.style.display = "none";
    return;
  }

  try {
    // Busca o anime pelo ID
    const response = await fetch(`http://localhost:8080/anime/${id}`);
    if (!response.ok) throw new Error("Anime não encontrado");

    const anime = await response.json();

    // Preenche os dados do anime
    imgElem.src = anime.imagem;
    imgElem.alt = anime.nome;
    tituloElem.textContent = anime.nome;
    descricaoElem.textContent = anime.sinopse || anime.descricao;

    // Exibe o trailer (se existir)
    if (anime.trailer) {
      trailerIframe.src = anime.trailer;
      trailerIframe.title = `Trailer de ${anime.nome}`;
      trailerSection.style.display = "block";
    } else {
      trailerSection.style.display = "none";
    }

    servicosContainer.innerHTML = ""; // limpa antes
    if (anime.likes && anime.likes.length > 0) {
      anime.likes.forEach(servico => {
      const servicoHTML = `
        <a href="${servico.link}" target="_blank" class="servico-item">
        <img src="${servico.imagem}" alt="Ícone de ${servico.nome}" class="servico-icone">
        <p class="servico-nome">${servico.nome}</p>
        </a>`;
      servicosContainer.innerHTML += servicoHTML;
      });
    }

    // Exibe a seção de detalhes
    errorSection.style.display = "none";
    animeDetailsDiv.style.display = "flex";

  } catch (error) {
    console.error(error);
    trailerSection.style.display = "none";
    errorSection.style.display = "block";
    animeDetailsDiv.style.display = "none";
  }
}

// Carregar quando a página terminar de carregar
window.addEventListener("DOMContentLoaded", carregarAnime);
