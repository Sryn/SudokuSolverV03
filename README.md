# SudokuSolverV03
Sudoku Solver v03 using HTML, CSS and JavaScript

Page at https://sryn.github.io/SudokuSolverV03/

Commit History Comments:

* June 7, 2017
-- Implemented arrays and stacks to track changes
-- prev and next buttons not implemented yet

* Jan 9, 2017
-- Showing 'Commit History Comments' in this README.md

* Dec 29, 2016
-- Update README.md

* Nov 30, 2016
-- Changed function name
-- resetBoolArray to initialiseArray

* Nov 29, 2016
-- Changed the grey scheme

* Nov 28, 2016
-- Changed background-color programmatically
-- With lesser options available to a cell, its background-color becomes
greyer.

* Nov 28, 2016
-- Moved index.html up to make it work with GitHub Pages

* Nov 25, 2016
-- Changed what a cell shows when it reverts back to '_'
-- Currently am thinking of the solution and how to code the solution to do
the solving.

* Nov 24, 2016
-- Made decisions on what happens to the user changed cell selectOptions
-- Completed until I can see, in the arrays, the cells that has only one
option. :)

* Nov 24, 2016
-- Finished update DOM with new selectOptions.
-- However, the current gridPos selectOptions got 'updated' as well. Now I have to think and decide what happens to the current gridPos selectOptions, keeping in mind any undo and/or redo.

* Nov 23, 2016
-- Just before updating DOM with new selectOptions

* Nov 23, 2016
-- After bug squashing.

* Nov 22, 2016
-- With run time error: After skeleton to update DOM at changed select.

* Nov 22, 2016
-- Consolidated the spreadsheets
-- Moved the sheets in Workbook1.xlsx into grid81.xlsx and deleted the
former.

* Nov 21, 2016
-- After getting an array of gridPos-es affected by a change in any cell @
-- the updateRelatedCellsValues function.

* Nov 21, 2016
-- Merge remote-tracking branch 'origin/master'

* Nov 21, 2016
-- Somehow, files were uncommitted.

* Nov 19, 2016
-- Coupled startup grid81 to table
-- Table startups with values in grid81.  After this, have to decide what
happens when user changes a cell value.

* Nov 18, 2016
-- Just about to translate grid81 to zyzx or arrayPos

* Nov 17, 2016
-- Up to showArrayValues but arrays not coupled to table values yet

* Nov 17, 2016
-- Second Commit

* Nov 17, 2016
-- First Commit
-- Let's see if this works.

* Nov 17, 2016
-- Initial commit
