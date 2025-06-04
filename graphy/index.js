graphboard = null
graph = null
zoommultiplier = 1
function init() {
    graphboard = document.getElementById("graphboard")
    graph = graphboard.getContext('2d')
    graphmargin = [[0,0],[parseInt(graphboard.getAttribute("width"))/2,parseInt(graphboard.getAttribute("height"))/2],[parseInt(graphboard.getAttribute("width")),parseInt(graphboard.getAttribute("height"))]]
    addEventListener(("keydown"),(e)=>{
        if (e.key == "w") { graphmargin[1][1]+=1/zoommultiplier; graphreset(); graphs();}
        if (e.key == "s") { graphmargin[1][1]-=1/zoommultiplier; graphreset(); graphs();}
        if (e.key == "d") { graphmargin[1][0]-=1/zoommultiplier; graphreset(); graphs();}
        if (e.key == "a") { graphmargin[1][0]+=1/zoommultiplier; graphreset(); graphs();}
    })
}
function graphreset() {
    graph.reset()
    canvasaxis()
}
/*function getinput() {
    return (x) => {return math.evaluate(document.getElementById("function_part").value.replaceAll("x","(" + x + ")"))};
}*/
function canvasaxis() {
    graph.beginPath()
    graph.setLineDash([])
    graph.strokeStyle = "red"
    graph.fillStyle = document.getElementById("BGCOLOR").value
    graph.fillRect(0,0,graphmargin[2][0],graphmargin[2][1])
    graph.moveTo(graphmargin[1][0], graphmargin[0][1])
    graph.lineTo(graphmargin[1][0], graphmargin[2][1])
    graph.moveTo(graphmargin[0][1], graphmargin[1][1])
    graph.lineTo(graphmargin[2][1], graphmargin[1][1])
    graph.stroke()
}
function getgraphlist() {
    let a = []
    let co = []
    let c = document.getElementsByClassName("BROIMANIDIOT")
    for (let x = 0; x < c.length; x++) {
        let k = c.item(x).value
        co.push(c.item(x).getAttribute("graphcolor"))
        if (k.replaceAll(" ","") != "")
            a.push(k)
    }
    return [a,co];
}
function randomize(min,max) {
    return parseInt(min) + Math.floor(Math.random()*(parseInt(max)-parseInt(min)))
}
function graphs(graphlist = getgraphlist()[0], graphcolors = getgraphlist()[1]) {
    graphreset()
    for (let y = 0; y < graphlist.length; y++) {
        let func = function (x,formula) {return math.evaluate(SUPERPARSE(formula,x))};
        drawgraph(func,graphlist[y],graphcolors[y])
    }
}
function SUPERPARSE(text,z,zacc=0) {
    text = text.replaceAll("x",`(${(z-zacc)*zoommultiplier})`).replaceAll("t",`(${(z-zacc)*zoommultiplier})`).replaceAll("z",`(${(z-zacc)*zoommultiplier})`).split("{rnd");
    for (let i = 1; i < text.length; i++) {
        let kk = text[i].split("}")
        let rndgen = kk[0].split(",")
        let rndnum = randomize(math.evaluate(rndgen[0]),math.evaluate(rndgen[1]))
        kk.shift();
        text[i] = `(${rndnum})` + kk.join('')
    } return text.join('')
}
function timestorepeatmakeupforfloattimeout(t) {
if (0 < t && t < 1)
    return 1/t
else
    return 1
}
function graphsprime() {
    graphreset()
    zlim = parseInt(document.getElementById("zlimit").value)
    zstart = parseInt(document.getElementById("zstart").value)
    formula1 = document.getElementById("singleinp1").value
    formula2 = document.getElementById("singleinp2").value
    graph.beginPath()
    graph.setLineDash([])
    zacc = 1/parseInt(document.getElementById("zacc").value)
    graph.strokeStyle = "rgb(0,0,0)"
    ztime = parseFloat(document.getElementById("animtime").value)
    if(ztime != 0) {
        z = zacc+parseInt(zstart)
        func = (formula1,formula2,zacc,zlim,z,ztime) => {setTimeout(()=>{
            for (let i = 0; i < timestorepeatmakeupforfloattimeout(ztime); i++) {
            if (document.getElementById("PLOTPOINT").checked) {
                graph.fillStyle = `rgb(100,100,100)`
                graph.strokeStyle = `rgb(50,50,50)`
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z,zacc)),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z)),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
            } else {
            graph.moveTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z,zacc)))
            graph.lineTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z)))
        }
                        
        graph.stroke()
        z += zacc;
        if (z >= zlim)
            break
    }
        if (z < zlim)
            func(formula1,formula2,zacc,zlim,z,ztime)
        },ztime)}
        func(formula1,formula2,zacc,zlim,z,ztime)
    }
    else {
        for (let z = zacc+parseInt(zstart); z <= zlim; z+=zacc) {
            if (document.getElementById("PLOTPOINT").checked) {
                graph.fillStyle = `rgb(100,100,100)`
                graph.strokeStyle = `rgb(50,50,50)`
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z,zacc)),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z)),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
            } else {
            graph.moveTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z,zacc)))
            graph.lineTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z)),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula2,z)))
        }}
    }
    graph.stroke()
}
function graphszegon() {
    graphreset()
    zlim = parseInt(document.getElementById("alimit").value)
    formula1 = document.getElementById("anginp1").value
    graph.beginPath()
    graph.setLineDash([])
    zacc = 1/parseInt(document.getElementById("aacc").value)
    graph.strokeStyle = "rgb(50,0,50)"
    ztime = parseFloat(document.getElementById("animtime").value)
    if(ztime != 0) {
        z = zacc
        func = (formula1,zacc,zlim,z,ztime) => {setTimeout(()=>{
            if (document.getElementById("PLOTPOINT").checked) {
                graph.fillStyle = `rgb(100,100,100)`
                graph.strokeStyle = `rgb(50,50,50)`
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`cos(${(z-zacc)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`sin(${(z-zacc)*zoommultiplier})`),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`cos(${(z)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`sin(${(z)*zoommultiplier})`),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
            } else {
            graph.moveTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`cos(${(z-zacc)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`sin(${(z-zacc)*zoommultiplier})`))
            graph.lineTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`cos(${(z)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`sin(${(z)*zoommultiplier})`))
            }
            graph.stroke()
            z += zacc;
            if (z < zlim)
                func(formula1,zacc,zlim,z)
        },ztime)}
        func(formula1,zacc,zlim,z,ztime)
    }
    else {
        for (let z = zacc; z <= zlim; z+=zacc) {
            if (document.getElementById("PLOTPOINT").checked) {
                graph.fillStyle = `rgb(100,100,100)`
                graph.strokeStyle = `rgb(50,50,50)`
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`cos(${(z-zacc)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`sin(${(z-zacc)*zoommultiplier})`),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
                graph.arc(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`cos(${(z)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`sin(${(z)*zoommultiplier})`),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
            } else {
            graph.moveTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`cos(${(z-zacc)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z,zacc))*math.evaluate(`sin(${(z-zacc)*zoommultiplier})`))
            graph.lineTo(graphmargin[1][0]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`cos(${(z)*zoommultiplier})`),graphmargin[1][1]-math.evaluate(SUPERPARSE(formula1,z))*math.evaluate(`sin(${(z)*zoommultiplier})`))
        }}
    }
    graph.stroke()
}
function drawgraph(func,formula,colorZ=`rgb(${randomize(0,200)},${randomize(0,200)},${randomize(0,200)})`) {
    graph.beginPath()
    graph.setLineDash([])
    graph.strokeStyle = colorZ
    for (let x = 0; x < graphmargin[2][0]-1; x++) {
        try {
            cx = (x-graphmargin[1][0])
            if (document.getElementById("PLOTPOINT").checked) {
                graph.fillStyle = `rgb(100,100,100)`
                graph.strokeStyle = `rgb(50,50,50)`
                graph.arc(x,graphmargin[1][1]-func(cx , formula),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
                graph.arc(x+1,graphmargin[1][1]-func(cx+1 , formula),document.getElementById("PLOTSIZE").value/10,0,2*Math.PI)
                graph.fill()
                graph.stroke()
                graph.beginPath()
                graph.setLineDash([])
                graph.strokeStyle = colorZ
            } else {
                graph.moveTo(x,graphmargin[1][1]-func(cx , formula))
                graph.lineTo(x+1,graphmargin[1][1]-func((cx+1) , formula))
            }
        } catch {
            console.error("Oops! Undefined!")
        }
    }
    graph.stroke()
}