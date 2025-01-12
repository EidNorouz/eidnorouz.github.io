
function roomvalid(room) {room = room.split(''); if (room.length != 2) return false; return "abcdefgh".includes(room[0]) && parseInt(room[1]) <= 8 && parseInt(room[1]) >= 1;}
function roomabove(room) {room.split(''); return room[0] + (parseInt(room[1])+1).toString();}
function roombelow(room) {room.split(''); return room[0] + (parseInt(room[1])-1).toString();}
function roomright(room) {k = "zabcdefghi"; room.split(''); return k[k.indexOf(room[0])+1] + room[1];}
function roomleft(room) {k = "zabcdefghi"; room.split(''); return k[k.indexOf(room[0])-1] + room[1];}
function isfree(room) {
    if (roomvalid(room)) return !haspiece(room); else return false;
}
function getpiece(room) {if (!document.getElementById(room).hasChildNodes()) return false; let a = document.getElementById(room).childNodes; for (let i = 0; i < a.length; i++) {if (a.item(i).className.includes("chesspiece")) return a.item(i);} return;}
function haspiece(room) {if (!document.getElementById(room).hasChildNodes()) return false; let a = document.getElementById(room).childNodes; for (let i = 0; i < a.length; i++) {if (a.item(i).className.includes("chesspiece")) return true;} return false;}
turn = true // true = White, false = Black // Shut up! no racism comment!
SELECTED_PIECE = ["pawn","white","d2"]
teamsRAW = "blackwhite"
function is_occupied_by_team(room,team) {
    if (roomvalid(room)) { if (!isfree(room)) {return getpiece(room).classList[1].split('-')[1] == team}; } else return false;
}
function findpossiblemoves(args) {
    possiblemoves = []
    if (args[0] == "pawn") {
        if (args[1] == "white") {
            if (isfree(roomabove(args[2]))) {possiblemoves.push(roomabove(args[2]))}
            if (args[2][1] == '2') {if (isfree(roomabove(roomabove(args[2])))) {possiblemoves.push(roomabove(roomabove(args[2])))}}
            if (is_occupied_by_team(roomabove(roomright(args[2])),teamsRAW.replace(args[1],""))) {possiblemoves.push(roomabove(roomright(args[2])))}
            if (is_occupied_by_team(roomabove(roomleft(args[2])),teamsRAW.replace(args[1],""))) {possiblemoves.push(roomabove(roomleft(args[2])))}
        }
        if (args[1] == "black") {
            if (isfree(roombelow(args[2]))) {possiblemoves.push(roombelow(args[2]))}
            if (args[2][1] == '7') {if (isfree(roombelow(roombelow(args[2])))) {possiblemoves.push(roombelow(roombelow(args[2])))}}
            if (is_occupied_by_team(roombelow(roomright(args[2])),teamsRAW.replace(args[1],""))) {possiblemoves.push(roombelow(roomright(args[2])))}
            if (is_occupied_by_team(roombelow(roomleft(args[2])),teamsRAW.replace(args[1],""))) {possiblemoves.push(roombelow(roomleft(args[2])))}
        }
    }
    if (args[0] == "knight") {
        knighthops = [roomabove(roomabove(roomright(args[2]))),roomabove(roomabove(roomleft(args[2]))),roomright(roomright(roomabove(args[2]))),roomright(roomright(roombelow(args[2]))),roomleft(roomleft(roomabove(args[2]))),roomleft(roomleft(roombelow(args[2]))),roombelow(roombelow(roomright(args[2]))),roombelow(roombelow(roomleft(args[2])))]
        knighthops.forEach(e => {
            if (roomvalid(e) && (!is_occupied_by_team(e,args[1]))) possiblemoves.push(e);
        });
    }
    if (args[0] == "bishop") {
        let e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomabove(roomright(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomabove(roomleft(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roombelow(roomleft(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roombelow(roomright(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
    }
    if (args[0] == "rook") {
        let e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomright(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomleft(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roombelow(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomabove(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
    }
    if (args[0] == "queen") {
        let e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomabove(roomright(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomabove(roomleft(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roombelow(roomleft(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roombelow(roomright(e))
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomright(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomleft(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roombelow(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
        e = args[2]
        while (roomvalid(e) && (!is_occupied_by_team(e,args[1]) || e == args[2])) {
            possiblemoves.push(e)
            e = roomabove(e)
            if (is_occupied_by_team(e,teamsRAW.replace(args[1],""))) {possiblemoves.push(e); break;}
        }
    }
    if (args[0] == "king") {
        movements = [roomabove(args[2]),roomright(args[2]),roomleft(args[2]),roombelow(args[2]),roomabove(roomright(args[2])),roomabove(roomleft(args[2])),roombelow(roomleft(args[2])),roombelow(roomright(args[2]))]
        movements.forEach((e)=>{if (roomvalid(e) && (!is_occupied_by_team(e,args[1]))) possiblemoves.push(e);})
    }
    possiblemoves_bug_fixed = []
    for (let i = 0; i < possiblemoves.length; i++) {
        if (args[2] != possiblemoves[i]) possiblemoves_bug_fixed.push(possiblemoves[i])
    }
    return possiblemoves_bug_fixed
}
function decisionmade(event) {
    if (haspiece(event.target.parentNode.id)) getpiece(event.target.parentNode.id).remove(); 
    event.target.parentNode.append(getpiece(SELECTED_PIECE[2])); 
    SELECTED_PIECE[2] = event.target.parentNode.id
    highlight_squares();
    turn = !turn;
    let k = [];
    if (turn) k = checkcheck("white"); else k = checkcheck("black");
    let ko = document.getElementsByClassName("checkalert");
    for (let i = 0; i < ko.length; i++) {ko.item(i).classList.remove("checkalert")}
    if (k.length > 0) {
        if (turn) document.getElementsByClassName("king-white").item(0).classList.add("checkalert")
        else document.getElementsByClassName("king-black").item(0).classList.add("checkalert")
    };
    if (getpiece(SELECTED_PIECE[2]).classList[1] == "pawn-white") {
        if (getpiece(SELECTED_PIECE[2]).parentNode.id.endsWith('8')) {
            promoted = false
            while (!promoted) {
                let a = prompt("Promote:\n    1. Queen\n    2. Knight\n    3. Rook\n    4. Bishop")
                getpiece(SELECTED_PIECE[2]).classList.remove("pawn-white");
                switch(a) {
                    case "1": getpiece(SELECTED_PIECE[2]).classList.add("queen-white"); promoted = true; break;
                    case "2": getpiece(SELECTED_PIECE[2]).classList.add("knight-white"); promoted = true; break;
                    case "3": getpiece(SELECTED_PIECE[2]).classList.add("rook-white"); promoted = true; break;
                    case "4": getpiece(SELECTED_PIECE[2]).classList.add("bishop-white"); promoted = true; break;
                }
            }
        }
    }
    if (getpiece(SELECTED_PIECE[2]).classList[1] == "pawn-black") {
        if (getpiece(SELECTED_PIECE[2]).parentNode.id.endsWith('1')) {
            promoted = false
            while (!promoted) {
                let a = prompt("Promote:\n    1. Queen\n    2. Knight\n    3. Rook\n    4. Bishop")
                getpiece(SELECTED_PIECE[2]).classList.remove("pawn-black");
                switch(a) {
                    case "1": getpiece(SELECTED_PIECE[2]).classList.add("queen-black"); promoted = true; break;
                    case "2": getpiece(SELECTED_PIECE[2]).classList.add("knight-black"); promoted = true; break;
                    case "3": getpiece(SELECTED_PIECE[2]).classList.add("rook-black"); promoted = true; break;
                    case "4": getpiece(SELECTED_PIECE[2]).classList.add("bishop-black"); promoted = true; break;
                }
            }
        }
    }
    checkmate_draw_check("white")
    checkmate_draw_check("black")
}
function HIGHLIGHT_SQUARE() {
    let e = document.createElement("div");
    e.setAttribute("onclick","decisionmade(event)");
    e.className = "HIGHLIGHTEDSPOT";
    return e;
}
function checkcheck(team) { // check for check :) // check if team <team> is in check and returns the things checking it
    let enemyteam = teamsRAW.replace(team,"")
    let king = document.getElementsByClassName("king-"+team).item(0);
    let checkers = [] // LOLLLLLL!
    let enemypieces = [];
    let allpieces = document.getElementsByClassName("chesspiece"); for (let i = 0; i < allpieces.length; i++) {if (allpieces.item(i).className.includes(enemyteam)) enemypieces.push(allpieces.item(i))}
    for (let i = 0; i < enemypieces.length; i++) {
        let e = enemypieces[i];
        let moves = findpossiblemoves([e.classList[1].split('-')[0],enemyteam,e.parentNode.id]);
        if (moves.includes(king.parentNode.id)) {checkers.push(e.parentNode.id)}
    }
    return checkers;
}
function checkmate_draw_check(team) {
    let yourpieces = [];
    let allpieces = document.getElementsByClassName("chesspiece"); for (let i = 0; i < allpieces.length; i++) {if (allpieces.item(i).className.includes(team)) yourpieces.push(allpieces.item(i))}
    nomovesavailable = true
    for (let i = 0; i < yourpieces.length; i++) {
        let e = yourpieces[i];
        args = e.classList[1].split("-"); args.push(e.parentNode.id)
        if (getvalidmoves(args).length > 0) {nomovesavailable = false; break;}
    }
    if (nomovesavailable) {if (checkcheck(team).length > 0) alert("CHECKMATE!"); else alert("DRAW!")}
}
function highlight_squares(rooms=[]) {
    let a = document.getElementsByClassName("HIGHLIGHTEDSPOT").length
    for (let i = 0; i < a; i++) {
        document.getElementsByClassName("HIGHLIGHTEDSPOT").item(0).remove()
    }
    rooms.forEach(e => {
        document.getElementById(e).append(HIGHLIGHT_SQUARE())
    });
}
function getvalidmoves(args) {
    SELECTED_PIECE = args;
    possiblemoves = findpossiblemoves(args); // raw possible moves, unchecked if it results in check or not
    validmoves = []
    possiblemoves.forEach((e)=>{
        let kk = getpiece(SELECTED_PIECE[2])
        let tcc = haspiece(e)
        if (tcc && getpiece(e).classList[1].split("-")[0] == "king") {console.log("bananas bro")} else {
            if (tcc) {
                cc = getpiece(e).cloneNode()
                getpiece(e).remove()
            }
            document.getElementById(e).append(kk)
            if (turn) {checkers = checkcheck("white")} else {checkers = checkcheck("black")} 
            if (checkers.length == 0)
                validmoves.push(e)
            document.getElementById(args[2]).append(kk)
            if (tcc) {document.getElementById(e).append(cc)}
        }
    })
    return validmoves;
}
function makedecision(element) {
    args = element.classList[1].split("-"); args.push(element.parentNode.id) // ["pawn","black","e7"]
    if (turn && args[1] == "black") return; else if (!turn && args[1] == "white") return;
    let k = document.getElementsByClassName("selectedpiece");
    for (let i = 0; i < k.length; i++) {k.item(i).classList.remove("selectedpiece")}
    element.classList.add("selectedpiece")
    SELECTED_PIECE = args
    validmoves = getvalidmoves(args)
    highlight_squares(validmoves)
}