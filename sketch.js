var snail, snail_img;
var tomato, tomato_img;
var ground, ground_img;
var cloud,cloud_img;
var tomatosGroup;
var edges;
var score = 0;
var gameState = "play";
var restart;

function preload(){
 ground_img = loadImage("ground.png");
 snail_img = loadImage("snail.png");
 tomato_img = loadImage("tomato.png");
 cloud_img = loadImage("cloud.png");
 restartImg = loadImage("restart.png");
}

function setup(){
 createCanvas(1000,250);

 ground = createSprite(500,-150,1200,60);
 ground.addImage("ground",ground_img);
 ground.scale = 1;
 ground.velocityX = -2;

 invisibleGround = createSprite(200,200,400,10);
 invisibleGround.visible = false;
 invisibleGround.shapeColor = "black";
 
 snail = createSprite(50,180,50,50);
 snail.addAnimation("snail",snail_img);
 snail.scale = 0.06;

 restart = createSprite(500,140,200,100);
  restart.addImage(restartImg);
  
  restart.scale = 0.5;

  restart.visible = false;

 tomatosGroup = new Group();
 cloudsGroup = new Group();
 }


function draw(){
  edges = createEdgeSprites();
  if(gameState === "play"){
  
  score += Math.round(getFrameRate()/60);
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  if(keyDown("space") && snail.y>=140){
    snail.velocityY -= 2;
  }

  snail.velocityY += 0.5;
  
  snail.collide(invisibleGround);

  spawnTomatos();
  spawnClouds();
  drawSprites();
  textSize(30);
  fill("#03460A");
  text("Score: "+score,800,30);
  //text(mouseX+","+mouseY,mouseX,mouseY);

  if(snail.isTouching(tomatosGroup)){
    gameState = "end";    
  }
}
if(gameState === "end"){
  restart.visible = true;
  textSize(30);
    fill("red");
    textStyle(BOLD);
    text("Game Over",450,100);
    tomatosGroup.setVelocityXEach(0);
    ground.setVelocity(0,0);
    tomatosGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  
}

  
}
function spawnTomatos() {
  if (frameCount % 100 === 0) {
    var tomato = createSprite(1000,180,40,10);
    tomato.addImage(tomato_img);
    
    tomato.scale = 0.01;
    
    tomato.velocityX = -4;
    
    tomato.lifetime = 300;

    tomatosGroup.add(tomato);
  }  
}

function spawnClouds() {
  if (frameCount % 100 === 0) {
    var cloud = createSprite(1000,10,40,10);
    cloud.y = random(5,90);
    cloud.addImage(cloud_img);
    
    cloud.scale = 0.4;
    
    cloud.velocityX = -2;
    
    cloud.lifetime = 400;

    cloudsGroup.add(cloud);
  }  
}
function reset(){
  gameState = "play";
  restart.visible = false;
  
  tomatosGroup.destroyEach();
  cloudsGroup.destroyEach();
 snail.visiblle = true; 
  
  score = 0;
  
}
