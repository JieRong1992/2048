
var board = [];
var score= 0;

$(document).ready(function(){
    newGame();
});

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
            box.css("top",getPosTop(i,j));
            box.css("left",getPosLeft(i,j));
        }
    }
    for (var i = 0; i<4;i++){
        board[i]=[];
        for (var j=0;j<4;j++){
            board[i][j]=0
        }
    }
    updateBoard();
}


/*update numbers in the board
* if a number grid has a number > 0, show grid with the number
* if not, the number grid becomes a point and is placed in the center of its background grid
 */
function updateBoard(){
    $(".number-cell").remove();
    for (var i = 0; i<4;i++){
        for (var j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var numbercell=$("#number-cell-"+i+"-"+j);
            if(board[i][j]==0){
                numbercell.css('width','0px');
                numbercell.css('height','0px');
                numbercell.css('top',getPosTop(i,j)+50);
                numbercell.css('left',getPosLeft(i,j)+50);
            }
            else{
                numbercell.css('width', '100px');
                numbercell.css('height', '100px');
                numbercell.css('top', getPosTop(i,j));
                numbercell.css('left', getPosLeft(i,j));
                numbercell.css('background-color', getBackgroundColor(board[i][j]));
                numbercell.css('color', getColor(board[i][j]));
                numbercell.text(board[i][j]);
            }
            }
        }
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
    while (true){
        if(board[x][y]==0){
            break;
        }else{
            var x = parseInt(Math.floor(Math.random()*4));
            var y = parseInt(Math.floor(Math.random()*4));
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
           if(canMoveLeft(board)){
               moveLeft(board);
               setTimeout("genOneNumber()",200);
               isGameOver();
           }
           break;
       case 38://up
           if(canMoveUp(board)){
               moveUp(board);
               setTimeout("genOneNumber()",200);
               isGameOver();
           }
           break;
       case 39://right
           if(canMoveRight(board)){
               moveRight(board);
               setTimeout("genOneNumber()",200);
               isGameOver();
           }
           break;
       case 40://down
           if(canMoveDown(board)){
               moveDown(board);
               setTimeout("genOneNumber()",200);
               isGameOver();
           }
           break;
       default:
           break;
   }
});

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
                    }else if( board[i][k]==board[i][j] && noBlockH(i,k,j,board)){
                        //move
                        showMove(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
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
                    }else if( board[i][k]==board[i][j] && noBlockH(i,j,k,board)){
                        //move
                        showMove(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
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
                    }else if( board[k][j]==board[i][j] && noBlockV(j,k,i,board)){
                        //move
                        showMove(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
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
                    }else if( board[k][j]==board[i][j] && noBlockV(j,i,k,board)){
                        //move
                        showMove(i,j,k,j);
                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                    }
                }
            }

        }
    }
    setTimeout("updateBoard()",200);

}

