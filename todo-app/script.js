document.addEventListener('DOMContentLoaded', carregarTarefas);

function adicionarTarefa() {
    const input = document.getElementById('nova-tarefa');
    const texto = input.value.trim();

    if (texto === '') {
        alert('Digite uma descrição para a tarefa.');
        return;
    }

    const tarefas = obterTarefasLocalStorage();
    tarefas.push({ texto: texto, concluida: false });

    salvarTarefasLocalStorage(tarefas);
    input.value = '';
    renderizarTarefas();
}

function obterTarefasLocalStorage() {
    const tarefas = localStorage.getItem('tarefas');
    return tarefas ? JSON.parse(tarefas) : [];
}

function salvarTarefasLocalStorage(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    renderizarTarefas();
}

function renderizarTarefas() {
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    const tarefas = obterTarefasLocalStorage();

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }

        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        span.onclick = () => alternarConcluida(index);

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Excluir';
        btnRemover.className = 'btn-remover';
        btnRemover.onclick = () => removerTarefa(index);

        li.appendChild(span);
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

function alternarConcluida(index) {
    const tarefas = obterTarefasLocalStorage();
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefasLocalStorage(tarefas);
    renderizarTarefas();
}

function removerTarefa(index) {
    const tarefas = obterTarefasLocalStorage();
    tarefas.splice(index, 1);
    salvarTarefasLocalStorage(tarefas);
    renderizarTarefas();
}