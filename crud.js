let id = 0
let produtos = []

document.querySelector("#salvar").addEventListener("click", cadastrar)

window.addEventListener("load", () => {
    produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.forEach((produto) => {
        document.querySelector("#produtos").innerHTML += gerarCard(produto);
    });
});

function cadastrar() {
    let nome = document.querySelector("#nome").value
    let descricao = document.querySelector("#descricao").value
    let preco = document.querySelector("#preco").value
    let categoria = document.querySelector("#categoria").value

    if (!nome) {
        alert("É necessário informar um nome para cadastrar o produto.")
        return
    }

    const produto = {
        id: id++,
        nome,
        descricao,
        preco,
        categoria,
    }

    produtos.push(produto)

    let produtosLocalStorage = localStorage.getItem("produtos")
    if (produtosLocalStorage) {
        produtosLocalStorage = JSON.parse(produtosLocalStorage)
    } else {
        produtosLocalStorage = []
    }

    produtosLocalStorage.push(produto)

    localStorage.setItem("produtos", JSON.stringify(produtos))

    document.querySelector("#produtos").innerHTML += gerarCard(produto)
}

function apagar(botao, id) {
    botao.parentNode.parentNode.parentNode.remove()
    deleteProduto(id)
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
            ${produto.categoria}
          </span>
        </p>
        <p>R$ ${produto.preco}</p>
        <a href="#" class="btn btn-success">
          <i class="bi bi-cart-check"></i>
        </a>
        <a href="#" class="btn btn-danger" onClick="apagar(this, ${produto.id})">
            <i class="bi bi-trash"></i>
        </a>
      </div>
    </div> <!-- card -->
  </div> <!-- col -->`
}

function deleteProduto(id) {
    produtos = produtos.filter(produto => produto.id !== id)
    localStorage.setItem("produtos", JSON.stringify(produtos))
}