let id = 0
let tarefas = []



document.querySelector("#salvar").addEventListener("click", cadastrar)

function cadastrar() {
  let titulo = document.querySelector("#titulo").value
  let descricao = document.querySelector("#descricao").value
  let pontos = document.querySelector("#pontos").value
  let categoria = document.querySelector("#categoria").value

  if (!titulo) {
    alert("É necessário informar um título para cadastrar a tarefa.")
    return
  }

  const tarefa = {
    titulo,
    descricao,
    pontos,
    categoria,
  }
  if (tarefa.titulo.length === 0) {
    document.querySelector("#titulo").classList.add("is-invalid");
    return;
}
lista_filmes.push(tarefa);

  let tarefas = localStorage.getItem("tarefas")
  if (tarefas) {
    tarefas = JSON.parse(tarefas)
  } else {
    tarefas = []
  }

  tarefas.push(tarefa)

  localStorage.setItem("tarefas", JSON.stringify(tarefas))

  document.querySelector("#tarefas").innerHTML += gerarCard(tarefa)
}

function apagar(botao, id) {
    botao.parentNode.parentNode.remove();
    deleteCard(id);
}

function gerarCard(tarefa) {
  return `<div class="col-12 col-md-6 col-lg-3">
    <div class="card">
      <div class="card-header">
        ${tarefa.titulo}
      </div>
      <div class="card-body">
        <p class="card-text">${tarefa.descricao}</p>
        <p>
          <span class="badge text-bg-warning">
            ${tarefa.categoria}
          </span>
        </p>
        <p>${tarefa.pontos}pts</p>
        <a href="#" class="btn btn-success">
          <i class="bi bi-check-lg"></i>
        </a>
        <a href="#" class="btn btn-danger" onClick="apagar(this, ${tarefa.id})">
            <i class="bi bi-trash"></i>
        </a>
      </div>
    </div> <!-- card -->
  </div> <!-- col -->`

}


function deleteCard(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}