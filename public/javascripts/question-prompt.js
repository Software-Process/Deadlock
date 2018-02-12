function checkFilled() {
    var title = document.getElementById("deadlock-question-title").value;
    var author = document.getElementById("deadlock-question-title").value;
    var questionText = document.getElementById("deadlock-question-text").value;
    if ((title == "") || (author == "") || (questionText == "")) {
    	var questionText = document.getElementById("");
        // Show some sort of message to the user
        return false;
    };
}

function clear() {
	document.getElementById("deadlock-question-title").value = "";
    document.getElementById("deadlock-question-title").value = "";
    document.getElementById("deadlock-question-text").value = "";
}