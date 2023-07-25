const fs = require('fs').promises;
class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Debe agregar todos los campos (titulo, descripcion, precio, imagen, codigo y stock)");
            return;
        }

        const products = await this.getProducts();
        const repeatedProduct = products.find(product => product.code === code);
        if (repeatedProduct) {
            console.log("Este producto ya existe");
            return;
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        newProduct.id = newId;

        products.push(newProduct);
        await this.saveProducts(products);
        console.log('Producto agregado correctamente.');
    }

    async getProducts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log('Producto no encontrado.');
            return null;
        }
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...updatedFields };
            await this.saveProducts(products);
            console.log('Producto actualizado correctamente.');
        } else {
            console.log('Producto no encontrado para actualizar.');
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const updatedProducts = products.filter(p => p.id !== id);
        if (products.length !== updatedProducts.length) {
            await this.saveProducts(updatedProducts);
            console.log('Producto eliminado correctamente.');
        } else {
            console.log('Producto no encontrado para eliminar.');
        }
    }

    async saveProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }
}

module.exports = ProductManager;


