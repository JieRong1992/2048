2048
====
## jierong.me/2048

用 JavaScript, JQuery, HTML/CSS3 实现的 2048 游戏。搭建过程分为三大部分：

1. 用户界面的搭建
2. 游戏逻辑的实现
3. 交互设计和自适应设计

下面简单说一下每一个部分的实现思路。

##用户界面的搭建

先在背景层构建4×4个背景格子，再在背景层上边叠加4×4个数字格子用来存储产生的数字（用两组格子是为了能够创建格子移动的动画）。

创建一个二维数组borad，每个borad[i][j]的值对应一个数字格子。如果数字大于零，则显示该位置的数字格子，否则则隐藏。

##游戏逻辑的实现
基本流程为：
用户操作 ——> 移动格子——> 更新格子上的数字——> 产生新格子——> 判断是否结束  循环往复，直到游戏结束

####用户操作

    用 $(document).keydown(function(event){}) 监听上下左右四个键

####移动格子
上下左右四个方向的逻辑基本一致，所以只以向左为例：

 · 用一个双层循环依次把每一行的数字向左移
 
 · 对于每一行，最左边的数不需要往左移，所以从第二个数开始到最右边的数，依次判断它们是否能向左移
 
 · 判断数字能否向左移的方法是：如果目标位置为空，且到目标位置的路径中没有障碍，则移动数字；或者目标位置的数值与待移数字相等，且路径中没有障碍，移动数字并合并数值

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


####更新数字
根据二维数组board中存储的数据，更新数字格子
    
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

####产生新格子
随机生成数字2或者4，在随机生成一个位置，如果该位置上的原数值为0， 则在这个位置上显示新生成的数字

####判断结束
如果二维数组board的每个值都不为零，且不能再往上下左右任意方向移动，则游戏结束

     function isGameOver(){
     if(noSpace(board) && noMove(board)){
         gameOver();
     }
    }

##交互设计和自适应设计
为了使游戏适应手机屏幕，所以把参数设为百分比
同时加了触屏控制

    document.addEventListener('touchstart', function(event){})
    document.addEventListener('touchend', function(event){}）

##遇到的问题

####224问题

当用上述方法移动数字是， 如果行内的数如2240这样，前两个数字相等，合并之后的和和后一个数相等，则会合并两次，在此例中变为8000，而原版游戏中每个位置只会合并一次，变为4400。

解决方法是建一个hash table， 记录每一个格子中的数是否合并过，如果已经合并过，则不再合并也不能用到该位置。

#### 触屏功能出现点击新游戏时生成三个数的问题
原因是程序把点击也当做了滑动

解决方法是判断手指移动的距离，如果距离过小，则不执行移动

####自适应后在大的显示屏上游戏显示过大的问题

解决方法是加一个判断，当屏幕大于一定值时，用默认尺寸

####数值变大后超出边界的问题

解决方法是每次产生新数（合并时或生成新数时）加一次判断，如果超过四位数则缩小字号。
加这个css时出现了问题，因为需要在刷新数值时根据屏幕大小和数值大小得到相应的数字大小，所以就先把css加到了更新数字格子的function里。但是在生成新数字的时候是没有更新数字格子的，所以新生成的数字大小没有得到值。


