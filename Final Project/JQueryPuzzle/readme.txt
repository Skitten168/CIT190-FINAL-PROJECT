Sam Kittendorf 
CIT 190 - Final Project_Puzzle Gane

This is a picture puzzle game.  

***Game Play***

The user can select from an image 
on the puzzle game acordian panel interface and click the link to 
open the puzzle. 
Once the user clicks 'Solve This Puzzle' on any of the links it 
will navigate to the puzzle page.

Once on the page the user will click the start button and the picture 
will scramble into 16 draggable pieces.
The user then drags the pieces to the droppable squares in the proper 
order to solve the puzzle.

If the user gets the puzzle right a 'Great Job' message will appear.

If the user places all the pieces but the order is incorrect the user 
will get a 'Not quite right. Try again' message.  At which point the 
user will click reset and start over.

***Current issues***


I would like to figure out how to allow the user to move puzzle pieces 
back to the 'pieces container' so they do not have to restart the puzzle 
from the beginning each time.  This will involve more jquery class changes 
to make the pieces movable in various states as well as making the 'pieces 
container'  a droppable area.

I was also not able to highlight the droppable box in which the piece will 
be placed. I will continue to work with the jquery dropppable widgets to 
attempt to debug this.