const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    return new Promise((resolve, reject) => {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        reject("All fields are required");
      }
  
      fs.readFile(this.filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
    
        let products = JSON.parse(data);
  
        for (let i = 0; i < products.length; i++) {
          if (products[i].code === code) {
            reject("Code must be unique");
          }
        }
    
        products.push({
          id: ++this.idCounter,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
    
        fs.writeFile(this.filePath, JSON.stringify(products), (err) => {
          if (err) {
            reject(err);
          }
    
          resolve();
        });
      });
    });
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
