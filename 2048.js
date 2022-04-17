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
     context.fillStyle = "black";
     context.font = '48px Ariel';
     context.fillText(num, x,y);
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

    if(isNotOver()){
        var i = Math.floor(Math.random() *4);
        var j = Math.floor(Math.random() *4);
        console.log(i,j);
        console.log(isEmpty[i][j]);

        if(isEmpty[i][j]){
            CellArray[i][j].setValue(2);
            insertNum(i,j,2);
        }
        else{
                generate();
            }
        }else{
            window.alert("Game Over");
            location.reload();
        }
   

    }


 function isNotOver(){
     for(var i =0; i<isEmpty[0].length;i++){
         for(var j =0; j<isEmpty[0].length; j++){
             if(isEmpty[i][j])
                return true;
         }
     }
     return false;
 }

 function moveRight(){
     context.clearRect(0,0,canvas.width,canvas.height);
     var bool = false;
     draw();
    // for(var i =0; i<CellArray[0].length;i++){
    //     for(var j =0; j<CellArray[0].length-1;j++){
    //         if(CellArray[i][j].value != ""){
    //             if(CellArray[i][j+1].value == CellArray[i][j].value){
    //                 bool = true;
    //                 CellArray[i][j+1].setValue(CellArray[i][j].value * 2);
    //                 CellArray[i][j].setValue("");
    //             }else if(CellArray[i][j+1].value == ""){
    //                 bool = true;
    //                 CellArray[i][j+1].setValue(CellArray[i][j].value);
    //                 CellArray[i][j].setValue(""); 
    //             }
    //         }
    //     }
    // }
    var x =1;
        for (var i = 0; i<4; i++){
            for(var j = 2; j>=0; j--){
               // console.log(CellArray[i][j].value);
                if(CellArray[i][j].value != ""){
                    if(CellArray[i][j+1].value == ""){
                        bool = true;
                            CellArray[i][j+1].setValue(CellArray[i][j].value);
                            CellArray[i][j].setValue("");
                           
                        
                    }
                    else if(CellArray[i][j].value == CellArray[i][j+1].value){
                        bool = true;
                        
                            CellArray[i][j+1].setValue(CellArray[i][j].value * 2);
                            CellArray[i][j].setValue("");
                           
                        
                    }
                }
            }

        }
    console.log(CellArray);
    console.log(isEmpty);
    if(bool)
     generate();
    displayValues();

 }


 function moveLeft(){
    context.clearRect(0,0,canvas.width,canvas.height);
     draw();
     var bool = false;
     for(var i =CellArray[0].length-1; i>=0;i--){
        for(var j =CellArray[0].length; j>0;j--){
            if(CellArray[i][j] != null && CellArray[i][j].value != ""){
                if(CellArray[i][j-1].value == CellArray[i][j].value){
                    bool = true;
                    CellArray[i][j-1].setValue(CellArray[i][j].value * 2);
                    CellArray[i][j].setValue("");
                }else if(CellArray[i][j-1].value == ""){
                    bool = true;
                    CellArray[i][j-1].setValue(CellArray[i][j].value);
                    CellArray[i][j].setValue(""); 
                }
            }
        }
    }
    if(bool)
         generate();
     displayValues();

 }

 function moveUp(){
    context.clearRect(0,0,canvas.width,canvas.height);
    var bool = false;
     draw();
     for(var i =1; i<CellArray[0].length;i++){
        for(var j =0; j<CellArray[0].length;j++){
            if(CellArray[i][j] != null && CellArray[i][j].value != ""){
                if(CellArray[i-1][j].value == CellArray[i][j].value){
                    bool = true;
                    CellArray[i-1][j].setValue(CellArray[i][j].value * 2);
                    CellArray[i][j].setValue("");
                }else if(CellArray[i][j] != null && CellArray[i-1][j].value == ""){
                    bool = true;
                    CellArray[i-1][j].setValue(CellArray[i][j].value);
                    CellArray[i][j].setValue(""); 
                }
            }
        }
    }
    if(bool)
        generate();
     displayValues();

 }

 function moveDown(){
    context.clearRect(0,0,canvas.width,canvas.height);
     draw();
     var bool = false;
     console.log(CellArray[0].length);
     for(var i =CellArray[0].length-2; i>=0;i--){
        for(var j =CellArray[0].length-1; j>=0;j--){
            if( CellArray[i][j].value != ""){
                if(CellArray[i+1][j].value == CellArray[i][j].value){
                    bool = true;
                    CellArray[i+1][j].setValue(CellArray[i][j].value * 2);
                    CellArray[i][j].setValue("");
                }else if(CellArray[i+1][j].value == ""){
                    bool = true;
                    CellArray[i+1][j].setValue(CellArray[i][j].value);
                    CellArray[i][j].setValue(""); 
                }
            }
        }
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




