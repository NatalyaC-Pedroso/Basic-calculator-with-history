class Calculadora {
    constructor(){
        this.operacao = [ ];
        this.visor = window.document.getElementById("visorInfo");
        this.historicoDiv = window.document.getElementById("historico-conteudo");
        this.historico = [];
        this.status;
    } 
    lerValores(valorDigitado) {
        const operadores = ['+', '-', '*', '/'];
        const ultimoValor = this.operacao[this.operacao.length - 1];
        
        if (operadores.includes(valorDigitado) && operadores.includes(ultimoValor)) {
            this.visor.innerText = "ERRO: Operador inválido";
            return;
        }
        
        this.operacao.push(valorDigitado);
        this.visor.innerText = this.operacao.join("");
    }
    handleOperacoes() {
        let operacaoStr = this.operacao.join("");
        let resultado = eval(operacaoStr);
        
        this.historico.push(`${operacaoStr} = ${resultado}`);
        this.atualizarHistorico();
        
        this.visor.innerText = resultado;
        this.operacao = [resultado];
    }
    atualizarHistorico() {
        this.historicoDiv.innerHTML = "";
        this.historico.forEach((item) => {
            const p = document.createElement("p");
            p.innerText = item;
            this.historicoDiv.appendChild(p);
        });
    }
    apagaUltimoDigito() {
        this.operacao.pop();
        this.visor.innerText = this.operacao.join("");
    }
    toggleHistorico() {
        document.getElementById("historico").classList.toggle("aberto");
    }
    limparHistorico() {
        this.historico = [];
        this.atualizarHistorico();
    }
    togglePaleta() {
        document.getElementById("paleta-conteudo").classList.toggle("aberto");
    }
    mudarTema(tema) {
        const container = document.getElementById("containerCalculadora");
        // Remove todas as classes de tema
        container.classList.remove('tema-padrao', 'tema-azul', 'tema-verde', 'tema-laranja', 'tema-roxo', 'tema-escuro', 'tema-vermelho', 'tema-preto', 'tema-amarelo');
        // Adiciona o novo tema
        container.classList.add('tema-' + tema);
    }
}

const calculadora = new Calculadora();
const listaDeNumeros = Array.from(document.getElementsByClassName('numeros'));
const listaOperadores = Array.from(document.getElementsByClassName('operadores'));

listaDeNumeros.map((element) => {
    element.addEventListener('click', (event) => {
        calculadora.lerValores(event.target.value);
    });
});

listaOperadores.map((element) => {
    element.addEventListener('click', (event) => {
        calculadora.lerValores(event.target.value);
    });
});

document.getElementById("historico").addEventListener("click", (event) => {
    if (event.target === document.getElementById("historico")) {
        calculadora.toggleHistorico();
    }
});  