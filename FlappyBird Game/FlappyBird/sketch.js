var Bird, Bird_Falling, BirdIMG, Bird_FallingIMG;

var Pipes,Pipe1IMG, Pipe2IMG, Pipe1, Pipe2, PipesGroup, Pipes1, Pipes1Group;

var BackGround, BackGroundIMG;

var Ground;

var GameOver, Reset, GameOverIMG, ResetIMG;

var Start, StartIMG;

var logo, logoIMG;

var lives; 

var gameState=PLAY;

var PLAY= 1;

var END= 0;

var score= 0;

function preload(){

    BirdIMG= loadImage("Images/flappybird1.png");

    Bird_FallingIMG= loadImage("Images/Falling_Down.png");

    BackGroundIMG= loadImage("Images/background.png");

    GameOverIMG= loadImage("Images/gameover.png");

    ResetIMG= loadImage("Images/reset.png");

    Pipe1IMG= loadImage("Images/pipes.png");

    Pipe2IMG= loadImage("Images/pipes2.png");

    StartIMG= loadImage("Images/start.png");

    logoIMG= loadImage("Images/logo.png");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
 
    BackGround=createSprite(150,400,windowWidth,windowHeight);
    BackGround.addImage(BackGroundIMG);
    BackGround.x=BackGround.width/2;
    BackGround.velocityX=-3;

    Bird= createSprite(200,400,20,20);
    Bird.addImage(BirdIMG);
    Bird.scale= 0.175;

    Ground=createSprite(width/2,height,width,5);
    Ground.visible= false;
    Ground.x=Ground.width/2;
    Ground.velocityX=-3;

    Reset= createSprite(width/2,height/2);
    Reset.addImage(ResetIMG);
    Reset.scale=0.3;

    Start= createSprite(width/2,height/2,60,60);
    Start.addImage(StartIMG);
    Start.scale= 0.3;

    GameOver= createSprite(width/2,height/2-100);
    GameOver.addImage(GameOverIMG);
    GameOver.scale= 0.3;

    logo= createSprite(width/2,height/2-100,60,60);
    logo.addImage(logoIMG);

    GameOver.visible=false;
    Reset.visible=false;

    PipesGroup=new Group();
    Pipes1Group= new Group();

    fill("black");
    textSize(24);
    score= 0;
}

function draw(){
    drawSprites();
text("Score: "+score, windowWidth-150,40);

if(mousePressedOver(Start)){
    gameState=PLAY;
    Start.visible=false;
    Bird.velocityY=-11;

}

if(BackGround.x<0){
    BackGround.x=BackGround.width/2;
}

if(gameState=== PLAY){
    
        BackGround.velocityX=-3;
        
        score=score+Math.round(getFrameRate()/60);
    if(touches.length>0 || keyDown("space")){
        Bird.velocityY=-11;
        }
        Bird.velocityY = Bird.velocityY + 1.75;
        Bird.velocityX=0;
        
        touches=[];

        UpPipes();
        DownPipes();

        if(Bird.isTouching(PipesGroup) || Bird.isTouching(Ground)|| (Bird.isTouching(Pipes1Group))){
            gameState=END;
        }
}

else if(gameState=== END){
    GameOver.visible=true
    Reset.visible=true
    Bird.velocityX=0;
    BackGround.VelocityX=0;
    Ground.velocityX=0;
    Bird.x=200;
    Bird.y=400;
    PipesGroup.setVelocityXEach(0);
    PipesGroup.destroyEach();
    Pipes1Group.destroyEach();
    logo.visible=false;
}

if(touches.length>0 || mousePressedOver(Reset)){
    reset();
}
}

function reset(){
    gameState=PLAY;
    GameOver.visible=false;
    Reset.visible=false;
    score=0;
    PipesGroup.destroyEach();
    Pipes1Group.destroyEach();
    Bird.x=200;
    Bird.y=400;
}

function UpPipes(){
    if(frameCount%75===0){
        Pipes=createSprite(1350,200,40,10);
        Pipes.y=Math.round(random(0,100));
        Pipes.addImage(Pipe1IMG);
        Pipes.velocityX= -6;
        Pipes.scale=0.7
        PipesGroup.add(Pipes);
    }
}

function DownPipes(){
    if(frameCount%75===0){
        Pipes1=createSprite(1350,350,40,10);
        Pipes1.y=Math.round(random(600,900));
        Pipes1.addImage(Pipe2IMG);
        Pipes1.velocityX= -6;
        Pipes1.scale= 0.7;
        Pipes1Group.add(Pipes1);
    }

}