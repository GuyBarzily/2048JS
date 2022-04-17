let maze = document.querySelector(".Game2048");
let ctx = maze.getContext("2d");

let current;

class Maze{
    constructor(size,rows, colunms){
        this.size = size;
        this.rows = rows;
        this.colunms = colunms;
        this.grid = [];
        this.stack = [];
    }

    setUp(){
        for (let r = 0; r < this.rows; r++){
            let row = [];
            for(let c =0; c<this.colunms;c++){
                let cell = new Cell(r,c,this.grid,this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];
    }


    draw(){
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = "black";
        current.visited = true;

        for(let r = 0; r<this.rows; r++){
            for(let c = 0; c<this.colunms; c++){
                let grid = this.grid;
                grid[r][c].show(this.size,this.rows,this.colunms);
                grid[r][c].displayNum(this.size, this.rows, this.colunms,2);

            }
        }

        let next = current.checkNeighbours();

        if(next){
            next.visited = true;

            this.stack.push(current);

            //current.highLight(this.colunms);
            current.highLight2(this.colunms);

            current.removeWalls(current, next);

            current = next;
        }else if(this.stack.length > 0){
            let cell = this.stack.pop();
            current = cell;
            //current.highLight(this.colunms);
            current.highLight2(this.colunms);
        }
        if(this.stack.length == 0){
            return;
        }

        // window.requestAnimationFrame(()=>{
        //     this.draw();
        // })
    }
}

class Cell{
    constructor(rowNum, colNum, paraentGrid, parantSize){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.paraentGrid = paraentGrid;
        this.parantSize = parantSize;
        this.visited = false;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall : true,
        };
    }

    checkNeighbours(){
        let grid = this.paraentGrid;
        let row = this.rowNum;
        let col = this.colNum;
        let neighbours = [];

        let top = row !== 0 ? grid[row -1][col] : undefined;
        let right = col !== grid.length -1 ? grid[row][col + 1] : undefined;
        let botton = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
        let left = col !== 0 ? grid[row][col -1 ] : undefined;


        if(top && !top.visited) neighbours.push(top);
        if(right && !right.visited) neighbours.push(right);
        if(botton && !botton.visited) neighbours.push(botton);
        if(left && !left.visited) neighbours.push(left);

        if(neighbours.length !== 0){
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];

        }else{
            return undefined;
        }
    }
    
    drawTopWall(x,y,size,colunms,rows){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+size/colunms,y);
        ctx.stroke();
    }

    drawRightWall(x,y,size,colunms,rows){
        ctx.beginPath();
        ctx.moveTo(x + size/colunms,y);
        ctx.lineTo(x+size/colunms,y +size / rows);
        ctx.stroke();
    }

    drawBottonWall(x,y,size,colunms,rows){
        ctx.beginPath();
        ctx.moveTo(x, y+size/rows);
        ctx.lineTo(x+size/colunms,y +size / rows);
        ctx.stroke();
    }

    drawLeftnWall(x,y,size,colunms,rows){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size / rows);
        ctx.stroke();
    }

    highLight(colunms){
        let x = (this.colNum * this.parantSize) / colunms +1;
        let y = (this.rowNum * this.parantSize) / colunms +1;

        ctx.fillStyle = "purple";        
        ctx.fillRect(x,y, this.parantSize/colunms -3,this.parantSize /colunms -3);
    }
    highLight2(colunms){
        let x = (this.colNum * this.parantSize) / colunms +1;
        let y = (this.rowNum * this.parantSize) / colunms +1;

        ctx.fillStyle = "white";
        ctx.font = "100px Ariel";        
        ctx.fillText("hello", x, y);
    }

    removeWalls(cell1, cell2){
        let x = cell1.colNum - cell2.colNum;

        if(x == 1){
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        }else if(x == -1){
            cell2.walls.leftWall = false;
            cell1.walls.rightWall = false;
            
        }

        let y = cell1.rowNum - cell2.rowNum;

        if(y == 1){
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        }else if(y == -1){
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        }
        
    }

    show(size,rows,colunms){
        let x = (this.colNum * size ) / colunms;
        let y = (this.rowNum * size ) / rows;

        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;

        if(this.walls.topWall) this.drawTopWall(x,y,size,colunms,rows);
        if(this.walls.rightWall) this.drawRightWall(x,y,size,colunms,rows);
        if(this.walls.bottomWall) this.drawBottonWall(x,y,size,colunms,rows);
        if(this.walls.leftWall) this.drawLeftnWall(x,y,size,colunms,rows);
        if(this.visited){
            ctx.fillRect(x +1 , y+1,size/colunms - 2, size / rows -2);
        }
    }

    displayNum(size,rows, colunms,num){
        let x = (this.colNum * size ) / colunms;
        let y = (this.rowNum * size ) / rows;
        ctx.strokeStyle = "white";
        ctx.fillText(num, x, y);

    }

}

let newMaze = new Maze(500,4,4);
newMaze.setUp();
newMaze.draw();