var myGameArea;
var ctx = document.querySelector('#canvas');
var context = ctx.getContext("2d");
var startX = 100;
var startY = 100;
var CellArray =  [
    [],
    [],
    [],
    []
];
var isEmpty = [
    [true,true,true,true],
    [true,true,true,true],
    [true,true,true,true],
    [true,true,true,true]
];

var score = 0;
var first2048 = true;

function startGame(){
    myGameArea.start();

}

var myGameArea = {

    start : function(){
   //     ctx.width = 800;
       // ctx.height = 800;
        console.log(document.body.childNodes);
        document.body.insertBefore(ctx, document.body.childNodes[0]);
        draw();
        insertEmptyCells();
        generate();
        //CellArray[0][0].setValue(16384);
       // insertBackGroudColor(CellArray[0][0].x,CellArray[0][0].y,CellArray[0][0].value);
        displayValues();
        
       // addScoreBox();
        console.log(CellArray);
        console.log(isEmpty);
    }
}

function draw(){
    drawTopWalls();
    drawleftWalls();
}

function drawTopWalls(){
    var localX = startX;
    var localY = startY;
    context.strokeStyle = 'black';
    context.lineWidth = 20;
    context.beginPath();
    for (var i = 0; i< 5; i++){
        context.moveTo(localX,localY);
        context.lineTo(localX + 500,localY);
        localY +=125;
        }

        context.stroke();

}

function drawleftWalls(){
    var localX = startX;
    var localY = startY;
    context.beginPath();
    for (var i = 0; i< 5; i++){
        context.moveTo(localX,localY);
        context.lineTo(localX,localY+500);
        localX+=125;
    }
    context.stroke();
}

function addScoreBox(){
    context.beginPath();
    context.rect(0,0,800,800);
    context.stroke();
}

class Box{
    constructor(rowNum, colNum,value,x,y){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.value = value;
        this.x = x;
        this.y = y;

    }

    setValue(value){
        this.value = value;
        if(value == ""){
            isEmpty[this.rowNum][this.colNum] = true;
        }
        else{
            isEmpty[this.rowNum][this.colNum] = false;

        }
    }

}
function insertNum(x,y,num){
    context.fillStyle = "black";
    
    if(num < 10){  
        context.font = '48px Tahoma';
        context.fillText(num, x,y);
    }else if(num >10 && num <100){
        context.font = '48px Tahoma ';
        context.fillText(num, x - 10,y);

    }else if(num >100 && num <1000){
        context.font = '38px Tahoma ';
        context.fillText(num,x - 20,y);
    }
    else if(num > 1000 && num < 10000){
        context.font = '32px Tahoma ';
        context.fillText(num,x - 30,y-10);
    }
    else{
        context.font = '28px Tahoma ';
        context.fillText(num,x - 40,y);
    }

    
     
}

function insertBackGroudColor(x,y,num){
    context.fillStyle = "Chocolate"
    switch(num) {
        case "":
            context.fillStyle = "Bisque"
            break;
        case 2:
            context.fillStyle = "AliceBlue"; 
            break;
        case 4:
            context.fillStyle = "Aqua"; 
            break;
        case 8:
            context.fillStyle = "CadetBlue"; 
            break;
        case 16:
            context.fillStyle = "OliveDrab"; 
            break;
        case 32:
            context.fillStyle = "BurlyWood"; 
            break;
        case 64:
            context.fillStyle = "LightSlateGray"; 
            break;
        case 128:
            context.fillStyle = "DarkSalmon"; 
            break;
        case 256:
            context.fillStyle = "DarkKhaki"; 
            break;
        case 512:
            context.fillStyle = "DarkSeaGreen"; 
            break;
        case 1024:
            context.fillStyle = "DeepPink"; 
            break;
        case 2048:
            context.fillStyle = "DarkViolet"; 
            break;
        case 4096:
            context.fillStyle = "HotPink"; 
            break;
        case 8192:
            context.fillStyle = "Lavender"; 
            break;


    }
    context.fillRect(x-45,y-75,120,120);
}


function insertEmptyCells(){
    var x = 0;
    var firstX = startX + 50;
    var firstY = startY + 80;
    for(var i =0; i<4; i++){
        for (var j =0; j<4; j++){
            CellArray[i].push(new Box(i,j,"",firstX,firstY));
            firstX +=125;
        }
        firstX = startX + 50;
        firstY = firstY + 125;
    }
}


document.onkeydown = function (event) {
    switch (event.keyCode) {
       case 37:
          console.log("Left key is pressed.");
          moveLeft();
          break;
       case 38:
          console.log("Up key is pressed.");
          moveUp();
          break;
       case 39:
          console.log("Right key is pressed.");
          moveRight();
          break;
       case 40:
          console.log("Down key is pressed.");
          moveDown();
          break;
    }
 };

 function generate(){
    if(isOver()){
        window.alert("Game Over");
        location.reload();
    }
        var i = Math.floor(Math.random() *4);
        var j = Math.floor(Math.random() *4);
        if(isEmpty[i][j]){
            CellArray[i][j].setValue(2);
            insertNum(i,j,2);
        }
        else{
                generate();
            }
    }

 function isOver(){
     for(var i =0; i<isEmpty[0].length;i++){
         for(var j =0; j<isEmpty[0].length; j++){
             if(isEmpty[i][j])
                return false;
         }
     }
     return true;
 }


 function moveRight(){
    context.clearRect(0,0,canvas.width,canvas.height);
    draw();
    var bool = false;
    for(var i = 0; i <4; i++){
        var doMerge = true;
        for (var j = 2;j >=0; j--)
        {   
            var x = j;
            if(CellArray[i][j] != null && CellArray[i][j].value !=""){
                while(CellArray[i][x+1] != null && CellArray[i][x+1].value == ""){
                    CellArray[i][x+1].setValue(CellArray[i][x].value);
                    CellArray[i][x].setValue("");
                    x++;
                    bool = true;
                }
                if(CellArray[i][x+1] != null && doMerge){
                    if(CellArray[i][x].value == CellArray[i][x+1].value){
                        CellArray[i][x+1].setValue(CellArray[i][x].value *2);
                        score += CellArray[i][x].value *2;
                        CellArray[i][x].setValue("");
                        doMerge = false;
                        bool = true;

                    }
                }
            }
        }
    }
     if(isOver()){
       window.alert("Game Over");
       location.reload(); 
       }
    if(bool)
        generate();
     
     displayValues();

}


function moveLeft(){
    context.clearRect(0,0,canvas.width,canvas.height);
     draw();
     var bool = false;
     for(var i =0; i<4;i++){
        var doMerge = true;
        for(var j =1; j<4;j++){
            var x = j;
            if(CellArray[i][j] != null && CellArray[i][j].value !=""){
                while(CellArray[i][x-1] != null && CellArray[i][x-1].value == ""){
                    CellArray[i][x-1].setValue(CellArray[i][x].value);
                    CellArray[i][x].setValue("");
                    x--;
                    bool = true;
                }
                if(CellArray[i][x-1] != null && doMerge){
                    if(CellArray[i][x].value == CellArray[i][x-1].value){
                        score += CellArray[i][x].value *2;
                        CellArray[i][x-1].setValue(CellArray[i][x].value * 2);
                        CellArray[i][x].setValue("");
                        doMerge = false;
                        bool = true;
                    }
                }
            }

        }
    }
    if(isOver()){
        window.alert("Game Over");
        location.reload(); 
    }
    if(bool)
         generate();
     displayValues();

 }

function moveUp(){
    context.clearRect(0,0,canvas.width,canvas.height);
    var bool = false;
     draw();
     for(var i = 0; i <CellArray[0].length  ; i++){
        var doMerge = true;
         for(j = 1; j<CellArray[0].length ; j++){
             var x = j;
             if(CellArray[j][i] !=null && CellArray[j][i].value != ""){
                 while(x >0 && CellArray[x-1][i] != null && CellArray[x-1][i].value == ""){
                     CellArray[x-1][i].setValue(CellArray[x][i].value);
                     CellArray[x][i].setValue("");
                     x--;
                     bool = true;
                 }

                 if(x>0 && CellArray[x-1][i] !=null && doMerge){
                     if(CellArray[x][i].value == CellArray[x-1][i].value){
                        score += CellArray[x][i].value *2;
                        CellArray[x-1][i].setValue(CellArray[x][i].value *2);
                        CellArray[x][i].setValue("");
                        doMerge = false;
                        bool = true;
                     }
                 }
             }
         }
     }
    if(isOver()){
        window.alert("Game Over");
        location.reload(); 
    }
    if(bool)
        generate();
     displayValues();

 }

function moveDown(){
    context.clearRect(0,0,canvas.width,canvas.height);
     draw();
     var bool = false;
     for(var i = 0; i <CellArray[0].length  ; i++){
        var doMerge = true;
         for(j = CellArray[0].length -1; j>=0 ; j--){
             var x = j;
             if(CellArray[j][i] !=null && CellArray[j][i].value != ""){
                 while(x <3 && CellArray[x+1][i] != null && CellArray[x+1][i].value == ""){
                     CellArray[x+1][i].setValue(CellArray[x][i].value);
                     CellArray[x][i].setValue("");
                     x++
                     bool = true;
                 }

                 if(x<3 && CellArray[x+1][i] !=null && doMerge){
                     if(CellArray[x][i].value == CellArray[x+1][i].value){
                        score += CellArray[x][i].value *2;
                        CellArray[x+1][i].setValue(CellArray[x][i].value *2);
                        CellArray[x][i].setValue("");
                        doMerge = false;
                        bool = true;
                     }
                 }
             }
         }
     }
    if(isOver()){
        window.alert("Game Over");
        location.reload(); 
    }
    if(bool)
         generate();
     displayValues();
 }



 function displayValues(){
     console.log(score);
    for(var i = 0; i<CellArray[0].length;i++){
        for(var j = 0; j<CellArray[0].length; j++){
            if (first2048 &&  CellArray[i][j].value == 2048){
                window.alert("Congratulations you have reached 2048! you can contiue further now");
                first2048 = false;
            }
            insertBackGroudColor(CellArray[i][j].x,CellArray[i][j].y,CellArray[i][j].value)
            insertNum(CellArray[i][j].x,CellArray[i][j].y,CellArray[i][j].value);
             
        }
    }
}




