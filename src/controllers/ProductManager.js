import * as fs from "fs";

class ProductManager {
  constructor(path) {
    
    /* this.products = []; */
    this.path = "./src/models/products.txt";
  }

  static addId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }
    return this.id;
  }

  async addProduct(producto) {
    const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    producto.id = ProductManager.addId()
    prods.push(producto)
    await fs.promises.writeFile(this.path, JSON.stringify(prods))
    return "Producto creado"
}

  getProducts = async () => {
    let data = await fs.promises.readFile(this.path, "utf-8");
    let salida = await JSON.parse(data);
    this.products = salida;
    return this.products;
  };

  /*  async getProducts() {
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  } */

  async getProductById(id) {
    try {
      let products = await this.getProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error(error);
      return "Producto no encontrado"
    }
  }

  async updateProduct(id, {title, description, price, thumbnail, code, stock}) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
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

    }
}

const productManager = new ProductManager();

export default productManager
