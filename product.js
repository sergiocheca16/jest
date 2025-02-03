let products = [];
let id = 0;

//resetProducts
function resetProducts() {
    products = [];
    id = 0;
}

//addProduct
function addProduct (name, price) {
    if (!name || price === undefined) {
        throw new Error ('Nombre y precio son obligatorios.')
    }
    if (products.some(product => product.name === name)) {
        throw new Error ('El producto ya existe.')
    }
    const newProduct = { id: id++, name, price };
    products.push(newProduct);
    return newProduct;
}

//removeProduct
function removeProduct (productId) {
    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        throw new Error ('Producto no encontrado.')
    }
    products.splice(index ,1);
}

//getProducts
function getProducts() {
    return products;
}

//getProduct
function getProduct(productId) {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error('Producto no encontrado.');
    }
    return product;
}

//updateProduct
function updateProduct(productId, name, price) {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error('Producto no encontrado.');
    }
    
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    
    return product;
}

module.exports = {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
};





