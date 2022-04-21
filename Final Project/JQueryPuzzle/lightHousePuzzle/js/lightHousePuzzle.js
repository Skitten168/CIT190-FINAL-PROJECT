$(document).ready(function () {
    var pieces = createPieces(true);//breaking uo the pieces and placing them randomly in the piecesContainer
    $("#puzzleContainer").html(pieces);
    $("#btnStart").click(function(){
        var pieces = $("#puzzleContainer div");
        pieces.each(function(){
            //Using math function to correctly position the pieces in the box when the game is started
            var leftPosition = Math.floor(Math.random()*295) + "px"; 
            var topPosition = Math.floor(Math.random()*295) + "px"; 
            $(this).addClass("draggablePiece")
                .css({
                position:"absolute",
                left:leftPosition,
                top:topPosition
            })
            $ ("#piecesContainer").append($(this));
        });
        //clearing the board but keeping the grid spots 
        var emptyString=createPieces(false);
        $("#puzzleContainer").html(emptyString);
        $(this).hide();//Hide start button after start button click
        $("#btnReset").show()//show reset button after start button click
        enableDrag()
    });
    $("#btnReset").click(function(){
        var newPieces = createPieces(true);
        $("#puzzleContainer").html(newPieces);
        $(this).hide();
        $("#btnStart").show();
        $("#piecesContainer").empty();
    });
    function createPieces(withImage)
    {
    var rows = 4, columns = 4;
    var pieces ="";
            for(var r=0,top=0,order=0;r<rows;r++,top-=100)//creating rows
            {
                for(var c=0,left=0; c<columns; c++,left-=100,order++)//creating columns
                {
                    if(withImage)
                    {
                    pieces += "<div style='background-position:" 
                    + left + "px " + top + "px;' class='piece' data-order=" + order + "></div>";
                    }
                    else
                    {
                        pieces += "<div style='background-image:none;'class='piece dropSpace'></div>";
                    }
                }
            }
        return pieces;
    }
    function checkSolution()
    {  
        console.log($("#puzzleContainer .droppedPiece"));
        if($("#puzzleContainer .droppedPiece").length !=16)//make sure all pieces have been placed before running check
        {
            return false
        }
        console.log("test1");
        for(var k=0;k<16;k++)//loop to check order of pieces is correct
        {
            var item = $("#puzzleContainer .droppedPiece:eq(" + k + ")");
            var order = item.data("order");
            if(k != order)
            {
                $("#piecesContainer").text("Not Quite Right, Try Again");//incorrect solution
                return false;
            }
        }
        $("#piecesContainer").text("Great Job!");//correct solution
        return true;
    }
   function enableDrag() //creating function to call to make pieces draggable and spaces dropable with jquery 
   {
    $(".draggablePiece").draggable({
        revert:"invalid",
        start:function(){
            if($(this).hasClass("droppedPiece"))
            {
                $(this).removeClass("droppedPiece");
                $(this).parent().removeClass("piecePresent");
            }
        }
    });
    $(".dropSpace").droppable({
       //hoverClass:"ui-state-highlight",//attempt to use droppable highlight with hoverClass.  not functional yet
        accept:function(){
           return !$(this).hasClass("piecePresent")
        },
       drop:function(event,ui)
        {
            var draggableElement = ui.draggable;
            var droppedIn = $(this); 
            droppedIn.addClass("piecePresent");//adding a class to see if a piece is already in the droppable space
            $(draggableElement)
                .addClass("droppedPiece")
                //making sure the dropped piece positions within the droppable spot correctly
                .css({
                    top:0,
                    left:0,
                    position:"relative"
                    //adding the dropped pieces to the droppable spots
                }).appendTo(droppedIn);
                console.log("test2");
                console.log(droppedIn);
                checkSolution();
        }
    });
   }
}); 
