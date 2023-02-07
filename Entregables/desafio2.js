import * as fs from "fs";

class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = "";
    this.products = [];
    this.path = "./products.txt";
  }

  static addId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }
    return this.id;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
      return;
    }

    const products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    for (let i = 0; i < products.length; i++) {
      if (products[i].code === code) {
        console.log("Code must be unique");
        return;
      }
    }

    const newProduct = {
      id: ProductManager.addId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
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
    }
  }

  updateProductById = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    let updatedProd = { id, title, description, price, thumbnail, code, stock };
    let cont = await fs.promises.readFile(this.path, "utf-8");
    let aux = await JSON.parse(cont);
    this.products = aux;
    let updProdIndex = this.products.findIndex((product) => product.id === id);
    this.products.splice(updProdIndex, 1);
    this.products.push(updatedProd);

    let update = await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products)
    );
  };

  deleteProductById = async (id) => {
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = await JSON.parse(cont)
    this.products = aux
    let delProdIndex = this.products.findIndex(product => product.id === id)
    console.log(`The product with the following ID will be removed:: ${id}`),
    this.products.splice(delProdIndex,1)

    let update = await fs.promises.writeFile(this.path, JSON.stringify(this.products))

    }
}

const test = async () => {
  await productManager.addProduct(
    "product 1",
    "descrip 1",
    100,
    "foto1",
    "code1",
    1
  );
  await productManager.addProduct(
    "product 2",
    "descrip 2",
    200,
    "foto2",
    "code2",
    2
  );
  await productManager.addProduct(
    "product 3",
    "descrip 3",
    300,
    "foto3",
    "code3",
    3
  );
};

const productManager = new ProductManager();

// Prueba 1: Cargar los productos al txt con test(). Luego comentar la función.
test()

//Prueba 2: Consulta general e individual con getProducts y getProductById.

//console.table(await productManager.getProducts())
//console.log(await productManager.getProductById(1))

//Prueba 3: Editar un producto.
//productManager.updateProductById(1, "product 1.1", "descrip 1.1", 1.1, "foto1.1", "code1.1", 1.1)

//Prueba 4: Eliminar un producto.
// productManager.deleteProductById(2)
