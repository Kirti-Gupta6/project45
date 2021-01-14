var PLAY = 1;
var END = 0;
var gameState = PLAY;

var harry, harry_flying, harry_collided;
var ground, invisibleGround, groundImage;

var potionsGroup, potion1Image, potion2Image;
var ghostsGroup, ghost1, ghost2, ghost3, ghost4, ghost5, ghost6;

var sky, skyImage

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  harry_flying =   loadAnimation("harryP3.png");
  
  //harry_collided = loadAnimation("harry_collided.png");
  
  //groundImage = loadImage("ground2.png");
  
  potion1Image = loadImage("image/potion1.png");
  potion2Image = loadImage("image/potion2.png");
  
  ghost1 = loadImage("image/ghost1.png");
  ghost2 = loadImage("image/ghost2.png");

  sky = loadImage("image/sky.jpg");
  /*ghost3 = loadImage("ghost3.png");
  ghost4 = loadImage("ghost4.png");
  ghost5 = loadImage("ghost5.png");
  ghost6 = loadImage("ghost6.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");*/
}

function setup() {
  createCanvas(displayWidth-10, displayHeight-130);
  
  harry = createSprite(200,180,20,50);
  harry.addAnimation("flying", harry_flying);
  //harry.addAnimation("collided", harry_collided);
  harry.scale = 0.5;
  
  /*ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  */
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  potionsGroup = new Group();
  ghostsGroup = new Group();
  
  score = 0;
}

function draw() {
  //harry.debug = true;
  background(sky);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    /*if(keyDown("space") && harry.y >= 159) {
      harry.velocityY = -12;
    }
    
  
    harry.velocityY = harry.velocityY + 0.8
  */
    
    spawnPotions();
    spawnGhosts();
  
    if(ghostsGroup.isTouching(harry)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    /*gameOver.visible = true;
    restart.visible = true;
    */
    
    harry.velocityY = 0;
    ghostsGroup.setVelocityXEach(0);
    potionsGroup.setVelocityXEach(0);
    
    //change the harry animation
    //harry.changeAnimation("collided",harry_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ghostsGroup.setLifetimeEach(-1);
    potionsGroup.setLifetimeEach(-1);
    
    /*if(mousePressedOver(restart)) {
      reset();
    }
    */
  }
  drawSprites();
}

function spawnPotions() {
  //write code here to spawn the potions
  if (frameCount % 60 === 0) {
    var potion = createSprite(600,120,40,10);
    potion.y = Math.round(random(80,120));
    var r = Math.round(random(1,2));

    switch (r) {
     case 1: potion.addImage(potion1Image);
     break
     case 2: potion.addImage(potion2Image);
    }
   
    potion.scale = 0.5;
    potion.velocityX = -3;
    
     //assign lifetime to the variable
    potion.lifetime = 200;
    
    //adjust the depth
    potion.depth = harry.depth;
    harry.depth = harry.depth + 1;
    
    //add each potion to the group
    potionsGroup.add(potion);
  }
  
}

function spawnGhosts() {
  if(frameCount % 60 === 0) {
    var ghost = createSprite(600,165,10,40);
    //ghost.debug = true;
    ghost.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: ghost.addImage(ghost1);
              break;
      case 2: ghost.addImage(ghost2);
              break;
      case 3: ghost.addImage(ghost1);
              break;
      case 4: ghost.addImage(ghost2);
              break;
      case 5: ghost.addImage(ghost1);
              break;
      case 6: ghost.addImage(ghost2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the ghost           
    ghost.scale = 0.5;
    ghost.lifetime = 300;
    //add each ghost to the group
    ghostsGroup.add(ghost);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  ghostsGroup.destroyEach();
  potionsGroup.destroyEach();
  
  harry.changeAnimation("flying",harry_flying);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}