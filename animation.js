/*used to display new random number
*@param i,j the row and column of the number
* @param number the number to be shown
 */
function showNumber(i,j,number){
    var numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css("background-color", getBackgroundColor(number));
    numberCell.css("color", getColor(number));
    numberCell.css('font-size',changeFontSize(number));
    numberCell.text(number);
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i),
        left:getPosLeft(j)
    },50);
}

/*used to show moving animation when moving grids to the left,right,up and down
*@param fromx, formy: the original position of the grid
* @param  tox, toy: the target position of the grid
*/

function showMove(fromx, fromy, tox, toy){
    var numberCell=$("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox),
        left:getPosLeft(toy)
    },200);
}

function updateScore(score){
    $("#score").text(score);
}