let quizCount = document.querySelector(".quiz-count span")

let bullets = document.querySelector(".bullets")

let quizArea = document.querySelector(".quiz-area")

let answers = document.querySelector(".answers")

let submit = document.querySelector(".quiz .submit-btn")

let result = document.querySelector(".result")

let countDown = document.querySelector(".timer")




let count = 0 ;
let right = 0 ;
let intervalCont ;

function getJson () {
    fetch('quiz.json').then(res => res.json() ).then(data =>{
        let quistionObj = data
        let numOfObj = data.length
        
        bullet(numOfObj)

        getData(quistionObj[count] , numOfObj)

        timer(3 , numOfObj )

        
        submit.onclick = () =>{
            let rightAnswe = quistionObj[count].right_answer
            
            count++
            
            checkAnswer(rightAnswe , numOfObj)
            
            quizArea.innerHTML = ""
            answers.innerHTML = ""
            
            getData(quistionObj[count] , numOfObj)

            handleBullets()
        clearInterval(intervalCont)
            
            timer(3 , numOfObj )

            showResult(numOfObj)
        }
    }
    )
}


getJson()


function bullet(num) {
    quizCount.innerHTML = num

    for(let i = 0 ; i<num ;i++){

        let span = document.createElement("span")
        bullets.appendChild(span)
        if(i == 0 ){
            span.className = "on"
        }
    }
}

function getData(obj , index) {
    if(count < index){

        let titleQuiz = document.createElement("h1")
    
        titleQuiz.appendChild(document.createTextNode(obj.title))
    
        quizArea.appendChild(titleQuiz)
    
        for(let i = 1 ; i<=4 ; i++){
            let answer = document.createElement("div")
    
            answer.className = "answer"
    
            let radio = document.createElement("input")
    
            radio.type = "radio"
            radio.name = "qustion"
    
            radio.id = `qus${i}`
    
            radio.dataset.answer = obj[`answer_${i}`]
            answer.appendChild(radio)
    
            let label = document.createElement("label")
    
            label.appendChild(document.createTextNode(obj[`answer_${i}`]))
    
            label.htmlFor = `qus${i}`
            answer.appendChild(label)
            answers.appendChild(answer)
        }
    }
}

function checkAnswer(rAnswer , cou){
    let radios = document.getElementsByName("qustion")
    let choosen ;

    for(let i = 0 ; i<radios.length ; i++){
        
        if(radios[i].checked){
           choosen = radios[i].dataset.answer
        }
    }
    if(rAnswer == choosen){
        right++
        console.log(right)
    }
}

function handleBullets(){

    let arryOfBullet = Array.from(document.querySelectorAll(".bullets span"))

    arryOfBullet.forEach((ele , ind) =>{
        if(count == ind){
            ele.classList.add("on")
        }
    })
}

function showResult(num) {

    let res ;

    if(count === num){
        submit.remove()
        quizArea.remove()
        answers.remove()
        bullets.remove()

        if(right >(count / 2) && right<count){
            res = `<span class="good">Good </span> ${right} from ${count}`
        }else if(right == count){
            res = `<span class="perfect">perfect </span> ${right} from ${count}`
        }else{
            res = `<span class="bad">Bad </span> ${right} from ${count}`
        }
        result.innerHTML = res

        result.style.padding = "10px"
        result.style.margin = "10px 0"
        result.style.backgroundColor = "white"

    }
}

function timer (dur , coutIndex ) { 
    if(count < coutIndex){
        let sec , minute;
        intervalCont = setInterval(function () {
             minute = parseInt(dur / 60)
             sec = parseInt(dur % 60)
        
            minute = minute < 10 ? `0${minute}` : minute
            sec = sec < 10 ? `0${sec}` : sec
            countDown.innerHTML = `${minute} : ${sec}`
            
            if( --dur< 0){
                clearInterval(intervalCont)
                submit.click()
            }
        }, 1000);
    }

    
}
