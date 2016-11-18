
var board = [];
var score= 0;
var hasConflicted=[];
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function(){
    prepareForMobile();
    newGame();
});

function prepareForMobile(){
    if(docWidth>500){
        gridContainerWidth=500;
        cellSpace =20;
        cellSideLength=100;
    }
    $("#grid-container").css("width", gridContainerWidth-2*cellSpace);
    $("#grid-container").css("height", gridContainerWidth-2*cellSpace);
    $("#grid-container").css("padding", cellSpace);
    $("#grid-container").css("border-radius", 0.02*gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.06*cellSideLength);

}

function newGame(){
    init();
    //get two random number when new game begins
    genOneNumber();
    genOneNumber();
}

/*set background grids with their ids
* all numbers are sets to zero
 */
function init(){
    for (var i = 0; i<4;i++){
        for (var j = 0;j<4;j++){
            var box = $("#grid-cell-"+i+"-"+j);
            box.css("top",getPosTop(i));
            box.css("left",getPosLeft(j));
        }
    }
    for (var i = 0; i<4;i++){
        board[i]=[];
        hasConflicted[i]=[];
        for (var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoard();
    score = 0;
}


/*update numbers in the board
* if a number grid has a number > 0, show grid with the number
* if not, the number grid becomes a point and is placed in the center of its background grid
 */
function updateBoard() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numbercell = $("#number-cell-" + i + "-" + j);
            if (board[i][j] == 0) {
                numbercell.css('width', '0px');
                numbercell.css('height', '0px');
                numbercell.css('top', getPosTop(i) + cellSideLength / 2);
                numbercell.css('left', getPosLeft(j) + cellSideLength / 2);
            }
            else {
                numbercell.css('width', cellSideLength);
                numbercell.css('height', cellSideLength);
                numbercell.css('top', getPosTop(i));
                numbercell.css('left', getPosLeft(j));
                numbercell.css('background-color', getBackgroundColor(board[i][j]));
                numbercell.css('color', getColor(board[i][j]));
                numbercell.text(board[i][j]);
                numbercell.css('font-size',changeFontSize(board[i][j]));
            }
            hasConflicted[i][j] = false;

        }
    }
    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('border-radius', 0.06 * cellSideLength + 'px');
}

/*
generate a new number 
 */
function genOneNumber(){

    if(noSpace(board)){
        return false;
    }
    //get a random position
    var x = parseInt(Math.floor(Math.random()*4));
    var y = parseInt(Math.floor(Math.random()*4));
    var times = 0;
    while (times < 50){
        if(board[x][y]==0){
            break;
        }else{
            var x = parseInt(Math.floor(Math.random()*4));
            var y = parseInt(Math.floor(Math.random()*4));
        }
        times++;
    }
    if (times==50){
        for (var i = 0; i<4;i++) {
            for (var j = 0; j < 4; j++) {
                if(board[i][j]==0){
                    x = i;
                    y = j;
                }
            }
         }
    }

    //generate a new number in [2,4]
    var randnum =Math.random()<0.5? 2:4;
    board[x][y]=randnum;

    // show number
    showNumber(x,y,randnum);
    return true;
}


$(document).keydown(function(event){
   switch(event.keyCode) {
       case 37://left
           event.preventDefault();
           if(canMoveLeft(board)){
               moveLeft(board);
               setTimeout("genOneNumber()",200);
               setTimeout("isGameOver()",300);
           }
           break;
       case 38://up
           event.preventDefault();
           if(canMoveUp(board)){
               moveUp(board);
               setTimeout("genOneNumber()",200);
               setTimeout("isGameOver()",300);
           }
           break;
       case 39://right
           event.preventDefault();
           if(canMoveRight(board)){
               moveRight(board);
               setTimeout("genOneNumber()",200);
               setTimeout("isGameOver()",300);
           }
           break;
       case 40://down
           event.preventDefault();
           if(canMoveDown(board)){
               moveDown(board);
               setTimeout("genOneNumber()",200);
               setTimeout("isGameOver()",300);
           }
           break;
       default:
           break;
   }
});

document.addEventListener('touchstart', function(event){
        startx = event.touches[0].pageX;
        starty = event.touches[0].pageY;
});

document.addEventListener('touchsmove', function(event){
    event.preventDefault();
});

document.addEventListener('touchend', function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

        var deltax =endx-startx;
        var deltay =endy-starty;

    if(Math.abs(deltax)<0.3 * docWidth && Math.abs(deltay)<0.3 * docWidth){
        return;
    }


        if(Math.abs(deltax)>=Math.abs(deltay)){
            if(deltax>0){
                //move right
                if(canMoveRight(board)){
                    moveRight(board);
                    setTimeout("genOneNumber()",200);
                    setTimeout("isGameOver()",300);
                }
            }else{
                //move left
                if(canMoveLeft(board)){
                    moveLeft(board);
                    setTimeout("genOneNumber()",200);
                    setTimeout("isGameOver()",300);
                }
            }
        } else{
            if(deltay>0){
                //move down
                if(canMoveDown(board)){
                    moveDown(board);
                    setTimeout("genOneNumber()",200);
                    setTimeout("isGameOver()",300);
                }
            }else{
                //move up
                if(canMoveUp(board)){
                    moveUp(board);
                    setTimeout("genOneNumber()",200);
                    setTimeout("isGameOver()",300);
                }
            }

        }


    }
);


function moveLeft(board){
    for(var i = 0; i<4;i++){
        for(var j = 1; j<4; j++){

            if (board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlockH(i,k,j,board)){
                        //move
                        showMove(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        break;
                    }else if( !hasConflicted[i][k] && board[i][k]==board[i][j] && noBlockH(i,k,j,board)){
                        //move
                        showMove(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        
                        // score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        break;
                    }
                }
            }

        }
    }
    setTimeout("updateBoard()",200);
}

function moveRight(board){
    for(var i = 0; i < 4;i++){
        for(var j = 2; j>=0; j--){
            if (board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockH(i,j,k,board)){
                        //move
                        showMove(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j]= 0;
                        break
                    }else if(!hasConflicted[i][k]&& board[i][k]==board[i][j] && noBlockH(i,j,k,board)){
                        //move
                        showMove(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // score
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][k]=true;
                        break;
                    }
                }
            }

        }
    }
    setTimeout("updateBoard()",200);
}




function moveUp(board){
    for(var j=0 ; j<4;j++){
        for(var i = 1; i<4; i++){
            if (board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockV(j,k,i,board)){
                        //move
                        showMove(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        // score
                        score+=board[k][j];
                        updateScore(score);
                        break;
                    }else if(!hasConflicted[k][j] && board[k][j]==board[i][j] && noBlockV(j,k,i,board)){
                        //move
                        showMove(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        // score
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }

        }
    }
    setTimeout("updateBoard()",200);
}

function moveDown(){
    for(var j = 0; j<4;j++){
        for(var i = 2; i>=0; i--){
            if (board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0 && noBlockV(j,i,k,board)){
                        //move
                        showMove(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        break;
                    }else if( !hasConflicted[k][j] && board[k][j]==board[i][j] && noBlockV(j,i,k,board)){
                        //move
                        showMove(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        // score
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        break;
                    }
                }
            }

        }
    }
    setTimeout("updateBoard()",200);

}
 function isGameOver(){
     if(noSpace(board) && noMove(board)){
         gameOver();
     }
 }
function gameOver(){
    alert("Your score is "+score);
}

