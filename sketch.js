var  dog, happyDog, database, foodS, foodStock,dogImage,happyDogImage
var feedDogButton,addFoodButton,feedTime,lastFed,foodObj
function preload()
{
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  createCanvas(1000,500);
  database = firebase.database();
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.3
  foodStock = database.ref('Food')
foodStock.on("value",readStock);
feedDogButton = createButton("Feed The Dog");
feedDogButton.position(700,95);
feedDogButton.mousePressed(feedDog)
addFoodButton = createButton("Add Food")
addFoodButton.position(830,95);
addFoodButton.mousePressed(addFoodS)


foodObj = new Food()
}


function draw() {  
background(46, 139, 87)
  foodObj.display();
  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed = data.val()
  })
  fill(255,255,255);

  textSize(20);
 
  stroke(0);
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+"PM",350,100)
  }
  else if(lastFed === 0){
    text("Last Feed: 12 AM",350,100)
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,100)
  }
drawSprites();
}
function addFoodS(){
foodObj.updateFoodStock(1);

}
function feedDog(){
  hour();
  foodObj.deductFood();
  dog.addImage(happyDogImage);
  dog.x = 200
  dog.y = 200
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
function readStock(data){
foodS = data.val();
}


