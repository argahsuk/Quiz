// scrolling facts 
let scrollingElement = document.querySelector('#left');
let n = 1.1;
  setInterval(function()  {
      let x =  scrollingElement.scrollTop;
      scrollingElement.scrollTop += n;
      if(x>=scrollingElement.scrollHeight-scrollingElement.clientHeight){
        scrollingElement.scrollTop=0;
    }
    },20);
scrollingElement.addEventListener("mouseleave",function(){
    n=1.1;
})
scrollingElement.addEventListener("mouseenter",function(){
    n=0;
})


// selection on divclick
function selectOption(radioId) {
    document.getElementById(radioId).checked = true;
}

//quiz using api
let options;
let questiondata;
async function fq() {
    // clearing options
    for (let i = 1; i < 5; i++) {
        document.getElementById(`opt${i}`).checked=false;
    }
    // reseting bgc 
    document.querySelector('#right').style.backgroundColor = "";
    document.querySelector('#newq').innerHTML='Next question'
    // fetching api
    let response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    let data = await response.json()
    questiondata= data.results[0];
    console.log(questiondata)
    // display question
    document.querySelector('#quesh').innerHTML=questiondata.question

    // displaying options
     options = [...questiondata.incorrect_answers, questiondata.correct_answer];
    for (let i = 0; i < options.length; i++) {
        document.getElementById(`opt${i+1}`).value = options[i];
        document.getElementById(`label${i+1}`).innerHTML = options[i];
    }

}

// event listener for fq
let selectedOption;
document.querySelector('#newq').addEventListener('click',fq)
document.querySelector('#subbtn').addEventListener('click',function () {
     selectedOption = document.querySelector('input[name="opts"]:checked');
    if (!selectedOption) {
        alert("Please select an option ");
    }
    if (selectedOption.value === questiondata.correct_answer) {
        document.querySelector('#right').style.backgroundColor = "#90ee90";
    }
    else{
        document.querySelector('#right').style.backgroundColor = "#ff6961";
    }
})
