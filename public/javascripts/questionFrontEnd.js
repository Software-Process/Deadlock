/* Legacy Code: Kept for future reference just in case.
function changeGreen() {
    //BACKEND: Go into database and increment vote value by 1 or 2 (or decrement by 1 for reset) depending on if the user has already downvoted.
    var upArrow = document.getElementById("up");
    var downArrow = document.getElementById("down");
    var vote = parseInt(document.getElementById("question-vote").innerHTML);
    if(downArrow.classList.contains("down-voted"))
    {
        vote+=2;
        document.getElementById("question-vote").innerHTML = vote;
        upArrow.classList.remove("not-voted");
        upArrow.classList.add("up-voted");
        downArrow.classList.remove("down-voted");
        downArrow.classList.add("not-voted");
    }
    else if (upArrow.classList.contains("up-voted"))
    {
        vote--;
        document.getElementById("question-vote").innerHTML = vote;
        upArrow.classList.add("not-voted")
        upArrow.classList.remove("up-voted");
    }
    else
    {
        vote++;
        document.getElementById("question-vote").innerHTML = vote;
        upArrow.classList.remove("not-voted");
        upArrow.classList.add("up-voted");
        downArrow.classList.remove("down-voted");
        downArrow.classList.add("not-voted");
    }
}

function changeRed() {
    //BACKEND: Go into database and decrement vote value by 1 or 2 (or increment by 1 for reset) depending on if the user has already upvoted.
    var upArrow = document.getElementById("up");
    var downArrow = document.getElementById("down");
    var vote = parseInt(document.getElementById("question-vote").innerHTML);
    if (downArrow.classList.contains("down-voted"))
    {
        vote++;
        document.getElementById("question-vote").innerHTML = vote;
        downArrow.classList.add("not-voted");
        downArrow.classList.remove("down-voted");
    }
    else if(upArrow.classList.contains("up-voted"))
    {
        vote-=2;
        document.getElementById("question-vote").innerHTML = vote;
        upArrow.classList.remove("up-voted");
        upArrow.classList.add("not-voted");
        downArrow.classList.remove("not-voted");
        downArrow.classList.add("down-voted");
    }
    else
    {
        vote--;
        document.getElementById("question-vote").innerHTML = vote;
        upArrow.classList.remove("up-voted");
        upArrow.classList.add("not-voted");
        downArrow.classList.remove("not-voted");
        downArrow.classList.add("down-voted");
    }
}
*/
function changeGreen1(replyContent) {
    //BACKEND: Go into database and increment vote value by 1 or 2 (or decrement by 1 for reset) depending on if the user has already downvoted.
    var upArrow = replyContent.childNodes[1];
    var downArrow = replyContent.childNodes[5];
    var voteObject = replyContent.childNodes[3];
    var vote = parseInt(voteObject.innerHTML);
    if(downArrow.classList.contains("down-voted"))
    {
        vote+=2;
        voteObject.innerHTML = vote;
        upArrow.classList.remove("not-voted");
        upArrow.classList.add("up-voted");
        downArrow.classList.remove("down-voted");
        downArrow.classList.add("not-voted");
    }
    else if (upArrow.classList.contains("up-voted"))
    {
        vote--;
        voteObject.innerHTML = vote;
        upArrow.classList.add("not-voted")
        upArrow.classList.remove("up-voted");
    }
    else
    {
        vote++;
        voteObject.innerHTML = vote;
        upArrow.classList.remove("not-voted");
        upArrow.classList.add("up-voted");
        downArrow.classList.remove("down-voted");
        downArrow.classList.add("not-voted");
    }
}

function changeRed1(replyContent) {
    //BACKEND: Go into database and decrement vote value by 1 or 2 (or increment by 1 for reset) depending on if the user has already upvoted.
    var upArrow = replyContent.childNodes[1];
    var downArrow = replyContent.childNodes[5];
    var voteObject = replyContent.childNodes[3];
    var vote = parseInt(voteObject.innerHTML);
    if (downArrow.classList.contains("down-voted"))
    {
        vote++;
        voteObject.innerHTML = vote;
        downArrow.classList.add("not-voted");
        downArrow.classList.remove("down-voted");
    }
    else if(upArrow.classList.contains("up-voted"))
    {
        vote-=2;
        voteObject.innerHTML = vote;
        upArrow.classList.remove("up-voted");
        upArrow.classList.add("not-voted");
        downArrow.classList.remove("not-voted");
        downArrow.classList.add("down-voted");
    }
    else
    {
        vote--;
        voteObject.innerHTML = vote;
        upArrow.classList.remove("up-voted");
        upArrow.classList.add("not-voted");
        downArrow.classList.remove("not-voted");
        downArrow.classList.add("down-voted");
    }
}

function accept(reply) {
    if (confirm("Are you sure you want to accept this reply? Deleting an accepted reply will only be implemented in a future sprint!"))
    {
        var acceptedSpace = document.getElementById("accepted-answer");
        if(!acceptedSpace.classList.contains("hidden"))
        {
            alert("Sorry! Only one reply can be accepted per question.");
        }
        else
        {
            document.getElementById("accept-title").classList.remove("hidden");
            document.getElementById("temp-accept").classList.add("hidden");
            // BACKEND: Manipulate database so that this question.reply has ACCEPTED = True in database;
            acceptedSpace.innerHTML = reply.childNodes[1].innerHTML;
            acceptedSpace.classList.toggle("hidden");
            reply.style.display = "none";
        }
    }
}

function reject(reply) {
    // BACKEND: Go into database and delete this question.reply
    reply.classList.add("hidden");
}

function frontEndSubmit() {
    /*
     KEEP IN MIND: This is a temporary function to test front-end features, this will not exist in the final product.
    */
    var replyList = document.getElementById("replies-list");
    //The structure of a question in string format.
    replyList.innerHTML += "<div class=\"reply\">\r\n                  <div class=\"content\">\r\n                        <i class=\"glyphicon glyphicon-chevron-up not-voted\" id=\"up1\" onclick=\"changeGreen1(this.parentElement)\"></i>\r\n                        <span class=\"reply-vote\" id=\"reply-vote\">0</span>\r\n                        <i class=\"glyphicon glyphicon-chevron-down not-voted\" id=\"down1\" onclick=\"changeRed1(this.parentElement)\"></i>\r\n                        question.reply.CONTENT\r\n                    </div>\r\n                    <button type=\"button\" class=\"btn btn-dark accept-reject\" onclick=\"accept(this.parentElement)\">Accept</button>\r\n                    <button type=\"button\" class=\"btn btn-dark accept-reject\" onclick=\"reject(this.parentElement)\">Reject</button>\r\n                    <p class=\"small pull-right\">Submitted by question.reply.USER on question.reply.DATE</p>\r\n                </div>"
    


}

function questionChangeGreen() {
    var upArrow = document.getElementById("up");
    var downArrow = document.getElementById("down");
    upArrow.classList.remove("not-voted");
    upArrow.classList.add("up-voted");
    downArrow.classList.remove("down-voted");
    downArrow.classList.add("not-voted");
}

function questionChangeRed() {
    var upArrow = document.getElementById("up");
    var downArrow = document.getElementById("down");
    downArrow.classList.remove("not-voted");
    downArrow.classList.add("down-voted");
    upArrow.classList.remove("up-voted");
    upArrow.classList.add("not-voted");
}

function replyChangeGreen(replyId) {
    var upArrow = document.getElementById(replyId+"up");
    var downArrow = document.getElementById(replyId+"down");
    upArrow.classList.remove("not-voted");
    upArrow.classList.add("up-voted");
    downArrow.classList.remove("down-voted");
    downArrow.classList.add("not-voted");
}

function replyChangeRed(replyId) {
    var upArrow = document.getElementById(replyId+"up");
    var downArrow = document.getElementById(replyId+"down");
    downArrow.classList.remove("not-voted");
    downArrow.classList.add("down-voted");
    upArrow.classList.remove("up-voted");
    upArrow.classList.add("not-voted");
}

function checkVote() {
    var temp = document.getElementById("question-info").innerHTML;
    var status = getCookie(temp);
    if (status == "up") {
        questionChangeGreen();
        document.getElementById("button-up").disabled = true;
        document.getElementById("button-down").disabled = false;
    }
    if (status == "down") {
        questionChangeRed();
        document.getElementById("button-down").disabled = true;
        document.getElementById("button-up").disabled = false;
    }
    try {
        var count = 0;
        while(true) {
            var str = "reply"+count+"up";
            var replyId = document.getElementById(str).name;
            var replyStatus = getCookie(replyId);
            if (replyStatus == "up") {
                replyChangeGreen(replyId);
                document.getElementById("reply"+count+"up").disabled = true;
                document.getElementById("reply"+count+"down").disabled = false;
            }
            if (replyStatus == "down") {
                replyChangeRed(replyId);
                document.getElementById("reply"+count+"down").disabled = true;
                document.getElementById("reply"+count+"up").disabled = false;
            }
        count++;
        }
    }
    catch(err) {
        //alert("done");
    }
}

function questionUpCookie() {
    var temp = document.getElementById("question-info").innerHTML;
    document.cookie=temp+"=up";
}

function questionDownCookie() {
    var temp = document.getElementById("question-info").innerHTML;
    document.cookie=temp+"=down";
}

function replyUpCookie(replyId) {
    document.cookie=replyId.name+"=up";
}

function replyDownCookie(replyId) {
    document.cookie=replyId.name+"=down";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
module.exports = {changeGreen1, changeRed1, accept, reject, frontEndSubmit, questionChangeGreen, questionChangeRed, checkVote, questionUpCookie, questionDownCookie, getCookie };