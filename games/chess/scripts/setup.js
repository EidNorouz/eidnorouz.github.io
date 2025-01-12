function pawn(team) { // team = true => team = white :) no racism, shut up, its just random choosing!
    a = document.createElement("div")
    a.className = "chesspiece pawn"
    a.setAttribute("onclick","makedecision(event.target)")
    if (team) a.className += "-white"; else a.className += "-black"
    return a
}
function bishop(team) { // team = true => team = white :) no racism, shut up, its just random choosing!
    a = document.createElement("div")
    a.className = "chesspiece bishop"
    a.setAttribute("onclick","makedecision(event.target)")
    if (team) a.className += "-white"; else a.className += "-black"
    return a
}
function rook(team) { // team = true => team = white :) no racism, shut up, its just random choosing!
    a = document.createElement("div")
    a.className = "chesspiece rook"
    a.setAttribute("onclick","makedecision(event.target)")
    if (team) a.className += "-white"; else a.className += "-black"
    return a
}
function knight(team) { // team = true => team = white :) no racism, shut up, its just random choosing!
    a = document.createElement("div")
    a.className = "chesspiece knight"
    a.setAttribute("onclick","makedecision(event.target)")
    if (team) a.className += "-white"; else a.className += "-black"
    return a
}
function queen(team) { // team = true => team = white :) no racism, shut up, its just random choosing!
    a = document.createElement("div")
    a.className = "chesspiece queen"
    a.setAttribute("onclick","makedecision(event.target)")
    if (team) a.className += "-white"; else a.className += "-black"
    return a
}
function king(team) { // team = true => team = white :) no racism, shut up, its just random choosing!
    a = document.createElement("div")
    a.className = "chesspiece king"
    a.setAttribute("onclick","makedecision(event.target)")
    if (team) a.className += "-white"; else a.className += "-black"
    return a
}
function placepiece(piece,room) {
    document.getElementById(room).innerHTML = ""
    document.getElementById(room).appendChild(piece)
}
function setupdefault() {
    // Black
    placepiece(rook(false),"a8")
    placepiece(knight(false),"b8")
    placepiece(bishop(false),"c8")
    placepiece(queen(false),"d8")
    placepiece(king(false),"e8")
    placepiece(bishop(false),"f8")
    placepiece(knight(false),"g8")
    placepiece(rook(false),"h8")
    placepiece(pawn(false),"a7")
    placepiece(pawn(false),"b7")
    placepiece(pawn(false),"c7")
    placepiece(pawn(false),"d7")
    placepiece(pawn(false),"e7")
    placepiece(pawn(false),"f7")
    placepiece(pawn(false),"g7")
    placepiece(pawn(false),"h7")
    // Now White
    placepiece(rook(true),"a1")
    placepiece(knight(true),"b1")
    placepiece(bishop(true),"c1")
    placepiece(queen(true),"d1")
    placepiece(king(true),"e1")
    placepiece(bishop(true),"f1")
    placepiece(knight(true),"g1")
    placepiece(rook(true),"h1")
    placepiece(pawn(true),"a2")
    placepiece(pawn(true),"b2")
    placepiece(pawn(true),"c2")
    placepiece(pawn(true),"d2")
    placepiece(pawn(true),"e2")
    placepiece(pawn(true),"f2")
    placepiece(pawn(true),"g2")
    placepiece(pawn(true),"h2")
}