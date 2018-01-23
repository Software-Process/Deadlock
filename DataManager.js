var postsArray = [];

function init() {
	// Read from JSON and populate list
	if (localStorage.postsRecord) {
		postsArray = JSON.parse(localStorage.postsRecord);

		for(var i = 0; i < postsArray.length; ++i) {
			var title = postsArray[i].title;
			addToList(title);
		}
	}
}

function addToJSON() {
	var text = document.getElementById("TextBox").value;
	var postObj = {title:text};
	postsArray.push(postObj);

	localStorage.postsRecord = JSON.stringify(postsArray);
	addToList(text);
}

function addToList(text) {
	var node = document.createElement("LI");
	var textnode = document.createTextNode(text);
	node.appendChild(textnode);
	document.getElementById("List").appendChild(node);
}