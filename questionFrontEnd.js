function changeGreen() {
    var upArrow = document.getElementById("up");
    var downArrow = document.getElementById("down");
    var vote = parseInt(document.getElementById("question-vote").innerHTML);
    if(downArrow.classList.contains("down-voted"))
    {
        vote+=2;
        document.getElementById("question-vote").innerHTML = vote;
    }
    else
    {
        vote++;
        document.getElementById("question-vote").innerHTML = vote;
    }
    upArrow.classList.remove("not-voted");
    upArrow.classList.add("up-voted");
    downArrow.classList.remove("down-voted");
    downArrow.classList.add("not-voted");
    upArrow.onclick = function(){} ;
    downArrow.onclick = function(){changeRed()} ;
}

function changeRed() {
    var upArrow = document.getElementById("up");
    var downArrow = document.getElementById("down");
    var vote = parseInt(document.getElementById("question-vote").innerHTML);
    if(upArrow.classList.contains("up-voted"))
    {
        vote-=2;
        document.getElementById("question-vote").innerHTML = vote;
    }
    else
    {
        vote--;
        document.getElementById("question-vote").innerHTML = vote;
    }
    upArrow.classList.remove("up-voted");
    upArrow.classList.add("not-voted");
    downArrow.classList.remove("not-voted");
    downArrow.classList.add("down-voted");
    upArrow.onclick = function(){changeGreen()} ;
    downArrow.onclick = function(){} ;
}

function changeGreen1() {
    var upArrow = document.getElementById("up1");
    var downArrow = document.getElementById("down1");
    var vote = parseInt(document.getElementById("reply-vote").innerHTML);
    if(downArrow.classList.contains("down-voted"))
    {
        vote+=2;
        document.getElementById("reply-vote").innerHTML = vote;
    }
    else
    {
        vote++;
        document.getElementById("reply-vote").innerHTML = vote;
    }
    upArrow.classList.remove("not-voted");
    upArrow.classList.add("up-voted");
    downArrow.classList.remove("down-voted");
    downArrow.classList.add("not-voted");
    upArrow.onclick = function(){} ;
    downArrow.onclick = function(){changeRed1()} ;
}

function changeRed1() {
    var upArrow = document.getElementById("up1");
    var downArrow = document.getElementById("down1");
    var vote = parseInt(document.getElementById("reply-vote").innerHTML);
    if(upArrow.classList.contains("up-voted"))
    {
        vote-=2;
        document.getElementById("reply-vote").innerHTML = vote;
    }
    else
    {
        vote--;
        document.getElementById("reply-vote").innerHTML = vote;
    }
    upArrow.classList.remove("up-voted");
    upArrow.classList.add("not-voted");
    downArrow.classList.remove("not-voted");
    downArrow.classList.add("down-voted");
    upArrow.onclick = function(){changeGreen1()} ;
    downArrow.onclick = function(){} ;
}