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
		}		
	}
	
}

function showArrayValues(){
	var showWhere = document.getElementById("arrayValues"),
		arrayTopLabel = ["Box", "Row", "Col"],
		shownText, h3Label;
	
	for(var j=0; j<3; j++){
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
	
	for(var i=0; i<9; i++){
		for(var k=0; k<9; k++){
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
    var colSize = 3,
    	rowSize = 3,
    	insertWhere = document.getElementById("table01"),
//    	body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < rowSize; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < colSize; j++){
//            if(i == 2 && j == 1){
//                break;
//            } else {
                var td = tr.insertCell();
//                td.appendChild(document.createTextNode('Cell'+i+j));
                td.appendChild(smallTableCreate(i, j));
                td.style.border = '1px solid black';
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
    
	var colSize = 3,
		rowSize = 3,
		tbl = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < rowSize; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < colSize; j++){
            var td = tr.insertCell();
            var thisDiv = document.createElement('div');
            var idNumber = k.toString() + l.toString() + i.toString() + j.toString();
            thisDiv.id = 'id' + idNumber;
//            thisDiv.innerHTML = 'Cell' + idNumber;
            thisDiv.appendChild(document.createTextNode('Cell' + idNumber));
            thisDiv.appendChild(createDropdown(idNumber));
            td.appendChild(thisDiv);
//            td.appendChild(document.createTextNode('Cell'+k+l+i+j));
            td.style.border = '1px solid black';
        }
    }
    
//	return smallTbl;
	return tbl;
}

function createDropdown(idNumber){
	var ddl = document.createElement('select');
	ddl.name = 'ddl' + idNumber;
	
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

/* http://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript */
function clearDiv(divID){
	var div = document.getElementById(divID);
	
	while(div.firstChild){
	    div.removeChild(div.firstChild);
	}	
}

function showValues(){
	
	var showWhere = document.getElementById("values");
	var ddlName, i=1;
	
	clearDiv("arrayValues");
	
	for(z1 = 0; z1 <= 2; z1++) {
		for(z2 = 0; z2 <= 2; z2++) {
			for(y = 0; y <= 2; y++) {
				for(x = 0; x <= 2; x++) {
					ddlName = z1.toString() + y.toString() + z2.toString() + x.toString();
					i++;
//					showWhere.appendChild(document.createTextNode(ddlName));
					showWhere.appendChild(document.createTextNode(getCellValue(ddlName)));
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
	}
	
//	showWhere.appendChild(document.createTextNode(currentValue));
	return currentValue	
}
