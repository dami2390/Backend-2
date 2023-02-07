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
app.use(express.json()); // Permite que le envie JSON

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

app.post('/user', (req, res) => {
    let {nombre, apellido, cargo} = req.body
    const indice = users.length //le mando uno más, para poder sumarlo
    users.push({nombre: nombre, apellido: apellido, cargo: cargo, id: indice})
    res.send("Usuario creado")
    
})

app.put('/user/:id', (req, res) => { // actualiza todos los campos. si quiero modificar uno solo, metodo PATCH
    let {nombre, apellido, cargo} = req.body
    const indice = users.findIndex( usuario => usuario.id === parseInt(id)) 
    users[indice].cargo = cargo
    users[indice].apellido = apellido
    users[indice].nombre = nombre
    res.send("Usuario creado")
    
})

app.delete('/user/:idUser', (req, res) => {
    const idUser = req.params.idUser
    const index = users.findIndex(user => user.id === parseInt(idUser))
    if(index != -1){
        users.splice(index, 1)
        res.send(`Usuario eliminado` )
    }else {
        res.send(`No existe el user` )
    }
    
})

app.listen(PORT, (err, result) => {
    console.log(`Server on port ${PORT}`)
})

// QUERY

