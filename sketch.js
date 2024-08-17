//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente; 

let colidiu = false;

//placas do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
createCanvas(600, 400);
  trlha.loop();
  
}

function draw() {
  background(0);
  meioDeCampo();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueeOPonente();
  incluiPlacar();
  marcaPonto();
}
 
function meioDeCampo(){
  strokeWeight(1);
  stroke("white");
  line(width/2,0, width/2,height)
}

function mostraBolinha(){
  fill ("yellow");
  circle (xBolinha, yBolinha, diametro);
}

function movimentaBxBolinha(){
  xBolinha *= velocidadeXBolinha;
  yBolinha *= velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha - raio > width || 
      xBolinha < 0){
    velocidadeXBolinha *= -1;
  }
if (yBolinha - raio > height ||
   yBolinha < 0){
  velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x, y){
  fill ("blue");
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)){
  yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
  yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete (x,y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar(pontos, x, y){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(130, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(130, 150, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 509){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha <10){
    pontosDoOponente += 1;
    ponto.play();
  }
}