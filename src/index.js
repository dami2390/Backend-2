/* import http from 'http'

const PORT = null ?? 4000 // o traes el puerto del servidor, o el puerto 4000
                                // Req DATOs que entran // Res DATOS que salen
const server = http.createServer((req, res) => {
    res.end("Hola, este es mi primer servidor en NODE")
})

//Ejecutar server

server.listen(PORT, (err, result) => {
    console.log(`Server on port ${PORT}`)
})
 */

import express from 'express'

const app = express()
const PORT = 4000

const users = [
        { nombre: 'Agustin',
        apellido: 'Perez',
        id: 1,
        cargo: "profesor"
        },
        { nombre: 'Bruno',
        apellido: 'Lopez',
        id: 2,
        cargo: "tutor"
        },
        { nombre: 'Damian',
        apellido: 'Ferrara',
        id: 3,
        cargo: "tutor"
        }
]

app.use(express.urlencoded({extended: true})) // Permite realizar consultas en la URL (req.query)

app.get('/', (req, res) => {
    res.send("Este es mi primer servidor en Express")
})

app.get('/user', (req, res) => {
    let {cargo, nombre} = req.query
    /* console.log(cargo, nombre) */
    const usuarios = users.filter(user => user.cargo === cargo) // http://localhost:4000/user?cargo=tutor&nombre=Damian
    res.send(JSON.stringify(usuarios))
})

// PARAMS

app.get('/user/:idUser', (req, res) => {
    const idUser = req.params.idUser
    const user = users.find(user => user.id === parseInt(idUser))
    if(user){
        res.send(`Nombre de usuario ${user.apellido}` )
    }else {
        res.send(`No existe el user` )
    }
    
})

app.listen(PORT, (err, result) => {
    console.log(`Server on port ${PORT}`)
})

// QUERY

