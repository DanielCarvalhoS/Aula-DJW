//Variavel que vai receber um número aleatório 
let randomNumber = parseInt(Math.random()*100+1)

//Criando variaveis para manipular os elementos html

const submit = document.querySelector('#Jogar') //butão
const jogada =  document.querySelector('#txtNumero') // cx. de texto
const jogadaAnterior = document.querySelector('.vezes')// Jogadas anteriores
const jogadasRestantes = document.querySelector('.numChances')//Jogadas Restantes
const recomecar = document.querySelector('.resultados') //Div
const avisos = document.querySelector('.avisos') // texto informativo 
const p = document.createElement('p') // criara um paragrafo para reiniciar 

let numerosJogados = [] //Criação de vetor para numeros jogados
let minhasJogadas = 1 // Contador de jogadas
let playGame = true; // Jogador pode jogar 

if(playGame){    // Se variavel playGame for True execute.....
    submit.addEventListener('click',function(e) {
            e.preventDefault();
            const tentativa = parseInt(jogada.value)
            validaChances(tentativa)//Chamando a função valida chances e enviando tentativa como 
    })
}

function validaChances(tentativa){
    if(isNaN(tentativa)){ //Se tentativa não for um número 
        alert(`Por Obséquio,\n Informe para nós um algarismo numérico.`) 
        jogada.value = '' //limpando a caixinha
        jogada.focus() //setando o "focus" na caixinha
        
    }
    else if(tentativa < 1 || (tentativa > 100)){
        alert(`Por Obséquio,\n Informar um valor maior que 0 e menor que 101.`)
        jogada.value = ''
        jogada.focus()
    }

    else if(numerosJogados.includes(tentativa)){
            alert('Mesmo número não! A única coisa que eu aceito repetido é o Gojo morrendo.')
        jogada.value = ''
        jogada.focus()
    }
    else{
        numerosJogados.push(tentativa) // empurrando o valor no vetor
        //Se minhasJogadas For igual à 6 e temtativa for diferente(!==) do numero aleatorio
        if(minhasJogadas === 6 && (tentativa !== randomNumber )){
            displayTentativas(tentativa)   //Cha,a a função displayTetntativas
            msg(`Game Over!! <br> O número correto era ${randomNumber}`) 
            fimJogo()
        }
        else{
                displayTentativas(tentativa);
                checarTentativas(tentativa);
        }
    }
 }
function checarTentativas(tentativa){
    if(tentativa === randomNumber){
        msg('Parabenis vocuai acertuai')
        fimJogo()
    }
    else if(tentativa< randomNumber){
        msg('Palpite baixo, tente novamente!')
    }
    else if(tentativa > randomNumber){
        msg('Palpite alto, tente novamente!')

    }
}

/*
código vai limpar a caixa de texto para proxima jogada
inserindo uma informação dentro do elemento htlm chamado span
incrementando um novo valor para variavel minhaJogadas
inserindo informação de jogadas restantes usando propriedade innerHTML
*/
function displayTentativas(tentativa){
    jogada.value= ''
    jogadaAnterior.innerHTML += `${tentativa} `
    minhasJogadas++
    jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
}

function msg(mensagem){
    avisos.innerHTML = `<h1>${mensagem}</h1>`
}

function fimJogo(){
    jogada.value = ''
    jogada.setAttribute('disabled', '')//desabilita caixinha para digitação
    submit.setAttribute('disabled', '')//desabilita o botão
    p.innerHTML = '<h1 id="iniciarJogada">Iniciar o Jogo.</h1>'
    recomecar.appendChild(p)
    playGame = false;
    iniciarJogo()
}

function iniciarJogo(){
    const botaoiniciar = document.querySelector('#iniciarJogada')
    botaoiniciar.addEventListener('click',function(){
        randomNumber = parseInt(Math.random()*100+1)
        numerosJogados = [] //Deixar o vetor vazio
        minhasJogadas = 1
        jogadaAnterior.innerHTML = ''
        avisos.innerHTML = ''
        jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
        jogada.removeAttribute('disabled','')
        submit.removeAttribute('disabled','')
        recomecar.removeChild(p)
        playGame = true 
    })
}
