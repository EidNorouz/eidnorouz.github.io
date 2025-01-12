function swap_background() {
    console.log("boop")
    let WBG = document.getElementsByClassName("WhiteBG")
    let BBG = document.getElementsByClassName("BlackBG")
    switch (document.body.style.backgroundImage) {
        case "url(\"Backgrounds/bg.jpg\")":
            document.body.style.backgroundImage = "url(\"Backgrounds/bg2.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "rgb(200,200,200)";
                BBG.item(i).style.backgroundColor = "rgb(50,50,50)";
            }
            break;
        case "url(\"Backgrounds/bg2.jpg\")":
            document.body.style.backgroundImage = "url(\"Backgrounds/bg3.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "lightblue";
                BBG.item(i).style.backgroundColor = "rgb(50,50,100)";
            }
            break;
        case "url(\"Backgrounds/bg3.jpg\")":
            document.body.style.backgroundImage = "url(\"Backgrounds/bg4.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "lightblue";
                BBG.item(i).style.backgroundColor = "rgb(50,50,200)";
            }
            break;
        case "url(\"Backgrounds/bg4.jpg\")":
            document.body.style.backgroundImage = "url(\"Backgrounds/bg5.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "lightcoral";
                BBG.item(i).style.backgroundColor = "rgb(150,0,0)";
            }
            break;
        case "url(\"Backgrounds/bg5.jpg\")":
            document.body.style.backgroundImage = "url(\"Backgrounds/bg.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "rgb(210,210,210)";
                BBG.item(i).style.backgroundColor = "darkgreen";
            }
            break;
        default:
            document.body.style.backgroundImage = "url(\"Backgrounds/bg.jpg\")";
    }
}
function updatetheme() {
    let WBG = document.getElementsByClassName("WhiteBG")
    let BBG = document.getElementsByClassName("BlackBG")
    switch (boardcurrenttheme) {
        case 1:
            document.body.style.backgroundImage = "url(\"Backgrounds/bg.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "rgb(210,210,210)";
                BBG.item(i).style.backgroundColor = "darkgreen";
            } break;
        case 2:
            document.body.style.backgroundImage = "url(\"Backgrounds/bg2.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "rgb(200,200,200)";
                BBG.item(i).style.backgroundColor = "rgb(50,50,50)";
            }
            break;
        case 3:
            document.body.style.backgroundImage = "url(\"Backgrounds/bg3.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "lightblue";
                BBG.item(i).style.backgroundColor = "rgb(50,50,100)";
            }
            break;
        case 4:
            document.body.style.backgroundImage = "url(\"Backgrounds/bg4.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "lightblue";
                BBG.item(i).style.backgroundColor = "rgb(50,50,200)";
            }
            break;
        case 5:
            document.body.style.backgroundImage = "url(\"Backgrounds/bg5.jpg\")";
            for (let i = 0; i < 32; i++) {
                WBG.item(i).style.backgroundColor = "lightcoral";
                BBG.item(i).style.backgroundColor = "rgb(150,0,0)";
            }
            break;
        default:
            boardcurrenttheme = 1
            updatetheme()
    }
    switch (currenttheme) {
        case 1:
            document.getElementById("ps1").removeAttribute("disabled")
            document.getElementById("ps2").setAttribute("disabled","true")
            break;
        case 2:
            document.getElementById("ps1").setAttribute("disabled","true")
            document.getElementById("ps2").removeAttribute("disabled")
            break;
        default:
            currenttheme = 1
            updatetheme()
    }
}
currenttheme = 1
function swap_chesspieces() {
    console.log("pooh")
    if (currenttheme == 1) {
        document.getElementById("ps1").setAttribute("disabled","true")
        document.getElementById("ps2").removeAttribute("disabled")
        currenttheme = 2
    }
    if (currenttheme == 2) {
        document.getElementById("ps1").removeAttribute("disabled")
        document.getElementById("ps2").setAttribute("disabled","true")
        currenttheme = 1
    }
}
settings_text = `Settings:
    1. Display Settings
    2. Theme Settings
    3. Gamemodes (coming soon)`
const boardmaxthemes = 5
const piecemaxthemes = 2
boardcurrenttheme = 1
function theme_settings() {
    let theme_settings_text = `Settings/Theme Settings:\n    Board: ${boardcurrenttheme}/${boardmaxthemes}\n    Pieces: ${currenttheme}/${piecemaxthemes}\n\nNote: example command "Board 3"`
    let b = prompt(theme_settings_text)
    let args = b.toLowerCase().split(" ");
    switch (args[0]) {
        case "board":
            if (0 < parseInt(args[1]) && parseInt(args[1]) <= boardmaxthemes) {
                boardcurrenttheme = parseInt(args[1])
            } break;
        case "piece": case "pieces":
            if (0 < parseInt(args[1]) && parseInt(args[1]) <= piecemaxthemes) {
                currenttheme = parseInt(args[1])
            } break;
        default:
            alert("Invalid option!")
            break;
    }
    updatetheme()
}
CurScale = 0
Scales = ["Medium","Large"]
function display_settings() {
    let b = prompt(`Settings/Display Settings:\n    Scale: ${Scales[CurScale]}\n\nNote: this is toggle like function, so just send Scale nothing more`)
    switch (b.toLowerCase()) {
        case "scale":
            if (CurScale == 0) CurScale = 1; else CurScale = 0;
            break;
        default:
            alert("Invalid option!")
    }
    if (CurScale == 1) {document.body.innerHTML = document.body.innerHTML.replaceAll("mediumDSC","largeDSC");}
    else {document.body.innerHTML = document.body.innerHTML.replaceAll("largeDSC","mediumDSC");}
}
function settings() {
    let a = prompt(settings_text)
    switch (a) {
        case "1":
            display_settings()
            break;
        case "2":
            theme_settings()
            break;
        case "3":
            alert("In Development...")
            break;
        default:
            alert("Invalid option!")
    }
}