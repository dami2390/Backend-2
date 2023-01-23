class ProductManager {
    constructor() {
      this.products = [];
      this.idCounter = 0;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) { // Valida que existan todos los campos
        console.log("All fields are required");
        return;
      }
  
      for (let i = 0; i < this.products.length; i++) {  // Valida que el codigo ingresado no se repita con otros
        if (this.products[i].code === code) {
          console.log("Code must be unique");
          return;
        }
      }
  
      this.products.push({ // Finalmente, hace el push con el nuevo producto
        id: ++this.idCounter, // el ID no se requiere, ya que se crea y se autoincrementa
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
    }
  
    getProducts() {
      return this.products; // Devuelve todos los productos cargados
    }
  
    getProductById(id) {
      for (let i = 0; i < this.products.length; i++) { // itera por todo el arreglo de productos
        if (this.products[i].id === id) { // cuando coincida con el id ingresado
          return this.products[i]; // devuelve solo el array coincidente
        }
      }
      console.log("Not found"); // si no coicide ningun ID, muestra en consola "Not found"
    }
  }
  
  const productManager = new ProductManager(); // creo una nueva clase
  productManager.addProduct("Product 1", "Description 1", 10, "path/to/image1", "CODE1", 10); // le agrego varios productos utilizando el metodo addproduct
  productManager.addProduct("Product 2", "Description 2", 20, "path/to/image2", "CODE2", 20);
  productManager.addProduct("Product 2", "Description 2", 20, "path/to/image2", "CODE2", 20);
  console.log(productManager.getProducts());
/*   console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(2));
  console.log(productManager.getProductById(3)); */
  