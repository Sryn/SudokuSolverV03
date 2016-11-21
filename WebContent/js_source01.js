/**
 * js_source01.js - Sryn - 201611161624
 */

/* http://stackoverflow.com/questions/14643617/create-table-using-javascript */

function initialise(){
	createArrays();
	tableCreate();
	showArrayValues();
}

function createArrays(){
	window.allArrays = new Array();
	
	/* j[0]=box, j[1]=row, j[2]=col */
	for(var j=0; j<3; j++){
		window.allArrays[j] = new Array();
		
		for(var i = 0; i < 9; i++) {
			window.allArrays[j][i] = new Array();
			for(var k=0; k<9; k++){
				/* allArrays[What? 0:Box or 1:Row or 2:Col][Which? 0-8][1-9 Value & Position] */
				window.allArrays[j][i][k] = '_';
			}
		}		
	}
	
	createGrid81Array();
}

function createGrid81Array(){
	window.grid81 = new Array();
	
	var i;
	
	for(i=0; i<81; i++){
		var newCell = new Array();
		
		newCell[0] = getZYZXfromGridPos(i);
		
		grid81[0] = newCell;
	}
}

function getZYZXfromGridPos(gridPos){
	var zyzx = new Array(),
		boxPos, rowPos, colPos;
	
	
}

function showArrayValues(){
	var showWhere = document.getElementById("arrayValues"),
		arrayTopLabel = ["Box", "Row", "Col"],
		shownText, h3Label;
	
	for(var j=0; j<3; j++){ /* What? 0:box, 1:row or 2:col */
		h3Label = document.createElement('h3');
//		h3Label.innerHTML = arrayTopLabel[j];
		h3Label.appendChild(document.createTextNode(arrayTopLabel[j]));
		showWhere.appendChild(h3Label);
//		showWhere.appendChild(document.createElement('br'));
		showWhere.appendChild(showBigArray(j));
	}
}

function showBigArray(j){
	var bigArrayText = document.createElement('h4');
	
	for(var i=0; i<9; i++){ /* Which box|row|col ? */
		for(var k=0; k<9; k++){ /* 1-9 Value & Position */
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

function tableCreate(){
    var k, l,
    	colSize = 3,
    	rowSize = 3,
    	insertWhere = document.getElementById("table01"),
//    	body = document.body,
        tbl  = document.createElement('table');
//    tbl.style.width  = '100px';
//    tbl.style.border = '1px solid black';

    for( k = 0; k < rowSize; k++){
        var tr = tbl.insertRow();
        for( l = 0; l < colSize; l++){
//            if(i == 2 && j == 1){
//                break;
//            } else {
                var td = tr.insertCell();
//                td.appendChild(document.createTextNode('Cell'+i+j));
                td.appendChild(smallTableCreate(k, l));
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

function smallTableCreate(k, l){
    var smallTbl = document.createTextNode('Cell'+k+l);
    
	var i, j,
		colSize = 3,
		rowSize = 3,
		tbl = document.createElement('table');
//    tbl.style.width  = '100px';
//    tbl.style.border = '1px solid black';

    for( i = 0; i < rowSize; i++){
        var tr = tbl.insertRow();
        for( j = 0; j < colSize; j++){
            var td = tr.insertCell();
            var thisDiv = document.createElement('div');
            var idNumber = k.toString() + l.toString() + i.toString() + j.toString();
            thisDiv.id = 'id' + idNumber;
//            thisDiv.innerHTML = 'Cell' + idNumber;
            thisDiv.appendChild(document.createTextNode('Cell' + idNumber));
            thisDiv.appendChild(createDropdown(idNumber));
            td.appendChild(thisDiv);
//            td.appendChild(document.createTextNode('Cell'+k+l+i+j));
            td.id = 'td' + idNumber;
//            td.style.border = '1px solid black';
//            td.style.backgroundColor = 'yellow';
            td.className = 'default';
        }
    }
    
//	return smallTbl;
	return tbl;
}

function createDropdown(idNumber){
	var ddl = document.createElement('select');
	ddl.name = 'ddl' + idNumber;
	ddl.onchange = function() {checkCellValueValidity('ddl'+idNumber)};
	
	for(var i=0; i<=9; i++){
		var atr = document.createElement('option');
		if(i != 0){
			atr.value = i;
			atr.text = i;
		} else {
			atr.value = ' ';
			atr.text = '_';
		}
		ddl.appendChild(atr);
	}
	
	return ddl;
}

function checkCellValueValidity(ddlName){
//	alert("caller is " + ddlName + ", " + arguments.callee.caller.toString());
	var zyzx = getZYZXfromDdlName(ddlName);
//	alert("caller is " + zyzx[0] + zyzx[1] + zyzx[2] + zyzx[3]);
	changeCellClass(zyzx, 'error');
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
	var ddlName, i=1, z1, z2, y, x, cellValue;
	
	clearDiv("values");
	clearDiv("arrayValues");
	
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
	for(z1 = 0; z1 <= 2; z1++) {
		for(z2 = 0; z2 <= 2; z2++) {
			for(y = 0; y <= 2; y++) {
				for(x = 0; x <= 2; x++) {
					/* ddlName formatted like this as it correlates to how the whole table 
					 * was designed and given coordinates */
					ddlName = z1.toString() + y.toString() + z2.toString() + x.toString();
					i++;
					cellValue = getCellValue(ddlName);
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
		alert('ERROR getCellValue('+ddlName+')');
	}
	
//	showWhere.appendChild(document.createTextNode(currentValue));
	return currentValue	
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
