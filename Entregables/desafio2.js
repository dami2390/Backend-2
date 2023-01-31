const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      let products = await this.getProducts();
      product.id = products.length + 1;
      products.push(product);
      await fs.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    try {
      let data = await fs.readFile(this.path, 'utf8');
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
