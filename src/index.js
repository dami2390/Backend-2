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
// import routerProduct from './routes/products.routes'
import productManager from './controllers/ProductManager.js'
import { __dirname } from './path.js'
import multer from 'multer'

//const upload = multer({dest:"src/public/img"})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const app = express()
const PORT = 4000



app.use(express.urlencoded({extended: true})) // Permite realizar consultas en la URL (req.query)
app.use(express.json()); // Permite que le envie JSON

/* app.get('/', (req, res) => {
    res.send("Este es mi primer servidor en Express")
}) */

app.get('/', async (req,res) => {
    let products = await productManager.getProducts()
    let limit = parseInt(req.query.limit)
    if (limit){
      let prodsLtd = products.slice(0, limit)
      res.send(prodsLtd)
    }else{
      res.send(products)
  }
})

// PARAMS

app.get('/products/:pid', async (req,res) => {
    const pId = req.params.pid
    let products = await productManager.getProducts()
    const product = products.find(product => product.id === parseInt(pId))
      if(product) {
          res.send(product)
      } else {
          res.send(`El producto no existe`)
      }
  })

  app.post('/', async (req, res) => { 
    let productos = await productManager.addProduct(req.body)
    res.send(productos)
})

/* app.post('/user', (req, res) => {
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
 */
app.listen(PORT, (err, result) => {
    console.log(`Server on port ${PORT}`)
})

// ROUTES

/* app.use('/api/products', routerProduct)

//Multer
app.post("/upload",upload.single("product"),(req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
}) */
