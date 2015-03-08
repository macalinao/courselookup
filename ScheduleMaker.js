<!DOCTYPE html>
<html>
<body>

<h1>Customers</h1>
<div id="id01"></div>

<script>
    var xmlhttp = new XMLHttpRequest();
//add acual url
var url = "http://www.w3schools.com/website/Customers_MYSQL.php";

xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var array = JSON.parse(response);
    var section;
    var out = "<table>";

    for(i = 0; i < array.length; i++) {
        out += "<tr><td>" +
        array[section].Name +
        "</td><td>" +
        array[section].StartTime +
        "</td><td>" +
        array[section].EndTime +
        "</td></tr>";
	array[section].CourseID +
        "</td></tr>";
	array[section].SectionID +
        "</td></tr>";
	array[section].SectionID +
        "</td></tr>";
    }
    out += "</table>"
    document.getElementById("id01").innerHTML = out;
}
</script>

</body>
</html>
