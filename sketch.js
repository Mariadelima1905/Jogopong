//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 17;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete player 1
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//variável colisão
let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let wRaqueteOponente=wRaquete;
let hRaqueteOponente=hRaquete;
let velocidadeYOponente; 

//chance de errar
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let trilha;
let raquetada;
let ponto;


function preload() {
   trilha = loadSound("trilha.mp3");
   ponto = loadSound("ponto.mp3");
   raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}
function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  colisaoBorda();
  fill(51,153,255);
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  fill(255,0,0);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  circle(xBolinha,yBolinha,diametro)
}
function movimentoBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    }  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x,y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;}
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;}
}

function colisaoRaquete() {
  if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    }
}
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete /2 - 50;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 80){
    chanceDeErrar = 50
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 50){
    chanceDeErrar = 35
    }
  }
}
function incluiPlacar() {
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}
function marcaPonto() {
  if (xBolinha > 593) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 7) {
    pontosOponente += 1
    ponto.play();
  }
}
function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}

