const express = require('express');
const http = require('http');
const expressHandlebars = require('express-handlebars');
const socketIO = require('socket.io');
const ProductManager = require('./ProductManager');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const productsFilePath = 'productos.json';

const productManager = new ProductManager(productsFilePath);

app.use(express.json());

app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

server.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('createProduct', (newProduct) => {
        productManager.addProduct(
            newProduct.title,
            newProduct.description,
            newProduct.price,
            newProduct.code,
            true,
            newProduct.stock,
            newProduct.category,
            newProduct.thumbnails
        );

        io.emit('updateProducts', productManager.getProducts());
    });

    socket.on('deleteProduct', (productId) => {
        productManager.deleteProduct(productId);

        io.emit('updateProducts', productManager.getProducts());
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});
