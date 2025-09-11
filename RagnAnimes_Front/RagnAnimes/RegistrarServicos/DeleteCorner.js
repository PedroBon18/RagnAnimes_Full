// Espera o DOM carregar
window.addEventListener("DOMContentLoaded", () => {
  const btnDeletar = document.getElementById("btn-deletar");
  const animeSelect = document.getElementById("anime-id");

  if (btnDeletar && animeSelect) {
    btnDeletar.addEventListener("click", async () => {
      const id = animeSelect.value; // pega o id selecionado

      if (!id || id === "0") { // 0 é "Novo Anime"
        alert("Selecione um anime válido para deletar os links.");
        return;
      }

      if (!confirm("Tem certeza que deseja desativar TODOS os links deste anime?")) return;

      try {
        const response = await fetch(`http://localhost:8080/link/toggle/anime/${id}`, {
          method: "POST",
        });

        if (response.ok) {
          alert("Todos os links foram desativados com sucesso!");
          window.location.reload(); // recarrega para refletir o novo estado
        } else {
          alert("Nenhum link encontrado para esse anime.");
        }
      } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
});
