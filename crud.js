let id = 0;
let produtos = [];
let carrinho = [];

document.querySelector("#salvar").addEventListener("click", cadastrar);

window.addEventListener("load", () => {
  produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  produtos.forEach((produto) => {
    document.querySelector("#produtos").innerHTML += gerarCard(produto);
  });

  carrinho.forEach((produto) => {
    document.querySelector("#carrinho").innerHTML += gerarItemCarrinho(produto);
  });

  atualizarTotalCarrinho();
});

function cadastrar() {
  let nome = document.querySelector("#nome").value;
  let descricao = document.querySelector("#descricao").value;
  let preco = document.querySelector("#preco").value;
  let categorias = document.querySelectorAll('input[name="categoria"]:checked');

  if (!nome) {
    alert("É necessário informar um nome para cadastrar o produto.");
    return;
  }

  const produto = {
    id: id++,
    nome,
    descricao,
    preco,
    categorias: Array.from(categorias).map((categoria) => categoria.value),
  };

  produtos.push(produto);

  localStorage.setItem("produtos", JSON.stringify(produtos));

  document.querySelector("#produtos").innerHTML += gerarCard(produto);

  limparCampos();
}

function apagar(botao, id) {
  botao.parentNode.parentNode.parentNode.remove();
  deleteProduto(id);
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find((produto) => produto.id === id);

  if (produto) {
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    document.querySelector("#carrinho").innerHTML += gerarItemCarrinho(produto);
    atualizarTotalCarrinho();
  }
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((produto) => produto.id !== id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  document.querySelector(`#item-carrinho-${id}`).remove();
  atualizarTotalCarrinho();
}

function gerarCard(produto) {
  return `<div class="col-12 col-md-6 col-lg-3">
    <div class="card">
      <div class="card-header">
        ${produto.nome}
      </div>
      <div class="card-body">
        <p class="card-text">${produto.descricao}</p>
        <p>
          <span class="badge text-bg-warning">
            ${produto.categorias.join(", ")}
          </span>
        </p>
        <p>R$ ${produto.preco}</p>
        <a href="#" class="btn btn-success" onClick="adicionarAoCarrinho(${produto.id})">
          <i class="bi bi-cart-check"></i>
        </a>
        <a href="#" class="btn btn-danger" onClick="apagar(this, ${produto.id})">
            <i class="bi bi-trash"></i>
        </a>
      </div>
    </div> <!-- card -->
  </div> <!-- col -->`;
}

function gerarItemCarrinho(produto) {
  return `<div class="card mb-2" id="item-carrinho-${produto.id}">
    <div class="card-body">
      <h5 class="card-title">${produto.nome}</h5>
      <p>R$ ${produto.preco}</p>
      <button class="btn btn-danger" onClick="removerDoCarrinho(${produto.id})">Remover</button>
    </div>
  </div>`;
}

function deleteProduto(id) {
  produtos = produtos.filter((produto) => produto.id !== id);
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function limparCampos() {
  document.querySelector("#nome").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#preco").value = "";
  document.querySelectorAll('input[name="categoria"]:checked').forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function atualizarTotalCarrinho() {
  let total = 0;
  carrinho.forEach((produto) => {
    total += parseFloat(produto.preco);
  });

  document.querySelector("#total-carrinho").textContent = total.toFixed(2);
}
