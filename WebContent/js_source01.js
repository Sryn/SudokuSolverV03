/**
 * js_source01.js - Sryn - 201611161624
 */

/* http://stackoverflow.com/questions/14643617/create-table-using-javascript */
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
            td.appendChild(document.createTextNode('Cell'+k+l+i+j));
            td.style.border = '1px solid black';
        }
    }
    
//	return smallTbl;
	return tbl;
}
