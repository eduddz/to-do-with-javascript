// criando o array que guardará os dados das tarefas
let arrayDeTarefas = [];


/**
 * acessando os dados do localstorage
 * por ser string, é necessário converter em array
 * 
 * será verificado se existe esse localstorage
 * senão retornará um array vazio
 * usando operador de coalescência nulo (??) que retorna 
 * o lado direito, caso, o lado esquerdo seja null ou undefined
 */
const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];

/** 
 * inserindo os dados no localstorage
 * por estar guardando um array de dados
 * necessário converter em string 
 * (pois localstorage guarda string)
 * 
 * setItem recebe 2 parâmetros
 * (key, value)
 */ 
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));


function mostrarStatus(status) {
    if (status === 'checked') {
        return 'Concluído'
    } else {
        return 'Não concluído'
    }
}

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('div');
    item.classList.add('todo-item');
    item.innerHTML = `
        <div>
            <input type="checkbox" ${status} data-indice=${indice} />
            <div>${tarefa}</div>
            <input type="button" value="X" data-indice=${indice} />
            </div>
        <p>${mostrarStatus(status)}</p>
    `;

    document.getElementById('todoList').appendChild(item);
}


const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;

    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();