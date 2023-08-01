import express from 'express';
const app = express();
app.use(express.urlencoded({extended:true}))

import ProductManager from './productManager.js';
const productsFilePath = './products.json';
const productManager = new ProductManager(productsFilePath);

app.get('/products', async(req,res)=>{
    const limit = parseInt(req.query.limit);
    let products = await productManager.getProducts();
    
    if (!isNaN(limit) && limit > 0){
        products = products.slice(0, limit)
    }
    res.json(products)
})

app.get('/products/:pid', async(req, res)=>{
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId)
    if (product) {
        res.json(product)
    } else{
        res.status(404).json({error: "Producto no encontrado"})
    }
})

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en ${PORT} `)
})

/*async function test() {

    const emptyProducts = await productManager.getProducts();
    console.log("Productos iniciales:", emptyProducts);

    // Agregar productos
    await productManager.addProduct("Manzana", "Red Delicious", 45, "https://biotrendies.com/wp-content/uploads/2015/06/manzana.jpg", "01", 60);
    await productManager.addProduct("Naranja", "Para jugo", 20, "https://greenshop.ar/wp-content/uploads/sites/9/2016/08/A.2.37-J.500GR.jpg", "02", 100 );
    await productManager.addProduct("Pera", "Williams", 35, "https://www.gustavoferrada.es/wp-content/uploads/2019/10/pera_williams.jpg", "03", 75);
    await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    
    // Verificar agregado del producto y generación de ID sin repetir
    const productsAdded = await productManager.getProducts();
    console.log("Productos después de agregar:", productsAdded);

    // Obtener todos los productos
    const allProducts = await productManager.getProducts();
    console.log("Todos los productos:");
    console.log(allProducts);

    // Obtener producto por id
    const productId = 2;
    const productById = await productManager.getProductById(productId);
    console.log(`Producto con id ${productId}:`);
    console.log(productById);

    // Actualizar producto
    const productIdToUpdate = 1;
    const updatedFields = { price: 30, stock: 100 };
    await productManager.updateProduct(productIdToUpdate, updatedFields);

    // Eliminar producto
    const productIdToDelete = 3;
    await productManager.deleteProduct(productIdToDelete);

    // Obtener todos los productos después de la modificación
    const updatedProducts = await productManager.getProducts();
    console.log("Productos después de la modificación:");
    console.log(updatedProducts);
}


test();*/
