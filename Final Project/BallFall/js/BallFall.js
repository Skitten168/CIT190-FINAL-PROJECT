var startButton = document.getElementById("Start")
startButton.addEventListener("click", function(){
var ball = document.getElementById("ball");//player variable
var gameBoard = document.getElementById("gameBoard");
var interval;//player position variable
var twoDirection = 0;//varaible to check that user is not trying to move left and right at the same time
var counter = 0;
var currentBarriers = [];

function leftMove(){
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left>0){  //keeping the player in the board
        ball.style.left = left - 2 + "px";
    }
  }
function rightMove() {
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left<380){  //keeping the player in the board
        ball.style.left = left + 2 + "px";
        console.log(rng);
  }
}
document.addEventListener("keydown", event => {
    if(twoDirection==0){
        twoDirection++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(leftMove, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(rightMove, 1);
        } 
    }
});
document.addEventListener("keyup", event =>{
    clearInterval(interval);
    twoDirection=0;
    console.log(twoDirection); 
});  
var barriers = setInterval(function(){
    var barrierLast = document.getElementById("barrier"+(counter-1));
    var gapLast = document.getElementById("gap"+(counter-1));
    if(counter>0){
        var barrierLastTop = parseInt(window.getComputedStyle(barrierLast).getPropertyValue("top"));
        var gapLastTop = parseInt(window.getComputedStyle(gapLast).getPropertyValue("top"));
        }
    if(barrierLastTop<400 || counter==0){
        var barrier = document.createElement("div");
        var gap = document.createElement("div");
        barrier.setAttribute("class", "barrier");
        gap.setAttribute("class", "gap");
        barrier.setAttribute("id", "barrier"+counter);
        gap.setAttribute("id", "gap"+counter);
        barrier.style.top = barrierLastTop + 100 +"px";
        gap.style.top = gapLastTop + 100 +"px";
        var rng = Math.floor(Math.random()*360);
        gap.style.left = rng + "px"; 
        gameBoard.appendChild(barrier);
        gameBoard.appendChild(gap);
        currentBarriers.push(counter);
        counter++;
        console.log(counter);
    }
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var drop = 0;
    if(ballTop <=0){
        alert("Game Over! Click 'OK' to play again. Score: " +(counter-9));
        clearInterval(barriers);
        location.reload();
    }
    for(var i = 0; i < currentBarriers.length; i++){
        let current = currentBarriers[i];
        let iBarrier = document.getElementById("barrier"+current);
        let iGap = document.getElementById("gap"+current);
        let iBarrierTop = parseFloat(window.getComputedStyle(iBarrier).getPropertyValue("top"));
        let iGapLeft = parseFloat(window.getComputedStyle(iGap).getPropertyValue("left"))
        iBarrier.style.top = iBarrierTop - 0.5 + "px";
        iGap.style.top = iBarrierTop - 0.5 + "px";
        if(iBarrierTop < -20){
            currentBarriers.shift();
            iBarrier.remove();
            iGap.remove();
        }
        if(iBarrierTop-20<ballTop && iBarrierTop>ballTop){
            drop++;
            if(iGapLeft<=ballLeft && iGapLeft+20>=ballLeft){
                drop =0;
            }
        }
    }
    if(drop==0){
        if(ballTop < 480){
        ball.style.top = ballTop + 2 + "px";
        }
    }   
        else{
                ball.style.top = ballTop - 0.5 + "px";
        }
},1);
});
