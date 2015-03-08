var desired = [] //the input of desired courses to be added to the schedule
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

function compatible(s1, s2){
    boolean b = true;
    for(day = 0; day < 7; day++){
	if(s1.days[day] && s2.days[day]){
	    if(checkTime(s1,s2))
		b = false;
	}
    }
    return b;
}

function checkTime(s1, s2){
    if((s1.start < s2.end && s1.end > s2.end) || (s2.start < s1.end && s2.end > s1.end))
	return false;
    return true;
}
var options = [desired.length];
var finalList = [];
function generate(course){
    for(i = 0; i < array[course].length; i++){
	for(j = 0; j < options.length && options[j]!= null; j++){
	    if(compatible(options[j], desired[course][i])){
		options[course] = desired[course][i];
		if(course == desired.length - 1){
		    finalList[finalList.length] = options;
		}else{
		    generate(course + 1);
		}
	    }
	}
    }
}
generate(0);
//Display the contents of finalList[] as you please
