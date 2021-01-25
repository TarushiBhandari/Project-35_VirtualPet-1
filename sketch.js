var dog, dogImg, happyDog, happyDogImg, database;
var foodS=20, foodStock, data;

function preload(){

dogImg= loadImage("Dog.png");
happyDogImg= loadImage("happydog.png");

}

function setup() {
  
  database= firebase.database();

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

  createCanvas(500, 500);

  dog= createSprite(250,350,10,10);
  dog.addImage(dogImg);
  dog.scale= 0.15;

}


function draw() {  
  background(46,139,87);

  if(foodS!==undefined){
    if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(happyDogImg);
      }
    if(keyWentDown(DOWN_ARROW)){
        dog.addImage(dogImg);
      }
    if(foodS===0){
        dog.addImage(dogImg)
        foodS=20;
      }
   }

drawSprites();

fill("black");
textSize(20);
text("PRESS UP ARROW KEY TO FEED DRAGO",30,100);
text("FOOD STOCK:"+foodS,100,480);
text("PRESS DOWN KEY TO STOP FEEDING DRAGO",30,180);

}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){

  //here, if the writeStock parameter is less than equals to 0, then the
  //parameter should be =0 else 1 value should be decreased
  if(x<=0){
    x=0;
  }
  else{
    x= x-1;
  }
  database.ref('/').update({
    Food:x
  })
  }
  