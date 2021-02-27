 //initiate Game STATEs
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monkey, monkey_running;
var banana;
var score;
var stone;
var ground;
var scene;
var ObstaclesGroup;
var BannanaGroup;

var x1 =0;
var x2 =600;
var scrollSpeed = 1;

//score
var count = 0; 

function preload(){
  //monkey animation
  monkey_running = loadAnimation("monkey_01.png","monkey_02.png","monkey_03.png");
  //bannana image
  banana_image = loadImage("banana.png");
  //stone animation
  stone_image = loadImage("stone.png")
  //load jungle
  scene_image = loadImage("jungle.jpg")
  
  }

function setup() {
  //create game area
  createCanvas(600,400);

//   background
  scene = createSprite(300,200,600,400);
  scene.addImage("jungle",scene_image)
  scene.velocityX = -5;
  //monkey createsprite
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,375,600,20);
  
  ObstaclesGroup = createGroup()
  BannanaGroup = createGroup()

}


//score
var count = 0; 


function draw() {

  monkey.collide(ground);
  ground.visible = false
  
  if(gamestate === PLAY){
    
//jump when the space key is pressed
  if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -12 ;
    }
  
  
//add gravity
    monkey.velocityY = monkey.velocityY + 0.8; 
  
  if(scene.x < 300){
    scene.x = scene.width/2;
    
  }
    
// //spawn the banana
    spawnbananas();
    
//     //spawn the Obstacle
    spawnstone(); 
  
  
text("bananas collected: "+ count, 250, 100);
  // console.log(gameState);
  //score image complete
  
  if(monkey.isTouching (ObstaclesGroup)){
    gamestate = END
    }
    if(monkey.isTouching (BannanaGroup)){
      BannanaGroup.destroyEach();
      
    }
    
  }
  else if (gamestate === END ){
   monkey.velocityX = 0
   ObstaclesGroup.setVelocityXEach (0)
   BannanaGroup.setvelocityXEach (0)
   scene.velocityX = 0
  }
  
drawSprites();
}


function spawnstone() {
  if(frameCount % 60 === 0) {
    
    stone = createSprite(600,340,5,5);
    stone.addImage(stone_image);
    stone.scale = 0.11;
    stone.velocityX = - (6 + 3*count/100);
    // stone.x = Math.round(random(600,500));

    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.1;
    stone.lifetime = 110;
    
    ObstaclesGroup.add(stone);
    
    

   
  }
}

function spawnbananas() {
  //write code here to spawn the Banana
  if (frameCount % 80 === 0) {
    banana = createSprite(400,320,40,10);
    banana.addImage("fruit",banana_image );
    banana.scale = 0.05;
    banana.velocityX = - (6 + 3*count/100);
    banana.y = Math.round(random(220,200));
   //assign lifetime to the variable
    banana.lifetime = 70;
    
    BannanaGroup.add(banana);
  }
  
}

