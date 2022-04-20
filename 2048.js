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


function startGame(){
    myGameArea.start();

}

var myGameArea = {

    start : function(){
        ctx.width = 800;
        ctx.height = 800;
        document.body.insertBefore(ctx, document.body.childNodes[0]);
        draw();
        insertEmptyCells();
        generate();
        displayValues();
        //insertNum(startX + 50,startY + 80, 128);
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
    context.strokeStyle = 'gray';
    context.lineWidth = 8;
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
    
    if(num < 10){
        context.fillStyle = "maroon";
        context.font = '48px Tahoma ';
        context.fillText(num, x,y);
    }else if(num >10 && num <100){
        context.fillStyle = "maroon";
        context.font = '48px Tahoma ';
        context.fillText(num, x - 10,y);

    }else if(num >100 && num <1000){
        context.fillStyle = "fuchsia";
        context.font = '38px Tahoma ';
        context.fillText(num,x - 20,y);
    }
    else if(num > 1000 && num < 10000){
        context.fillStyle = "navy";
        context.font = '32px Tahoma ';
        context.fillText(num,x - 30,y-10);
    }
    else{
        context.fillStyle = "green";
        context.font = '28px Tahoma ';
        context.fillText(num,x - 40,y);
    }

    
     
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
    for(var i = 0; i<CellArray[0].length;i++){
        for(var j = 0; j<CellArray[0].length; j++){
             insertNum(CellArray[i][j].x,CellArray[i][j].y,CellArray[i][j].value);
        }
    }
}




