/**
 * js_source01.js - Sryn - 201611161624
 */

/* http://stackoverflow.com/questions/14643617/create-table-using-javascript */

function resetBoolArray(theArray, defaultBool) {
	var i;
	
	for (i = 0; i < theArray.length; i++) {
		theArray[i] = defaultBool;
	}	
}

function solve() {
	console.log('In solve()');
	
	var i, j,
		lvlOneIteration,
		boolArrayLvlDone = new Array(9),
		tempGrid = new Array(81);
		
	for (lvlOneIteration = 1; lvlOneIteration <= 9; lvlOneIteration++) {
		// for checking from only one option left to nine options left
		
		j = 0;
		resetBoolArray(boolArrayLvlDone, false);
		
		while (j < lvlOneIteration) {
			/* at every lvlOneIteration, check again recursively,
			 * if any cells have only one (j+1) option left,
			 * to one less than the current lvlOneIteration */
			while (stillExistCellsWithTheseNumOfOptionsInTempGrid(j+1, tempGrid)) {
				
			}
			
			j++;
		}
	}
}

function createArrays() {
	
	console.log('In createArrays()');
	
    var i, j, k;
    
	window.allArrays = new Array();
	
	/* j[0]=box, j[1]=row, j[2]=col */
	for (j=0; j<3; j++){
		window.allArrays[j] = new Array();
		
		for (i = 0; i < 9; i++) {
			window.allArrays[j][i] = new Array();
			for (k=0; k<9; k++){
				/* allArrays[What? 0:Box or 1:Row or 2:Col][Which? 0-8][1-9 Value & Position] */
				window.allArrays[j][i][k] = '_';
			}
		}		
	}
	
	createGrid81Array();
}

function getStartUpArrayOfDropDownOptions(){
    var i,
        ddlOptions = new Array(10);
    
    for (i=0; i<=9; i++) {
        if (i != 0) {
            ddlOptions[i] = i;
        } else {
            ddlOptions[i] = '_';
        }
    }
    
    return ddlOptions;
}

function createGrid81Array(){
	
	console.log('In createGrid81Array()');
	
	window.grid81 = new Array();
	
	var i;
	
	for (i=0; i<81; i++){
		var newCell = new Array();
		
		newCell[0] = translate_gridPos_2_arrayPos(i); /* arrayPos */
        newCell[1] = translate_arrayPos_2_zyzx(newCell[0]); /* zyzx */
        newCell[2] = '_'; /* current value */
        newCell[3] = false; /* select is disabled? */
//        newCell[3] = true; /* select is disabled? */
        newCell[4] = 'default'; /* style class */
        newCell[5] = getStartUpArrayOfDropDownOptions(); /* Start up Dropdown options */
		
		grid81[i] = newCell;
	}
}

function translate_gridPos_2_arrayPos(gridPos){
	
//	console.log('In translate_gridPos_2_arrayPos(gridPos='+gridPos+')');
	
	var arrayPos = new Array(),
        boxPos, rowPos, colPos;
	
	colPos = gridPos % 9;
    rowPos = (gridPos - colPos) / 9;
    boxPos = (Math.floor(rowPos / 3)) * 3 + ((gridPos - (gridPos % 3)) / 3) - (rowPos * 3);
    
    arrayPos[0] = boxPos;
    arrayPos[1] = rowPos;
    arrayPos[2] = colPos;
    
//	console.log(' arrayPos['+arrayPos+']');    
    
    return arrayPos;
}

function showGrid81Values(){
	
	console.log('In showGrid81Values()');
	
    var showWhere = document.getElementById("grid81Values"),
        h4label = document.createElement('h4'),
        i, j, aText, colonOrComma;
    
    for (i=0; i < window.grid81.length; i++) {
    	
    	if(i<10) {
    		aText = '_' + i.toString();
    	} else {
    		aText = i;
    	}
    	
        h4label.appendChild(document.createTextNode(aText));

        j = 0;
/* http://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized */
        while(typeof window.grid81[i][j] !== 'undefined') {
            switch(j) {
                case 0: colonOrComma = ': arrayPos['; break;
                case 1: colonOrComma = ']; zyzx['; break;
                case 2: colonOrComma = ']; '; break;
                case 5: colonOrComma = '; selectOptions['; break;
                default: colonOrComma = '; ';
            }
            h4label.appendChild(document.createTextNode(colonOrComma + window.grid81[i][j]));
            j++;
        }
        h4label.appendChild(document.createTextNode(']'));
        h4label.appendChild(document.createElement('br'));
    }
    
    showWhere.appendChild(h4label);
}

function showArrayValues(){

	console.log('In showArrayValues()');
	
	var showWhere = document.getElementById("arrayValues"),
		arrayTopLabel = ["Box", "Row", "Col"],
		shownText, h3Label, j;
	
	for (j=0; j<3; j++){ /* What? 0:box, 1:row or 2:col */
		h3Label = document.createElement('h3');
//		h3Label.innerHTML = arrayTopLabel[j];
		h3Label.appendChild(document.createTextNode(arrayTopLabel[j]));
		showWhere.appendChild(h3Label);
//		showWhere.appendChild(document.createElement('br'));
		showWhere.appendChild(showBigArray(j));
	}
}

function showBigArray(j){
	var i, k,
        bigArrayText = document.createElement('h4');
	
	for (i=0; i<9; i++){ /* Which box|row|col ? */
		for (k=0; k<9; k++){ /* 1-9 Value & Position */
			if(k == 0){
				bigArrayText.appendChild(document.createTextNode(i + ': '));
			}
			bigArrayText.appendChild(document.createTextNode(window.allArrays[j][i][k]));
			if(k<8){
				bigArrayText.appendChild(document.createTextNode(', '));
			} else {
				bigArrayText.appendChild(document.createElement('br'));
			}			
		}
	}
	
	return bigArrayText;
}

function createTable(){

	console.log('In createTable()');
	
    var k, l,
    	colSize = 3,
    	rowSize = 3,
    	insertWhere = document.getElementById("table01"),
//    	body = document.body,
        tbl  = document.createElement('table');
//    tbl.style.width  = '100px';
//    tbl.style.border = '1px solid black';

    for ( k = 0; k < rowSize; k++){
        var tr = tbl.insertRow();
        for ( l = 0; l < colSize; l++){
//            if(i == 2 && j == 1){
//                break;
//            } else {
                var td = tr.insertCell();
//                td.appendChild(document.createTextNode('Cell'+i+j));
                td.appendChild(createSmallTable(k, l));
//                td.style.border = '1px solid black';
//                if(i == 1 && j == 1){
//                    td.setAttribute('rowSpan', '2');
//                }
//            }
        }
    }
//    body.appendChild(tbl);
    insertWhere.appendChild(tbl);
}

function convert4ints2zyzx(z1, y, z2, x) {
    var zyzx = new Array(4);
    
    zyzx[0] = z1;
    zyzx[1] = y;
    zyzx[2] = z2;
    zyzx[3] = x;

    return zyzx;
}

function translate_arrayPos_2_gridPos(arrayPos) {
	
//	console.log('In translate_arrayPos_2_gridPos(arrayPos['+arrayPos+'])');
	
    if(checkArrayPosValidity(arrayPos)) {
        /* gridPos = colPos + (rowPos * 9) */
        return (arrayPos[2] + (arrayPos[1] * 9));        
	} else {
		alert('ERROR translate_arrayPos_2_gridPos()(arrayPos[' + arrayPos + ']) checkArrayPosValidity(arrayPos) = false');
	}
}

function translate_zyzx_2_gridPos(z1, y, z2, x) {
	
//	console.log('In translate_zyzx_2_gridPos(z1='+z1+', y='+y+', z2='+z2+', x='+x+')');
	
    return (translate_arrayPos_2_gridPos(translate_zyzx_2_arrayPos(z1, y, z2, x)));
}

function createSmallTable(k, l){
	
	console.log('In createSmallTable(k='+k+', l='+l+')');
    
	var i, j,
        idNumber,
        gridPos,
		colSize = 3,
		rowSize = 3,
		tbl = document.createElement('table');
//        zyzx = new Array();
//    tbl.style.width  = '100px';
//    tbl.style.border = '1px solid black';

    for ( i = 0; i < rowSize; i++){
        var tr = tbl.insertRow();
        for ( j = 0; j < colSize; j++){
            gridPos = translate_zyzx_2_gridPos(k, l, i, j);
            
//            console.log(' gridPos='+gridPos);
            
            var td = tr.insertCell();
            var thisDiv = document.createElement('div');
            idNumber = k.toString() + l.toString() + i.toString() + j.toString();
            thisDiv.id = 'id' + idNumber;
//            thisDiv.innerHTML = 'Cell' + idNumber;
            thisDiv.appendChild(document.createTextNode('Cell' + idNumber));
            
            if(window.grid81[gridPos][2] == '_') {
                thisDiv.appendChild(createDropdown(idNumber, gridPos));                
            } else {
                thisDiv.appendChild(document.createTextNode(window.grid81[gridPos][2]));
            }
            td.appendChild(thisDiv);
//            td.appendChild(document.createTextNode('Cell'+k+l+i+j));
            td.id = 'td' + idNumber;
//            td.style.border = '1px solid black';
//            td.style.backgroundColor = 'yellow';
//            td.className = 'default';
            td.className = window.grid81[gridPos][4];
        }
    }
    
	return tbl;
}

function addGrid81OptionsToDDL(gridPos, singleDDLarray) {
	var i;
	
    for (i = 0; i < window.grid81[gridPos][5].length; i++) {
        var atr = document.createElement('option');
        atr.value = window.grid81[gridPos][5][i];
        atr.text  = window.grid81[gridPos][5][i];
//        ddl.appendChild(atr);
        singleDDLarray[0].appendChild(atr);
    }
}

function createDropdown(idNumber, gridPos){
	var i,
		singleDDLarray = new Array(1); // need this to pass by reference to another function that changes the ddl
	
//    var ddl = document.createElement('select');
    
	singleDDLarray[0] = document.createElement('select');
    singleDDLarray[0].name = 'ddl' + idNumber;
    singleDDLarray[0].onchange = function() {cellValueChanged('ddl'+idNumber)};
    singleDDLarray[0].disabled = window.grid81[gridPos][3];
		
//	ddl.name = 'ddl' + idNumber;
//	ddl.onchange = function() {cellValueChanged('ddl'+idNumber)};
//    ddl.disabled = window.grid81[gridPos][3];
	
//	for (i=0; i<=9; i++){
//		var atr = document.createElement('option');
//		if(i != 0){
//			atr.value = i;
//			atr.text = i;
//		} else {
//			atr.value = ' ';
//			atr.text = '_';
//		}
//		ddl.appendChild(atr);
//	}
    
//    for (i=0; i<window.grid81[gridPos][5].length; i++) {
//        var atr = document.createElement('option');
//        atr.value = window.grid81[gridPos][5][i];
//        atr.text  = window.grid81[gridPos][5][i];
//        ddl.appendChild(atr);
//    }
    
    addGrid81OptionsToDDL(gridPos, singleDDLarray);
	
//	return ddl;
	
	return singleDDLarray[0];
}

/* Will return back an array of sequential gridPos numbers */
function getDirectlyRelatedBoxCells(boxPos) {
	/* initial value: (floor(boxPos/3) * 27) + ((boxPos mod 3) * 3) */
	/* that and subsequent values: + (i mod 3) + (floor(i/3) * 9) */
	
	var i,
		boxPosInitialValue = (Math.floor(boxPos / 3) * 27) + ((boxPos % 3) * 3),
		directlyRelatedBoxCells = new Array();
	
	for (i=0; i<9; i++) {		
		directlyRelatedBoxCells[i] = boxPosInitialValue + (i % 3) + (Math.floor(i / 3) * 9);
	}
	
	console.log('  directlyRelatedBoxCells=' + directlyRelatedBoxCells);
	
	return directlyRelatedBoxCells;
}

/* Will return back an array of sequential gridPos numbers */
function getDirectlyRelatedRowCells(rowPos) {
	var i,
		rowPosTimesNine = rowPos * 9; 
		directlyRelatedRowCells = new Array();

	for (i=0; i<9; i++) {
		directlyRelatedRowCells[i] = (rowPosTimesNine) + i;
	}

	console.log('  directlyRelatedRowCells=' + directlyRelatedRowCells);
	
	return directlyRelatedRowCells;
}

/* Will return back an array of sequential gridPos numbers */
function getDirectlyRelatedColCells(colPos) {
	var i,
		directlyRelatedColCells = new Array();

	for (i=0; i<9; i++) {
		directlyRelatedColCells[i] = colPos + (i * 9);
	}
	
	console.log('  directlyRelatedColCells=' + directlyRelatedColCells);
	
	return directlyRelatedColCells;
}

/* returns true if elem is present in theArray, otherwise returns false */
function checkIfElementIsInArray(elem, theArray) {
	var i,
		found = false;
	
	if (theArray.length != 0) {
		for (i = 0; i < theArray.length; i++) {
			if (elem == theArray[i]) {
				found = true;
				break;
			}
		} 		
	}
	
	return found;
}

function putElemAtThisIndexInArray(elem, index, theArray) {
//	var returnArray;
	
	if (index == 0) {
		/* push at the front */
		theArray.unshift(elem);
	} else if (index == (theArray.length)) {
		/* push at the end */
		theArray.push(elem);
	} else {
		/* push in the middle */
		theArray.splice(index, 0, elem);
	}
	
//	returnArray = theArray;
	
//	return returnArray;
}

function pushElemInArrayOrderly(elem, theArray) {
	/* assume elem is not present in theArray */
	
	console.log('In pushElemInArrayOrderly(elem='+elem+', theArray['+theArray+'])');
	
	var i,
		foundPlace = false,
		whereToPut = 0,
//		returnArray,
		theArrayLength = theArray.length;
	
	if(theArrayLength != 0) { // if theArray is empty, just place it as the first element, i.e. at index 0
		if (theArray[theArrayLength - 1] < elem) {
			/* last element in theArray is smaller than elem, so put at the end of the array */
			whereToPut = theArrayLength;
			foundPlace = true;
		} else {
			for (i = 0; i < theArray.length; i++) {
				if ((theArray[i] != '_') && (theArray[i] > elem)) {
				/* element at index i of theArray is bigger than elem, so insert elem at index i. 
				 * Bigger current elements right-shifted */
					whereToPut = i;
					foundPlace = true;
					break;
				}
			}		
		}
	}
	
	/* no other bigger element found, so put at the end of the array */
	if (!foundPlace) {
		whereToPut = theArrayLength;
	}
	
//	returnArray = putElemAtThisIndexInArray(elem, whereToPut, theArray);
	putElemAtThisIndexInArray(elem, whereToPut, theArray);
	
	console.log(' After processing: theArray['+theArray+']');
//	console.log('After processing: returnArray['+returnArray+']');
	
//	return returnArray;
}

/* Will return back an array of sequential, non-repeating array of gridPos numbers */
function getAllDirectlyRelatedCells(arrayPos) {
	
	console.log('In getAllDirectlyRelatedCells(arrayPos['+arrayPos+'])');
	
	var i, j, 
//		tempArray,
		directlyRelatedBoxRowColCells = new Array(3),
		allDirectlyRelatedCells = new Array(),
		theChangedGridPos = translate_arrayPos_2_gridPos(arrayPos);
	
	directlyRelatedBoxRowColCells[0] = getDirectlyRelatedBoxCells(arrayPos[0]);
	directlyRelatedBoxRowColCells[1] = getDirectlyRelatedRowCells(arrayPos[1]);
	directlyRelatedBoxRowColCells[2] = getDirectlyRelatedColCells(arrayPos[2]);
	
	for (i=0; i<3; i++) {		
		if (directlyRelatedBoxRowColCells[i].length > 0) {
			for (j = 0; j < directlyRelatedBoxRowColCells[i].length; j++) {
				if (!checkIfElementIsInArray( directlyRelatedBoxRowColCells[i][j], allDirectlyRelatedCells)) {
					/* put directlyRelatedBoxRowColCells[i][j] in allDirectlyRelatedCells in proper order */
//					tempArray = pushElemInArrayOrderly(directlyRelatedBoxRowColCells[i][j], allDirectlyRelatedCells);
					
					/* allDirectlyRelatedCells is passed as reference and contents are changed
					 *  in the called functions and changes persists back here */
					// don't include the user changed gridPos in the array
					// as we don't want that gridPos selectOptions and selectedValue to change
					if (directlyRelatedBoxRowColCells[i][j] != theChangedGridPos) {
						pushElemInArrayOrderly(directlyRelatedBoxRowColCells[i][j], allDirectlyRelatedCells); 
					}
					
//					allDirectlyRelatedCells = tempArray; /* testing passing of array to see if its modified in called function */
				}
			}
		}
	}
	
//	console.log('In getAllDirectlyRelatedCells(arrayPos['+arrayPos+']) allDirectlyRelatedCells['+allDirectlyRelatedCells+']');
	console.log(' allDirectlyRelatedCells['+allDirectlyRelatedCells+']');
	
	return allDirectlyRelatedCells;
}

function getChosenValuesFromBoxRowOrCol(boxRowOrCol, whichBoxRowOrCol, chosenValues) {
	
	console.log('In getChosenValuesFromBoxRowOrCol(boxRowOrCol='+boxRowOrCol
			+', whichBoxRowOrCol='+whichBoxRowOrCol
			+', chosenValues['+chosenValues+'])');
	
	var i,
		aNumber;
	
	/* from window.allArrays
	 * i.e. the array at window.allArrays[boxRowOrCol][whichBoxRowOrCol]
	 * read the chosenValues one-by-one, if any
	 * and put them each, orderly, in the chosenValues array
	 * there shouldn't be any non-integers nor repetitions */
	
	for (i=0; i<9; i++) {
		aNumber = window.allArrays[boxRowOrCol][whichBoxRowOrCol][i];
		
		if (aNumber != '_') {
			if (!checkIfElementIsInArray(aNumber, chosenValues)) {
				pushElemInArrayOrderly(aNumber, chosenValues);
			}
		}
	}
}

function getAllChosenValuesFromArrayPos(arrayPos) {
	
	console.log('In getAllChosenValuesFromArrayPos(arrayPos['+arrayPos+'])');
	
	var i,
		currentChosenValues,
		chosenValues = new Array();
	
	/* in each box-row-col in arrayPos 
	 * get all the user chosen values
	 * and copy them sequentially non-repeating
	 * into the chosenValues array
	 * and return chosenValues */
	
	for (i=0; i<3; i++) {
		getChosenValuesFromBoxRowOrCol(i, arrayPos[i], chosenValues);
	}
	
	return chosenValues;
}

function getAllNonChosenValuesFromChosenValuesArray(chosenValues) {
	/* assume chosenValues is either an empty array
	 * or only has a sequential list of integers */
	
	console.log('In getAllNonChosenValuesFromChosenValuesArray(chosenValues['+chosenValues+'])');
	
	var i,
		tmpNonChosenValues,
		rtnNonChosenValues = new Array();
	
	/* prepare a _,1-9 array (tmpNonChosenValues)
	 * for each value in tmpNonChosenValues array
	 * if it is not present in chosenValues
	 * copy it from the tmpNonChosenValues array
	 * and put it at the end into rtnNonChosenValues
	 * return rtnNonChosenValues */
	
	tmpNonChosenValues = getStartUpArrayOfDropDownOptions();
	
	console.log(' tmpNonChosenValues['+tmpNonChosenValues+']');
	
	for (i = 0; i < tmpNonChosenValues.length; i++) {
		if (!checkIfElementIsInArray(tmpNonChosenValues[i], chosenValues)) {
			rtnNonChosenValues.push(tmpNonChosenValues[i]);
		}
	}
	
	return rtnNonChosenValues;
}

function checkIfTwoArraysAreTheSame(firstArray, secondArray) {
	/* assumes both arrays are sorted as required */
	
	var i = 0,
		result = true,
		firstArrayLength = firstArray.length;
	
	if (firstArrayLength == secondArray.length) {
		if (firstArrayLength > 0) {
			while(result && i < firstArrayLength) {
				if (firstArray[i] != secondArray[i]) {
					result = false;
				}
				i++;
			}			
		}
	} else {
		result = false;
	}
	
	return result;
}

function updateGridPosSelectOptions(gridPos, newSelectOptions) {
	
	console.log('In updateGridPosSelectOptions(gridPos='+gridPos+', newSelectOptions['+newSelectOptions+'])');
	
	var changeExecuted = false;
	
	/* compare newSelectOptions with the existing select options at gridPos in grid81 
	 * if different
	 * set newSelectOptions as the new select options at gridPos in grid81
	 * and set changeExecuted as true
	 * return changeExecuted */
	
	if (!checkIfTwoArraysAreTheSame(newSelectOptions, grid81[gridPos][5])) {
		grid81[gridPos][5] = newSelectOptions;
		changeExecuted = true;
	}
	
	return changeExecuted;
}

function translate_gridPos_2_zyzx(gridPos) {
	
	console.log('In translate_gridPos_2_zyzx(gridPos='+gridPos+')');
	
	return (translate_arrayPos_2_zyzx(translate_gridPos_2_arrayPos(gridPos)));
}

function updateDDLoptionsAtGridPos(currentDDL, gridPos) {
	/* but if it has a selectedValue, 
	 * don't remove that value from the selectOptions */
	
	var singleDDLarray = new Array(1),
		i,
		currentDDLoptionsLength = currentDDL.length;
	
	/* http://www.w3schools.com/jsref/met_select_remove.asp */
	// clear the currentDDL of existing options
//	for (i = currentDDLoptionsLength-1; i >= 0; i--) { // this works as well
//		currentDDL.remove(i);
//	}
	
	for (i = 0; i < currentDDLoptionsLength; i++) {
		currentDDL.remove(currentDDL.length - 1);
	}
	
	singleDDLarray[0] = currentDDL;
	
	addGrid81OptionsToDDL(gridPos, singleDDLarray);
}

function updateDOMatTheseGridPos(gridPosArray) {
	/* for each gridPos in gridPosArray
	 * update the select options
	 * at the gridPos in the DOM */
	
	console.log('In updateDOMatTheseGridPos(gridPosArray['+gridPosArray+'])');
	
	var i,
		gridPosArrayLength = gridPosArray.length,
		currentZYZX,
		currentDDL;
	
	if (gridPosArrayLength > 0) {
		for (i = 0; i < gridPosArrayLength; i++) {
			
			console.log(' i='+i+', gridPosArray[i]['+gridPosArray[i]+']');
			currentZYZX = translate_gridPos_2_zyzx(gridPosArray[i]);
			
			console.log(' currentZYZX['+currentZYZX+']');
			currentDDL = getDDLbyZYZX(currentZYZX);
			
			updateDDLoptionsAtGridPos(currentDDL, gridPosArray[i]);
		}
	}	
}

function updateSelectOptionsForTheseGridPos(gridPosArray) {
	var i,
		gridPosArrayLength = gridPosArray.length,
		currentArrayPos,
		currentChosenValues,
		currentNonChosenValues,
		gridPosChangedBoolean,
		changedGridPosSelectOptions = new Array();
	
	if(gridPosArrayLength > 0) {
		// do something
		for (i=0; i<gridPosArrayLength; i++) {
			// for each gridPos in gridPosArray, get the box-row-col arrayPos
			currentArrayPos = translate_gridPos_2_arrayPos(gridPosArray[i]);
			
			// build an array of all the chosen values in those box-row-col arrayPos
			currentChosenValues = getAllChosenValuesFromArrayPos(currentArrayPos);
			
			// build an array of the values not in the previous array
			currentNonChosenValues = getAllNonChosenValuesFromChosenValuesArray(currentChosenValues);
			
			// must add the current gridPos selectedValue into currentNonChosenValues
			/* get current gridPos selectedValue
			 * add that value into currentNonChosenValues
			 * except if the current gridPos selectedValue is '_'
			 * as that should already be in currentNonChosenValues */
			if(window.grid81[gridPosArray[i]][2] != '_') {
				pushElemInArrayOrderly(window.grid81[gridPosArray[i]][2], currentNonChosenValues);
			}
			
			console.log('  currentNonChosenValues['+currentNonChosenValues+']');
			
			// save that array as the selectOptions for that gridPos in the grid81 array
			gridPosChangedBoolean = updateGridPosSelectOptions(gridPosArray[i], currentNonChosenValues);
			
			if(gridPosChangedBoolean) { // this is to not make any changes to DOM where unchanged
				// push current gridPos at the end of changedGridPosSelectOptions array
				changedGridPosSelectOptions.push(gridPosArray[i]); 
			}
			
		}
		
		// update the DOM only at the gridPos-es with changed select options
		if (changedGridPosSelectOptions.length > 0) {
			updateDOMatTheseGridPos(changedGridPosSelectOptions);
		}
	}
}

function updateSelectedValueForTheseGridPos(gridPosArray) {
	var i,
		gridPosArrayLength = gridPosArray.length,
		zyzx,
		currentDDL;
	
	if (gridPosArrayLength > 0) {
		for (i = 0; i < gridPosArrayLength; i++) {
			zyzx = translate_gridPos_2_zyzx(gridPosArray[i]);
			currentDDL = getDDLbyZYZX(zyzx);
			currentDDL.value = window.grid81[gridPosArray[i]][2];
		}
	}
}

function updateRelatedCellsValues(zyzx, newCellValue) {
	var arrayPos = new Array(3),
		directlyRelatedCellsArray;
	
	if (check_zyzx_validity(zyzx[0], zyzx[1], zyzx[2], zyzx[3])) {
//		alert('updateRelatedCellsValues(zyzx['+zyzx+'] check_zyzx_validity=true');
		arrayPos = translate_zyzx_2_arrayPos(zyzx[0], zyzx[1], zyzx[2], zyzx[3]);
		updateArrays(zyzx[0], zyzx[1], zyzx[2], zyzx[3], newCellValue);
		directlyRelatedCellsArray = getAllDirectlyRelatedCells(arrayPos);
		
		/* Now must go to each gridPos in directlyRelatedCellsArray
		 * get the box row col arrayPos for each gridPos
		 * build an array of all the chosen values in those box row col
		 * build an array of the values not in the previous array
		 * save that array as the selectOptions for that gridPos in the grid81 array
		 *  */
		
		updateSelectOptionsForTheseGridPos(directlyRelatedCellsArray);
		updateSelectedValueForTheseGridPos(directlyRelatedCellsArray);
	} else {
		alert('ERROR updateRelatedCellsValues(zyzx['+zyzx+'] check_zyzx_validity=false');
	}
	
}

function refreshDiv(theDiv) {
	/* theDIV is a string */
	
	clearDiv(theDiv);
	
	switch(theDiv) {
	case 'grid81Values': showGrid81Values(); break;
	case 'arrayValues': showArrayValues(); break;
	case 'values': showValues(); break;
	default: alert('ERROR refreshDiv(theDiv='+theDiv+')');
	}
}

function updateCurrentValueInGrid81(gridPos, newCellValue) {
	window.grid81[gridPos][2] = newCellValue;
}

function cellValueChanged(ddlName){
//	alert("caller is " + ddlName + ", " + arguments.callee.caller.toString());
	var zyzx = getZYZXfromDdlName(ddlName),
//		zyzxAsString,
		newCellValue,
		gridPos;
	
	console.log('in cellValueChanged(ddlName='+ddlName+')'); // Outputs to browser's console
	
//	zyzxAsString = zyzx[0].toString() + zyzx[1].toString() + zyzx[2].toString() + zyzx[3].toString();
//	newCellValue = getCellValue(zyzxAsString);
	
	newCellValue = getCellValueByZYZX(zyzx);
	
	gridPos = translate_zyzx_2_gridPos(zyzx[0], zyzx[1], zyzx[2], zyzx[3]);
	
	updateCurrentValueInGrid81(gridPos, newCellValue);
	
	//	alert("caller is " + zyzx[0] + zyzx[1] + zyzx[2] + zyzx[3]);
	
	/* Just a proof of concept (POC) function. Comment out when true functions completed. */
	if (newCellValue == '_') {
		changeCellClass(zyzx, 'default'); 
	} else {
		changeCellClass(zyzx, 'error');
	}
	
	updateRelatedCellsValues(zyzx, newCellValue);
	refreshDiv('grid81Values');
}

function getZYZXfromDdlName(ddlName){
	var z1, y, z2, x, ddlNameLength, 
		zyzx = new Array();
	
	ddlNameLength = ddlName.length;
	
	z1 = ddlName[ddlNameLength-4];
	y  = ddlName[ddlNameLength-3];
	z2 = ddlName[ddlNameLength-2];
	x  = ddlName[ddlNameLength-1];
	
	zyzx[0] = parseInt(z1);
	zyzx[1] = parseInt(y);
	zyzx[2] = parseInt(z2);
	zyzx[3] = parseInt(x);
	
	return zyzx;
}

function changeCellClass(zyzx, newClassName){
	var cellTdID, cellTd;
	
//	alert('in changeCellClass(zyzx['+zyzx+'], newClassName='+newClassName+')')
	
	if(check_zyzx_validity(zyzx[0], zyzx[1], zyzx[2], zyzx[3])) {
		cellTdID = 'td' + zyzx[0].toString() + zyzx[1].toString() + zyzx[2].toString() + zyzx[3].toString();
		cellTd = document.getElementById(cellTdID);
//		cellTd.style.backgroundColor = newClassName;
		cellTd.className = newClassName;
	} else {
		alert('ERROR changeCellClass(zyzx[' + zyzx + ', newClassName=' + newClassName + '])');
	}
}

/* http://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript */
function clearDiv(divID){
	var div = document.getElementById(divID);
	
	while(div.firstChild){
	    div.removeChild(div.firstChild);
	}	
}

function showValues(){
	
	var showWhere = document.getElementById("values");
//	var ddlName;
	var i=1, z1, z2, y, x, cellValue;
	
	clearDiv("values");
	clearDiv("arrayValues");
	clearDiv("grid81Values");
	
	/*
	 * Coordinate format: z1 y z2 x
	 * 
	 * 0000 0001 0002 | 0100 0101 0102 | 0200 0201 0202
	 * 0010 0011 0012 | 0110 0111 0112 | 0210 0211 0212
	 * 0020 0021 0022 | 0120 0121 0122 | 0220 0221 0222
	 * ------------------------------------------------
	 * 1000 1001 1002 | 1100 1101 1102 | 1200 1201 1202
	 * 1010 1011 1012 | 1110 1111 1112 | 1210 1211 1212
	 * 1020 1021 1022 | 1120 1121 1122 | 1220 1221 1222
	 * ------------------------------------------------
	 * 2000 2001 2002 | 2100 2101 2102 | 2200 2201 2202 
	 * 2010 2011 2012 | 2110 2111 2112 | 2210 2211 2212
	 * 2020 2021 2022 | 2120 2121 2122 | 2220 2221 2222
	 */
	/*
	 * Box means each one of the nine 3x3 small 'tables'
	 * 
	 * Same z1 & y  values between ddlName-s means same Box
	 * Same z1 & z2 values between ddlName-s means same Row
	 * Same y  & x  values between ddlName-s means same Col
	 */
	for (z1 = 0; z1 <= 2; z1++) {
		for (z2 = 0; z2 <= 2; z2++) {
			for (y = 0; y <= 2; y++) {
				for (x = 0; x <= 2; x++) {
					/* ddlName formatted like this as it correlates to how the whole table 
					 * was designed and given coordinates */
//					ddlName = z1.toString() + y.toString() + z2.toString() + x.toString();
					i++;
//					cellValue = getCellValue(ddlName);
					cellValue = getCellValueByZYZX(convert4ints2zyzx(z1, y, z2, x));
					if(cellValue != 0) { /* If not invalid cellValue */
						updateArrays(z1, y, z2, x, cellValue);
					}
					showWhere.appendChild(document.createTextNode(cellValue));
					if(i<10) {
						showWhere.appendChild(document.createTextNode(', '));
					} else {
						showWhere.appendChild(document.createElement('br'));
						i = 1;
					}
				}				
			}
		}
	}
	
	showArrayValues();
    showGrid81Values();
}

function getIDstringNameFromZYZX(prefix, zyzx) {
	
	console.log('In getIDstringNameFromZYZX(prefix='+prefix+', zyzx['+zyzx+'])');
	
	return (prefix + zyzx[0].toString() + zyzx[1].toString() + zyzx[2].toString() + zyzx[3].toString());
}

function getDDLbyZYZX(zyzx) {
	
	console.log('In getDDLbyZYZX(zyzx['+zyzx+'])');	
	
	/* http://stackoverflow.com/questions/5501433/nodelist-object-in-javascript */
	var ddlCellName = getIDstringNameFromZYZX("ddl", zyzx),
		nodeList = document.getElementsByName(ddlCellName),
    	nodeArray = [].slice.call(nodeList),
		rtnDDL;
	
	if(nodeArray.length == 1){
		rtnDDL = nodeArray[0];
	} else {
		alert('ERROR getDDLbyddlName(' + ddlName+ ') nodeArray.length=' + nodeArray.length + '');
	}
	
	return rtnDDL;	
}

function getCellValueByZYZX(zyzx) {
	
	console.log('In getCellValueByZYZX(zyzx['+zyzx+'])');	
	
	var respectiveDDL = getDDLbyZYZX(zyzx);
		cellValue = respectiveDDL.value;
		
	return cellValue;
}

function getCellValue(ddlName){
	var currentValue, 
		ddlCellName = "ddl" + ddlName;

	/* http://stackoverflow.com/questions/5501433/nodelist-object-in-javascript */
	var nodeList = document.getElementsByName(ddlCellName),
    	nodeArray = [].slice.call(nodeList);
	
	if(nodeArray.length == 1){
		currentValue = nodeArray[0].value;
		if(currentValue == ' '){
			currentValue = '_';
		}
	} else {
		currentValue = '0';
//		alert('ERROR getCellValue('+ddlName+ ', caller: ' + arguments.callee.caller.toString() + ')'); // arguments.callee is obsolete
//		alert('ERROR getCellValue('+ddlName+ ', caller: ' + getCellValue.caller + ')'); // function.caller is non-standard
		alert('ERROR getCellValue(' + ddlName+ ')');
		
	}
	
//	showWhere.appendChild(document.createTextNode(currentValue));
	return currentValue;
}

function updateArrays(z1, y, z2, x, cellValue){
	var boxIndex, rowIndex, colIndex,
		arrayPos = translate_zyzx_2_arrayPos(z1, y, z2, x);
	
	/* arrayPos=[boxPos, rowPos, colPos] */
	/* allArrays[What? 0:Box or 1:Row or 2:Col][Which? 0-8][1-9 Value & Position] */
	
	if(checkArrayPosValidity(arrayPos)) {
		boxIndex = findBoxIndex(arrayPos);
		rowIndex = arrayPos[1]; /* going from top  to down */
		colIndex = arrayPos[2]; /* going from left to right */
		
		window.allArrays[0][arrayPos[0]][boxIndex] = cellValue; /* box */
		window.allArrays[1][arrayPos[1]][colIndex] = cellValue; /* within row uses colIndex to put cellValue */
		window.allArrays[2][arrayPos[2]][rowIndex] = cellValue; /* within col uses rowIndex to put cellValue */
		
	} else {
		alert('ERROR checkArrayPosValidity(arrayPos[boxPos='+ arrayPos[0] 
			+', rowPos='+ arrayPos[1] 
			+', colPos='+ arrayPos[2] 
			+ ']) = false');
	}
}

function translate_zyzx_2_arrayPos(z1, y, z2, x){
	
//	console.log('In translate_zyzx_2_arrayPos(z1='+z1+', y='+y+', z2='+z2+', x='+x+')');
	
	var boxPos, rowPos, colPos,
		arrayPos = new Array();
	/* arrayPos=[boxPos, rowPos, colPos] */
	
	if(check_zyzx_validity(z1, y, z2, x)) {
		boxPos = (3 * parseInt(z1)) + parseInt(y) ;
		rowPos = (3 * parseInt(z1)) + parseInt(z2);
		colPos = (3 * parseInt(y) ) + parseInt(x) ;
		
		arrayPos[0] = boxPos;
		arrayPos[1] = rowPos;
		arrayPos[2] = colPos;		
	} else {
		alert('ERROR check_zyzx_validity('+ z1 +', '+ y +', '+ z2 +', '+ x +') = false');
	}
	
	return arrayPos;
}

function translate_arrayPos_2_zyzx(arrayPos){
    var zyzx = new Array();
    /* zyzx=[z1, y, z2, x] */
    
//    alert('in translate_arrayPos_2_zyzx(arrayPos='+ arrayPos +')');
    
    if(checkArrayPosValidity(arrayPos)){
/*
		boxPos = (3 * parseInt(z1)) + parseInt(y) ;
		rowPos = (3 * parseInt(z1)) + parseInt(z2);
		colPos = (3 * parseInt(y) ) + parseInt(x) ;
*/
        zyzx[0] = Math.floor(arrayPos[1] / 3);  /* z1 = rowPos / 3 */
        zyzx[1] = arrayPos[0] % 3;              /* y  = boxPos mod 3 */
        zyzx[2] = arrayPos[1] % 3;              /* z2 = rowPos mod 3 */
        zyzx[3] = arrayPos[2] % 3;              /* x  = colPos mod 3 */
        
	} else {
		alert('ERROR translate_arrayPos_2_zyzx(arrayPos='+ arrayPos +') checkArrayPosValidity(arrayPos) = false');
    }
    
    return zyzx;
}

function check_zyzx_validity(z1, y, z2, x){
	if(z1 >= 0 && z1 <= 2) {
		if(y >= 0 && y <= 2) {
			if(z2 >= 0 && z2 <= 2) {
				if(x >= 0 && x <= 2) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function checkArrayPosValidity(arrayPos){
	
//	console.log(checkArrayPosValidity.caller);
	
	if(arrayPos[0] >= 0 && arrayPos[0] <= 9){ /* box validity */
		if(arrayPos[1] >= 0 && arrayPos[1] <= 9){ /* row validity */
			if(arrayPos[2] >= 0 && arrayPos[2] <= 9){ /* col validity */
				return true;
			} else {
				return false; /* col invalid */
			}			
		} else {
			return false; /* row invalid */
		}		
	} else {
		return false; /* box invalid */
	}
}

function findBoxIndex(arrayPos){
	/* arrayPos has been prechecked to be valid before calling this function */
	return (((arrayPos[1]%3)*3)+(arrayPos[2]%3)); /* should return a value between 0-8 */
}

function initialise() {
	
	console.log('In initialise()');
	
	createArrays();
	createTable();
	showArrayValues();
    showGrid81Values();
}

