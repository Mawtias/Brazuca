/*
DECLARAR VARIÁVEIS */
var jog1 = "";
var jog2 = "";
var pontos_jog1 = 0;
var pontos_jog2 = 0;
var chance_jog1 = 3;
var chance_jog2 = 3;
var rodada = 1;
var dock = [1,2,3,4,5];
var par = 0;
var principal = false;
var cartaPrincipal;
var escolha_j1 = 0;
var escolha_j2 = 0;
var jogadorAtivo = 1;
var interativo = true;
var tema = document.getElementById("tema");

//FUNÇÃO NOME JOGADORES
function nome_jogadores(){  
  document.getElementById("jog1").innerHTML = "Rodada: " + rodada + "<br><br> Pontuação <br>" + nome_jog1 +
  ": " + pontos_jog1 + "<br>" + nome_jog2 + ": " + pontos_jog2;  
}

//INICIANDO O JOGO
var nome_jog1 = prompt("Entre com jogador 1");
var nome_jog2 = prompt("Entre com jogador 2");
comecarJogo();
carregarOnClickCartas();
document.getElementById("regras").addEventListener("click", mostrarRegras)



function comecarJogo(){
nome_jogadores();
carregarInicial();
document.getElementById("instru").innerHTML = nome_jog1 + " selecione uma carta:"
}

//Fim do for das rodadas
console.log("TOTAL DE PONTOS JOGADOR 1: " + pontos_jog1);
console.log("TOTAL DE PONTOS JOGADOR 2: " + pontos_jog2);
if(pontos_jog1 > pontos_jog2){
 // alert("JOGADOR 1 VENCEU!!!");
}else if(pontos_jog1 < pontos_jog2){
  //alert("JOGADOR 2 VENCEU!!!");
}else{
 // alert("DEU EMPATE!!!")
}

//Função para selecionar carta - Retorna qual o ID da carta clicada
function selecionarCarta(){
  if(interativo){    
  if (jogadorAtivo === 1){    
    escolha_j1 = this.id;
    if(!principal){
      document.getElementById("principal").src = document.getElementById(escolha_j1).src;
      principal = true;
      cartaPrincipal = dock[escolha_j1-1];
      
      for(i = 1; i < dock.length  + 1; i++){
        document.getElementById(i).src = "imgs/Prancheta 1.png"
      }
      trocarMensagem("Tente achar onde está a carta que você escolheu:")  
      embaralharDeck()    
    }
    else{
      img = dock[escolha_j1-1]+1
      this.src = "imgs/Prancheta " + img + ".png"
      if(cartaPrincipal === dock[escolha_j1-1]){
        proxJogador();
      } 
      else {
        chance_jog1--
        //console.log("chance  " + chance_jog1);
        if(chance_jog1==0)proxJogador();
        else{
          trocarMensagem("Que pena! Tente novamente, você tem mais " + chance_jog1 + " chances!")
        }
      }
    }
    //console.log(escolha_j1)
    //console.log(cartaPrincipal);
  }
  else{
    escolha_j2 = this.id;
    if(!principal){
      document.getElementById("principal").src = document.getElementById(escolha_j2).src;
      principal = true;
      cartaPrincipal = dock[escolha_j2-1];
      
      for(i = 1; i < dock.length  + 1; i++){
        document.getElementById(i).src = "imgs/Prancheta 1.png"
      }

      trocarMensagem("Tente achar onde está a carta que você escolheu:")
      embaralharDeck()
    }
    else{
      img = dock[escolha_j2-1]+1
      this.src = "imgs/Prancheta " + img + ".png"
      if(cartaPrincipal === dock[escolha_j2-1]){
        proxJogador();
      } 
      else {
        chance_jog2--
        console.log("chance  " + chance_jog2);
        if(chance_jog2==0)proxJogador();
        else{
          trocarMensagem("Que pena! Tente novamente, você tem mais " + chance_jog2 + " chances!")
        }
      }
    }
    console.log(escolha_j2)
    console.log(cartaPrincipal);
  }
    //console.log(escolha_j2)
  }
}

function proxJogador(){
  if(jogadorAtivo===1){
    chance_jog2 = 3;
    jogadorAtivo = 2;
    principal = false;
    switch (chance_jog1) {
      case 3:
        pontos_jog1+=3;
        trocarMensagem("DE PRIMEEEIRA! Você ganhou 3 pontos!!!")
        break;
      case 2:
        pontos_jog1+=2;
        trocarMensagem("Uau, nem demorou em?! Você ganhou 2 pontos!!")
        break;
      case 1:
        pontos_jog1+=1;
        trocarMensagem("Até que dá pro gasto! Você ganhou 1 ponto!")
        break;  
      case 0:
        trocarMensagem("Xii...Que zika! Você não ganhou pontos nesse rodada.")
        break;  
    }
    nome_jogadores();
    interativo = false
    setTimeout(ativarInteracao, 4000)
    setTimeout(carregarCartasVerso,2000)
    setTimeout(carregarCartaBranca,2000)
    dock = [1,2,3,4,5];
    setTimeout(carregarInicial,3000)
    setTimeout(function() { trocarMensagem(nome_jog2 + " agora é a sua vez. Selecione uma carta:"); }, 2000)
   //comecarJogo();
  }
  else{
    chance_jog1 = 3;
    jogadorAtivo=1;
    principal = false;
    switch (chance_jog2) {
      case 3:
        pontos_jog2+=3;
        trocarMensagem("DE PRIMEEEIRA! Você ganhou 3 pontos!!!")
        break;
      case 2:
        pontos_jog2+=2;
        trocarMensagem("Uau, nem demorou em?! Você ganhou 2 pontos!!")
        break;
      case 1:
        pontos_jog2+=1;
        trocarMensagem("Até que dá pro gasto! Você ganhou 1 ponto!")
        break;  
      case 0:
        trocarMensagem("Vish...Deu ruim! Você não ganhou pontos nessa rodada.")
        break;  
    }
    rodada++;
    if(rodada==4)fimDeJogo();
    else{
      nome_jogadores();
      interativo = false
      setTimeout(ativarInteracao, 4000)
      setTimeout(carregarCartasVerso,2000)
      setTimeout(carregarCartaBranca,2000)
      dock = [1,2,3,4,5];
      setTimeout(carregarInicial,3000)    
      setTimeout(function() { trocarMensagem(nome_jog1 + " agora é a sua vez. Selecione uma carta:"); }, 2000)
     //comecarJogo();
    }    
  } 
}

//Carrega OnClick nas 5 cartas usando função selecionarCarta
function carregarOnClickCartas(){
  for(i = 1; i < dock.length  + 1; i++){
    document.getElementById(i).addEventListener("click",selecionarCarta)
    document.getElementById(i).addEventListener("click",audio)
  }  
}

function embaralharDeck(){
  // Loop em todos os elementos
  console.log("DOCK INICIAL: " + dock);
  for (let i = dock.length - 1; i > 0; i--) {
      // Separando as figuras   
      const j = Math.floor(Math.random() * (i + 1));
      // Armazenando em novo dock
      [dock[i], dock[j]] = [dock[j], dock[i]];
  }
  // Retornando dock embaralhado
  console.log("DOCK EMBARALHADO: " + dock);
}

//Carregar Imagens iniciais
function carregarInicial(){
  for( i = 0 ;i < dock.length; i ++){
    var j = i+2
    document.getElementById(dock[i]).src = "imgs/Prancheta " + j + ".png"    
  }
}

function carregarCartasVerso(){
  for(i = 1; i < dock.length  + 1; i++){
    document.getElementById(i).src = "imgs/Prancheta 1.png"
  }
}

function carregarCartaBranca(){
  document.getElementById("principal").src = "imgs/Prancheta 0.png"
}

function trocarMensagem(msg){
  document.getElementById("instru").innerHTML = msg;
}
function definirPar(){
  par = Math.floor(Math.random() * 5 + 1);
  console.log("FIGURA QUE FAZ PAR: " + par);
}

function ativarInteracao(){
  interativo = true
}

function fimDeJogo(){
  interativo = false
  document.getElementById("jog1").innerHTML = "Rodada: 3" + "<br><br> Pontuação <br>" + nome_jog1 +
  ": " + pontos_jog1 + "<br>" + nome_jog2 + ": " + pontos_jog2;
  if(pontos_jog1 > pontos_jog2) setTimeout( function() {alert( nome_jog1 + " venceu o jogo e trouxe o HEXA pra gente!"); }, 2000) 
  else if(pontos_jog2 > pontos_jog1) setTimeout( function() {alert( nome_jog2 + " venceu o jogo e trouxe o HEXA pra gente!"); }, 2000)
  else setTimeout( function() {alert(nome_jog1 + " e " + nome_jog2 + " empataram. Só que aqui a gente não tem prorrogação."); }, 2000)
}

function mostrarRegras(){
  alert("Bem-vindo a Brazuca! "+ 
  "Neste jogo de advinhação, seu objetivo é conseguir mais pontos que seu adversário após 3 rodadas." + 
  " Em cada rodada você deverá escolher um jogador e em seguida tem 3 tentativas para acertar onde ele está."+ 
  " Quanto antes você acertar, mais pontos você faz! Boa sorte e VAI BRASIL!! #vemHEXA")
}

function audio(){
  tema.play()
}
