levelcount = 30
unlockedlevels = localStorage.getItem("unlockedlevels")
if (unlockedlevels == null) {
    localStorage.setItem("unlockedlevels",1)
    unlockedlevels = 1
}
function getlevelbutton(num,locked) {
    let a = document.createElement("button")
    a.className = "levelbutton"
    if (num % 10 == 0)
        a.className += " coollevel"
    a.setAttribute("onclick",`openlevel(${num})`)
    a.textContent = num
    a.disabled = locked
    return a
}
function init() {
    let locked = false
    let a = document.getElementById("levels")
    let c = document.createElement("div")
    c.className = "levelrows"
    for (let i = 1; i <= parseInt(levelcount/10)+1; i++) {
        let b = document.createElement("div")
        b.className = "levelrow"
        b.id = `levelrow${i}`
        for (let j = 10*(i-1)+1; j <= 10*i; j++) {
            if (j > levelcount)
                break
            if (j > unlockedlevels)
                locked = true
            b.append(getlevelbutton(j,locked))
        }
        c.append(b)
    }
    a.append(c)
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
function setupbossform() {
    document.getElementById("questionpart").className += " BossModeQ"
    document.getElementById("answerpart").className += " BossModeA"
}
currentlevel = 0
function openlevel(num) {
    currentlevel = num
    preparelevelform()
    if (num % 10 == 0)
        setupbossform()
    let question = document.createElement("img")
    question.src = `questionbank/${num}.png`
    question.className = "question"
    document.getElementById("questionpart").append(question)
}
function min(a,b) {
    if (a > b)
        return b
    return a
}
function submitanswer() {
    let submitedanswer = document.getElementById("answer").value
    if (parseInt(submitedanswer) == QUESTIONS_answers[currentlevel-1]) {
        localStorage.setItem("unlockedlevels",parseInt(min(parseInt(localStorage.getItem("unlockedlevels")),currentlevel)+1))
        alert("Correct!")
        window.location.reload()
    } else {
        alert("Incorrect!")
    }
}