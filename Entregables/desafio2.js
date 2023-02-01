const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
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
  
    this.idCounter++;
    const newProduct = {
      id: this.idCounter,
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

  async getProducts() {
    try {
      let data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(id) {
    try {
      let products = await this.getProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, productData) {
    try {
      let products = await this.getProducts();
      let productIndex = products.findIndex(product => product.id === id);
      products[productIndex] = { ...products[productIndex], ...productData };
      await fs.writeFile(this.path, JSON.stringify(products));
      return products[productIndex];
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      let productIndex = products.findIndex(product => product.id === id);
      let deletedProduct = products.splice(productIndex, 1);
      await fs.writeFile(this.path, JSON.stringify(products));
      return deletedProduct;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = ProductManager;

const test = new ProductManager("./ejemplo.txt");
test.getProducts()
/* test.addProduct("producto prueba", "este es un producto prueba", 200, "Sin imagen", "abc123", 25);
test.getProducts() */