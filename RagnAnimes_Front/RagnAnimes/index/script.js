// ====== MENU HAMBÚRGUER ======

// Pega os elementos do HTML
const hamburger = document.getElementById('hamburger'); // ícone do menu (☰)
const menu = document.getElementById('menu'); // lista <ul> do menu

// Quando o ícone é clicado, adiciona ou remove a classe "active"
hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});
// Isso serve para abrir/fechar o menu no mobile
// (a classe "active" provavelmente está definida no seu CSS para exibir/esconder o menu)


// ====== FUNÇÃO DO CARROSSEL ======
function scrollCarousel(button, direction) {
  // Pega o container do carrossel (div.carousel) a partir do botão clicado
  const carousel = button.parentElement.querySelector('.carousel');
  
  // Pega o primeiro item (img dentro do card) para calcular largura
  const item = carousel.querySelector('img'); 
  const itemStyle = getComputedStyle(item); // Computa os estilos aplicados
  
  // Calcula largura total do item (incluindo margens laterais)
  const itemWidth = item.offsetWidth 
    + parseInt(itemStyle.marginRight) 
    + parseInt(itemStyle.marginLeft);
  
  // Quantos itens cabem de uma vez na tela do carrossel
  const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);

  // Quanto o carrossel deve "andar" quando o botão for clicado
  const scrollAmount = itemWidth * visibleItems;

  // ==== Rolagem para a DIREITA ====
  if (direction === 1) {
    // Se já está no final do carrossel
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 5) {
      // Volta para o início
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Senão, rola para a direita
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  } 
  // ==== Rolagem para a ESQUERDA ====
  else {
    // Se já está no começo
    if (carousel.scrollLeft <= 0) {
      // Vai para o final
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
    } else {
      // Senão, rola para a esquerda
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
}
