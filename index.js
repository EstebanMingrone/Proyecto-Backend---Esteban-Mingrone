class ProductManager {
    constructor(){
        this.products = []
        this.newId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock ){
            console.log("Debe agregar todos los campos (titulo, descripcion, precio, imagen, codigo y stock)")
            return;
        }

        const repeatedProduct = this.products.find(product => product.code === code);
        if (repeatedProduct) {
            console.log("Producto repetido");
            return;
        }

        const newProdcut = {
            id: this.newId,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        this.products.push(newProdcut);
        this.newId ++; 
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
        if (product){
            return product
        } else{
            console.log("Not Found")
        }
    }
}

let productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct("Manzana", "Red Delicious", 45, "https://biotrendies.com/wp-content/uploads/2015/06/manzana.jpg", "01", 60);
productManager.addProduct("Naranja", "Para jugo", 20, "https://greenshop.ar/wp-content/uploads/sites/9/2016/08/A.2.37-J.500GR.jpg", "02", 100 );
productManager.addProduct("Pera", "Williams", 35, "https://www.gustavoferrada.es/wp-content/uploads/2019/10/pera_williams.jpg", "03", 75);

console.log(productManager.getProducts());

console.log(productManager.getProductById(2))
console.log(productManager.getProductById(5))
