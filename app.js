let numeroLimite = 10;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
console.log('Número secreto: ' + numeroSecreto);
let tentativas = 1

reiniciarJogo();


function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {
        rate: 1.2
    });
}

function exibirMensagemInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e 10');


}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemtentativa = `Você acertou em ${tentativas} ${palavraTentativa}!`;
        exibirNaTela('p', mensagemtentativa);
        document.getElementById('chute').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirNaTela('h1', 'Você errou!');
        if (chute > numeroSecreto) {
            exibirNaTela('p', 'O número secreto é menor que ' + chute);
        } else {
            exibirNaTela('p', 'O número secreto é maior que ' + chute);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;

    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');
}