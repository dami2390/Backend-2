import * as fs from "fs";

export class ProductManager {
  constructor(path) {
    
    /* this.products = []; */
    this.path = "./src/models/products.txt";
  }

/*   static addId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }
    return this.id;
  } */

  async addProduct(producto) {
    const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    const prodCode = prods.map((prod) => prod.code);
    const prodExist = prodCode.includes(producto.code); 
    if (prodExist) {
        return console.log (`Ya existe el código ${producto.code}. Ingresá otro.`)
    } else if (Object.values(producto).includes("") || Object.values(producto).includes(null)) {
        return console.log("Todos los campos deben son obligatorios.");
    } else {
    let prevIds = prods.map(prod => parseInt(prod.id))
    this.id = (Math.max(...prevIds) + 1)
    const nuevoProducto = {id: this.id, ...producto};
    prods.push(nuevoProducto)
    await fs.promises.writeFile(this.path, JSON.stringify(prods))
    return "Producto creado"
    }
}

  getProducts = async () => {
    let data = await fs.promises.readFile(this.path, "utf-8");
    let salida = await JSON.parse(data);
    this.products = salida;
    return this.products;
  };


  getProductById = async(id) => {
 
    const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    const findProduct = prods.find((prod) => prod.id === parseInt(id));
    if (findProduct) {
        console.log(`Se ha encontrado el siguiente producto: ${findProduct.title}`)
        return findProduct;
    } else {
        return console.log("No se ha encontrado ningún producto");
    }
} 
  

  async updateProduct(id, {title, description, price, thumbnail, code, stock}) {
    const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    if(prods.some(prod => prod.id === parseInt(id))) {
        let index= prods.findIndex(prod => prod.id === parseInt(id))
        prods[index].title = title
        prods[index].description = description
        prods[index].price = price
        prods[index].thumbnail = thumbnail
        prods[index].code = code
        prods[index].stock = stock
        await fs.promises.writeFile(this.path, JSON.stringify(prods))
        return "Producto actualizado"
    } else {
        return "Producto no encontrado"
    }
}

  deleteProductById = async (id) => {
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = await JSON.parse(cont)
    this.products = aux
    let delProdIndex = this.products.findIndex(product => product.id === id)
    console.log(`Se borrará el producto con el ID: ${id}`),
    this.products.splice(delProdIndex,1)

    let update = await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    return "Producto eliminado"
    }
}

/* const productManager = new ProductManager();

export default productManager */
