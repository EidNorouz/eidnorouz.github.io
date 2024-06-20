levelcount = 10
unlockedlevels = localStorage.getItem("unlockedlevels")
if (unlockedlevels == null) {
    localStorage.setItem("unlockedlevels",1)
    unlockedlevels = 1
}
function getlevelbutton(num,locked) {
    let a = document.createElement("button")
    a.className = "levelbutton"
    a.setAttribute("onclick",`openlevel(${num})`)
    a.textContent = num
    a.disabled = locked
    return a
}
function init() {
    let locked = false
    let a = document.getElementById("levels")
    for (let i = 1; i <= levelcount; i++) {
        if (i > unlockedlevels)
            locked = true
        a.append(getlevelbutton(i,locked))
    }
}
function preparelevelform() {
    document.getElementById("levelpart").remove()
    document.body.style.backgroundColor = "gray"
    let questionpart = document.createElement("div")
    questionpart.className = "questionpart"
    questionpart.id = "questionpart"
    document.body.append(questionpart)
    let answerpart = document.createElement("div")
    answerpart.className = "answerpart"
    answerpart.id = "answerpart"
    let anscont = document.createElement("answercontainer")
    anscont.className = "answercontainer"
    anscont.id = "answercontainer"
    let answer = document.createElement("input")
    answer.setAttribute("type","number")
    answer.className = "answer"
    answer.id = "answer"
    anscont.append(answer)
    let answerbut = document.createElement("button")
    answerbut.setAttribute("onclick","submitanswer()")
    answerbut.className = "answerbut"
    answerbut.textContent = "Ok!"
    answerbut.id = "answerbut"
    anscont.append(answerbut)
    answerpart.append(anscont)
    document.body.append(answerpart)
}
currentlevel = 0
function openlevel(num) {
    currentlevel = num
    preparelevelform()
    let question = document.createElement("img")
    question.src = `questionbank/${num}.png`
    question.className = "question"
    document.getElementById("questionpart").append(question)
}
function submitanswer() {
    let submitedanswer = document.getElementById("answer").value
    if (parseInt(submitedanswer) == QUESTIONS_answers[currentlevel-1]) {
        localStorage.setItem("unlockedlevels",parseInt(localStorage.getItem("unlockedlevels"))+1)
        alert("Correct!")
        window.location.reload()
    } else {
        alert("Incorrect!")
    }
}