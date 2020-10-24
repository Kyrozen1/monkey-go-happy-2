
var monkey , monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0
var ground, invisibleground
var survivalTime = 0

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

  function setup() {
    createCanvas(500, 300)
    monkey = createSprite(50, 240, 30, 30);
    monkey.addAnimation("running", monkey_running);
    monkey.scale=0.1; 

    ground = createSprite(300, 290, 600, 50);
    ground.shapeColor="green";

    invisibleground = createSprite(300, 290, 600, 50);
    invisibleground.visible=false;
    
    //monkey.debug=true
    monkey.setCollider("circle", 0, 0, 280)
    
    foodGroup = createGroup();
    obstacleGroup = createGroup();
  }

  function draw() {
    background("skyblue");
    stroke("white");
    textSize(20);
    fill("white");
    text("score:"+ score, 360, 50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time:"+ survivalTime, 60, 50);
    
    if (keyDown("space") && monkey.y>230){
      monkey.velocityY=-14;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleground);
    
    obstacles();
    bananas();
    
    if(foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    drawSprites();
  }

  function bananas(){
    if(World.frameCount%80===0){
    banana = createSprite(500, 125, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.y = Math.round(random(120, 190))
    banana.velocityX=-(6+survivalTime/15);
    banana.scale=0.1;
    banana.lifetime=100;
    foodGroup.add(banana);
    }
  }

  function obstacles(){
    if(World.frameCount%300===0){
    obstacle = createSprite(500, 240, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-(6+survivalTime/15);
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
  }