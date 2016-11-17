
var board = [];
var score= 0;

$(document).ready(function(){
    newGame();
});

function newGame(){
    init()
    //随机产生两个数的格子
    genOneNumber();
    genOneNumber();
}

//初始化
function init(){
    //安置背景格子
    for (var i = 0; i<4;i++){
        for (var j=0;j<4;j++){
            var box = $("#grid-cell-"+i+"-"+j);
            box.css("top",getPosTop(i));
            box.css("left",getPosLeft(j));
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


//显示格子
function updateBoard(){
    $(".number-cell").remove();
    for (var i = 0; i<4;i++){
        for (var j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var numbercell=$("#number-cell-"+i+"-"+j)
            if(board[i][j]==0){
                numbercell.css('width','0px');
                numbercell.css('height','0px');
                numbercell.css('top',getPosTop(i)+50);
                numbercell.css('left',getPosLeft(j)+50);
            }
            else{
                numbercell.css('width', '100px');
                numbercell.css('height', '100px');
                numbercell.css('top', getPosTop(i));
                numbercell.css('left', getPosLeft(j));
                numbercell.css('background-color', getBackgroundColor(board[i][j]));
                numbercell.css('color', getColor(board[i][j]));
                numbercell.text(board[i][j]);
            }
            }
        }
    }

function genOneNumber(){

    if(noSpace(board)){
        return false;
    }
    //生成一个位置
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

    //生成一个[2,4]的随机数
    var randnum =Math.random()<0.5? 2:4;
    board[x][y]=randnum;
    showNumber(x,y,randnum);
    return true;
}


$(document).keydown(function(event){
   switch(event.keyCode) {
       case 37://left
           if(canMoveLeft(board)){
               moveLeft(board);
               genOneNumber();
               isGameOver();
           }
           break;
       case 38://up
           if(canMoveUp()){
               moveUp();
               genOneNumber();
               isGameOver();
           }
       case 39://right
           if(canMoveRight()){
               moveRight();
               genOneNumber();
               isGameOver();
           }
       case 40://down
           if(canMoveDown()){
               moveDown();
               genOneNumber();
               isGameOver();
           }
       default:
           break;
   }
});


function moveLeft(board){
    for(var i = 0; i<4;i++){
        for(var j = 0; j<4; j++){

            if (board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0 && noBlockH(i,k,j,board)){
                        //move
                        showMove(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if( board[i][k]==board[i][j] && noBlockH(i,k,j,board)){
                        //move
                        showMove(i,j,i,k);
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                }
            }

        }
    }
    updateBoard();
}
function moveUp(){

}
function moveRight(){

}
function moveDown(){

}

