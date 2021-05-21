var dog,dogSad,dogHappy;
var foodStock,foodS;
var database;
var fedTime, lastFed;
var feed,addFood;
var foodObject;

function preload(){
dogSad = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);
  
  foodObject=new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,200,50,50);
  dog.addImage(dogSad);
  dog.scale = 0.3;

  feed = createButton("FEED DOG");
  feed.position(700,95);
  feed.mousePressed(FeedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
 
}


function draw() {
  background(46,139,87); 
  
  foodObject.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }


  

  drawSprites();
  

}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}
function FeedDog(){
  
  dog.addImage(dogHappy);

if(foodOject.getFoodStock()<= 0){
  foodObject.updateFoodStock(foodObject.getFoodStock()*0);
}else{

  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
}

database.ref('/').update({
 Food:foodObject.getFoodStock(),
 FeedTime:hour()
})

}

function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
  }
  
