import express from 'express'
import routerProduct from './routes/products.routes.js';
import routerCart from "./routes/carritos.routes.js";
import { __dirname } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io';
import routerSocket from "./routes/socket.routes.js";
import { ProductManager } from "./controllers/ProductManager.js";

const productManager = new ProductManager('src/models/products.txt');

//const upload = multer({dest:"src/public/img"}) Forma basica de multer
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

const server = app.listen(PORT, (err, result) => {
    console.log(`Server on port ${PORT}`)
})


////////////////////////////////////////////////////////////////


// Server IO

const io = new Server(server)

io.on("connection", async (socket) => { //io.on es cuando se establece la conexion
    console.log("Cliente conectado")

    socket.on("addProduct", async info => {//Cuando recibo informacion de mi cliente
        socket.emit("msgAddProduct", await productManager.addProduct(info, []))
        socket.emit("getProducts", await productManager.getProducts())
    })
    

    socket.on("deleteProduct", async id => {
        socket.emit("msgDeleteProduct", await productManager.deleteProductById(parseInt(id)))
        socket.emit("getProducts", await productManager.getProducts())
    })

    socket.emit("getProducts", await productManager.getProducts());
})



//middle

app.use(express.urlencoded({extended: true})) // Permite realizar consultas en la URL (req.query)
app.use(express.json()); // Permite que le envie JSON
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


// ROUTES

app.use('/api/products', routerProduct)


app.use('/', express.static(__dirname + '/public')) // static
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
/* app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
}) */
app.use('/', routerSocket)
app.use('/realtimeproducts', routerSocket)
