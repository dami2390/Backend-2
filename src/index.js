import express from 'express'
import routerProduct from './routes/products.routes.js';
import routerCart from "./routes/carritos.routes.js";
import { __dirname } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io';

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

//middle

app.use(express.urlencoded({extended: true})) // Permite realizar consultas en la URL (req.query)
app.use(express.json()); // Permite que le envie JSON
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


// ROUTES

app.use('/api/products', routerProduct)


app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})

////////////////////////////////////////////////////////////////

app.listen(PORT, (err, result) => {
    console.log(`Server on port ${PORT}`)
})



//HBS
/* app.get('/', (req, res) => {
    res.render("home", {//renderizar la vista siguiente
        mensaje:"Pepe"
    
    })
})
 */

//Multer
/*app.post("/upload",upload.single("product"),(req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
}) */
