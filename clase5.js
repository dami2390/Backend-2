const fs = require('fs').promises

// Callbacks sincronicos

                   //Ruta          //Valor
/* fs.writeFileSync('./ejemplo.txt',"Hola que tal")

if(fs.existsSync('./ejemplo.txt')){ //array.some() me devuelve T/F si existe o no
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')//leo el contenido
    console.log(contenido)
    fs.appendFileSync('./ejemplo.txt','\nBuenas noches' )
    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(contenido)
    fs.unlinkSync('./ejemplo.txt') //Elimina el archivo
}  */

// Callbacks asincronicos

/* fs.writeFile('./ejemplo.txt', "Hola", (error) => {
    if(error) {
        return console.error("Error en escritura")
    }
    fs.readFile('./ejemplo.txt','utf-8',(error, resultado) => {
        if(error) {
            return console.error("Error en lectura1")
        }
        console.log(resultado)
        fs.appendFile('./ejemplo.txt',' que tal como va?', (error) => {
            if(error) {
                console.error("Error en append")
            }
            fs.readFile('./ejemplo.txt','utf-8',(error, resultado) => {
                if(error) {
                    return console.error("Error en lectura 2")
                }
                console.log(resultado)
                fs.unlink('./ejemplo.txt', (error) => {
                    if(error) {
                        return console.error("Error en eliminacion")
                    }
                })
            })
        })
    })
}) */

// Asincronia con promesas
/* import {promises as fs} from 'fs' */ // nos ahorramos el .promises


/* 
const consultasTXT = async (ruta) => {
    await fs.writeFile(ruta, "Hola")
    let contenido = await  fs.readFile('./ejemplo.txt', 'utf-8')//leo el contenido
    console.log(contenido)
    await fs.appendFile('./ejemplo.txt','\nBuenas noches' )
    contenido = await fs.readFile('./ejemplo.txt', 'utf-8')
    console.log(contenido)
    await fs.unlink('./ejemplo.txt') //Elimina el archivo
}

consultasTXT('./ejemplo.txt') */
const productos = [{nombre: "Hola"}]

const consultasTXT = async (ruta) => {
    await fs.writeFile(ruta, "")
    let contenido = await  fs.readFile('./ejemplo.txt', 'utf-8')//leo el contenido
    console.log(contenido)
    await fs.appendFile('./ejemplo.txt', JSON.stringify(productos))
    contenido = await fs.readFile('./ejemplo.txt', 'utf-8')
    console.log(JSON.parse(contenido))
    await fs.unlink('./ejemplo.txt') //Elimina el archivo
}

consultasTXT('./ejemplo.txt')