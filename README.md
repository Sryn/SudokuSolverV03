# SudokuSolverV03
Sudoku Solver v03 using HTML, CSS and JavaScript

Page at https://sryn.github.io/SudokuSolverV03/

Commit History Comments:

* July 10, 2017
	- Implemented a still broken algorithm to try other cells in a level>1 toSolveQueue, when a tried cell led to an blocked grid, instead of the current algorithm that would recursively retrace back to an earlier level>1 toSolveQueue branch, if available.


* July 7, 2017
	- Rearranged files
	- Made the Assets folder


* July 7, 2017
	- Cleared prevSteps upon resetGrid81
	- overlooked this step


* July 7, 2017
	- README.md updated


* July 6, 2017
	- Algorithm Working!
	- After multiple setbacks, I've got it working
	- Some rearranging & cleaning up of code
	- Some change of what to show in console.log
	- Introduced infinity or non-infinity solve loops
	- Change whether to show or not some popups
	- Rearranged some HTML
	- Hide the developer arrays
	- SeedTable and ResetTable buttons


* July 4, 2017
	- Implemented a runaway loop check and exit
	- Still debugging


* July 3, 2017
	- Show empty cells with no options
	- find, count and store respective index in array the empty cells with
no options


* July 3, 2017
	- It can solve for some random paths, but ...
	- need to look into the algorithm
	- might start over the algorithm


* June 30, 2017
	- Unfinished & broken stepBack algorithm
	- have to think about restarting search at level=1 after doing just one
cell in toSolveQueue
	- have to think about where to properly put the
‘if(window.optionsTaken.length() > 0)’ check. This should only happen
when we’re stuck at stillCellsWith_=true and those cell don’t have any
number options


* June 29, 2017
	- Almost to a solve2 solution
	- Implemented various functions to have automatic filling of cells with
one option or choose among options. This can lead down to an unsolvable
grid with cells with no valid options.
	- Need to implement a backtrack algorithm that retraces the chosen
steps and chooses another of the valid options in a cell with more than
one valid options. Must be able to retrace even deeper if a cell’s
valid options have all been tried.


* June 28, 2017
	- nextStepCount
	- move stepCount as prevStepCount
	- implement and show nextStepCount
	- if nextStep value is not zero, reset nextStack/nextStep to 0 if user
inputs a different value to the nextStep value.


* June 8, 2017
	- Finished Prev and Next Implementation
	- Prev and Next buttons work now


* June 7, 2017
	- prev & next
	- Implemented arrays and stacks to track changes
	- prev and next buttons not implemented yet


* Jan 9, 2017
	- Showing 'Commit History Comments' in this README.md


* Dec 29, 2016
	- Update README.md


* Nov 30, 2016
	- Changed function name
	- resetBoolArray to initialiseArray


* Nov 29, 2016
	- Changed the grey scheme


* Nov 28, 2016
	- Changed background-color programmatically
	- With lesser options available to a cell, its background-color becomes
greyer.


* Nov 28, 2016
	- Moved index.html up to make it work with GitHub Pages


* Nov 25, 2016
	- Changed what a cell shows when it reverts back to '_'
	- Currently am thinking of the solution and how to code the solution to do
the solving.


* Nov 24, 2016
	- Made decisions on what happens to the user changed cell selectOptions
	- Completed until I can see, in the arrays, the cells that has only one
option. :)


* Nov 24, 2016
	- Finished update DOM with new selectOptions.
	- However, the current gridPos selectOptions got 'updated' as well. Now I have to think and decide what happens to the current gridPos selectOptions, keeping in mind any undo and/or redo.


* Nov 23, 2016
	- Just before updating DOM with new selectOptions


* Nov 23, 2016
	- After bug squashing.


* Nov 22, 2016
	- With run time error: After skeleton to update DOM at changed select.


* Nov 22, 2016
	- Consolidated the spreadsheets
	- Moved the sheets in Workbook1.xlsx into grid81.xlsx and deleted the
former.


* Nov 21, 2016
	- After getting an array of gridPos-es affected by a change in any cell @
	- the updateRelatedCellsValues function.


* Nov 21, 2016
	- Merge remote-tracking branch 'origin/master'


* Nov 21, 2016
	- Somehow, files were uncommitted.


* Nov 19, 2016
	- Coupled startup grid81 to table
	- Table startups with values in grid81.  After this, have to decide what
happens when user changes a cell value.


* Nov 18, 2016
	- Just about to translate grid81 to zyzx or arrayPos


* Nov 17, 2016
	- Up to showArrayValues but arrays not coupled to table values yet


* Nov 17, 2016
	- Second Commit


* Nov 17, 2016
	- First Commit
	- Let's see if this works.


* Nov 17, 2016
	- Initial commit
