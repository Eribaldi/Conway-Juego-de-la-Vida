let filas = 40  
let columnas = 40
let lado = 20
let duplicado = []

document.addEventListener("keydown", (e)=>{
    e.preventDefault()
    switch(e.keyCode){
        case 39:
            siguienteEstado()
            break;

            default:

                break;
    }
})

generarTablero()



function generarTablero(){
    let html = "<table cellpadding=0 cellspacing=0 id='tablero'>"
    for (let x = 0; x < filas; x++){
        html += "<tr>"
        for (let y = 0; y < columnas; y++){
            html += `<td id="celula-${x + "-" + y}" onmouseup ="cambiarEstado(${x}, ${y})">` 
                html += "</td>"
        }
        html += "</tr>"

    }
    html += "</table>"
    let contenedor = document.getElementById("conten-tablero")
    contenedor.innerHTML = html
    let tablero = document.getElementById("tablero")
    tablero.style.width = lado*columnas + "px"
    tablero.style.height = lado*filas + "px"
}

function cambiarEstado(x,y){
    let celula = document.getElementById(`celula-${x + "-" + y}`)
    if(celula.style.background != "black"){
        celula.style.background = "black"
    }else{
        celula.style.background = ""
    }
    
}

function duplicar(){
    duplicado=[]
    for (let x = 0; x < columnas; x++){
        duplicado.push([])
        for(let y = 0; y < columnas; y++){
            let celula = document.getElementById(`celula-${x + "-" + y}`)
            duplicado[x][y] = celula.style.background == "black"
        }
    }
}

function contarVivas(x,y){
    let vivas = 0
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i == 0 && j == 0){
                continue
            }
            try {
                if (duplicado[x + i][y + j]){
                    vivas++
                }
                
            } catch (e) { }

            if(vivas > 3){
                return vivas
            }
        }
    }
    return vivas
}

function siguienteEstado(){
    duplicar()
    for (let x = 0; x < columnas; x++){
        for(let y = 0; y < columnas; y++){
            let vivas = contarVivas(x,y)
            let celula = document.getElementById(`celula-${x + "-" + y}`)
            if (duplicado[x][y]){ // Esta viva la celula
                if (vivas < 2 || vivas > 3){
                    celula.style.background = "" // Se murioooooo
                }
            }
            else{
                if(vivas ==3){
                    celula.style.background = "black"
                }
            }
        }
    }
}