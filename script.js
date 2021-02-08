
let inputs;

function novoInput() {
    inputs = document.createElement('input')
    document.body.appendChild(inputs);
    inputs.style.padding = '8px';
    inputs.style.border = 'none';
    inputs.style.borderLeft = '4px solid blue';
    inputs.style.display = 'block';
    inputs.style.width = '250px'
    inputs.style.margin = '0 auto';
    inputs.style.marginBottom = '10px';
    inputs.placeholder = 'Escreva sua tarefa...'
}

