function changeGreen() {
    document.getElementById("up").style.color = "green";
    document.getElementById("down").style.color = "#03183a";
    document.getElementById("up").onclick = function(){} ;
    document.getElementById("down").onclick = function(){changeRed()} ;
    var vote = parseInt(document.getElementById("question-vote").innerHTML);
    vote++;
    document.getElementById("question-vote").innerHTML = vote;
}

function changeRed() {
    document.getElementById("down").style.color = "red";
    document.getElementById("up").style.color = "#03183a";
    document.getElementById("up").onclick = function(){changeGreen()} ;
    document.getElementById("down").onclick = function(){} ;
    var vote = parseInt(document.getElementById("question-vote").innerHTML);
    vote--;
    document.getElementById("question-vote").innerHTML = vote;
}

function changeGreen1() {
    document.getElementById("up1").style.color = "green";
    document.getElementById("down1").style.color = "#03183a";
    document.getElementById("up1").onclick = function(){} ;
    document.getElementById("down1").onclick = function(){changeRed1()} ;
    var vote = parseInt(document.getElementById("reply-vote").innerHTML);
    vote++;
    document.getElementById("reply-vote").innerHTML = vote;
}

function changeRed1() {
    document.getElementById("down1").style.color = "red";
    document.getElementById("up1").style.color = "#03183a";
    document.getElementById("up1").onclick = function(){changeGreen1()} ;
    document.getElementById("down1").onclick = function(){} ;
    var vote = parseInt(document.getElementById("reply-vote").innerHTML);
    vote--;
    document.getElementById("reply-vote").innerHTML = vote;
}