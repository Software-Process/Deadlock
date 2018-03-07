function checkFilled() {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var questionText = document.getElementById("text").value;

    console.log(title + " " + author + " " + questionText);

    if ((title == "") || (author == "") || (questionText == "")) {
    	var questionText = document.getElementById("");
        // Show some sort of message to the user
        return false;
    };
}

function clear() {
	document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("text").value = "";
}
module.exports = {checkFilled, clear};