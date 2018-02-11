var questionList;

function populateQuestionList() {
    getQuestionList();
    sortByDescendingVotes();
    var questionRow = document.getElementById("question-template").innerHTML;
    var template = Handlebars.compile(questionRow);
    document.getElementById("question-list").innerHTML += template(questionList);
}

function getQuestionList() {
    // This is where the list of questions will be retrieved from the database
    var questions = [
        {
            id: "53H27RH723HDH29",
            title: "How to make a website?",
            text: "I would like to use Express and MongoDB to make a website",
            nbOfVotes: 0,
            nbOfAnswers: 1,
            author: "John Doe",
            date: "10/02/2018 13:26:01"
        },
        {
            id: "QGUUHPM2JI00WVH",
            title: "How do I use Handlebars?",
            text: "I need help setting this up",
            nbOfVotes: 2,
            nbOfAnswers: 1,
            author: "Jane Smith",
            date: "09/02/2018 13:15:03"
        },
        {
            id: "DFV0GJ1ZW84M4O2",
            title: "Website works perfectly on local host but blank page on server",
            text: "Please help",
            nbOfVotes: 3,
            nbOfAnswers: 2,
            author: "Mark Johnson",
            date: "09/02/2018 08:10:12"
        },
        {
            id: "HP18R7CWTT9NLW7",
            title: "How to find out what is being modified by an Update query in mongodb?",
            text: "Help pleeease",
            nbOfVotes: 0,
            nbOfAnswers: 1,
            author: "Billie Terry",
            date: "08/02/2018 17:30:04"
        },
        {
            id: "4CJZ6F6F0VDUU4X",
            title: "Vertical-Align with Bootstrap 3?",
            text: "Can someone show me how to do this",
            nbOfVotes: 0,
            nbOfAnswers: 1,
            author: "John Doe",
            date: "10/02/2018 02:43:46"
        }
    ];

    for (var i =0; i<questions.length; i++){
        questions[i].relativeDate = moment(questions[i].date, "DD/MM/YYYY HH:mm:ss").fromNow();
    }

    questionList = {
        questions: questions
    };
}

function sortByDescendingVotes(){
    questionList.questions.sort(compare);
}

function compare(a, b){
    const votesA = a.nbOfVotes;
    const votesB = b.nbOfVotes;

    var comparison = 0;
    if (votesA > votesB)
        comparison = -1;
    else if (votesA < votesB)
        comparison = 1;
    return comparison;
}