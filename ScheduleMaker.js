<!DOCTYPE html>
<html>
<body>
    
<div id="id01"></div>
    
<script>
var Array = [] //the input of desired courses to be added to the schedule
var xmlhttp = new XMLHttpRequest();
var url = "The special url";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var section;
    var out = "<table>";
    
    out += "</table>"
    document.getElementById("id01").innerHTML = out;
}
var options = [];
for(i = 0; i < array[0].length; i++) {
    for(j = 1; j < array.length; j++){
	for(l = 0; l < array[j].length; l++){
	    for(k = 0; options[k] != null && k < options.length; k ++){
		if(array[i][j].StartTime > options[k].EndTime || options[k].Start > array[i][j].EndTime){
		    options[k+1] = array[i][j];
		}		
	    }
	}
    }
}
</script>

</body>
</html>
