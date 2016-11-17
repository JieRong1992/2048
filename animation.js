
function showNumber(i,j,number){
    var numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css("background-color", getBackgroundColor(number));
    numberCell.css("color", getColor(number));
    numberCell.text(number);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i),
        left:getPosLeft(j)
    },50);
}

function showMove(fromx, fromy,tox,toy){
    var numberCell=$("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox),
        left:getPosLeft(toy)
    },200);
}