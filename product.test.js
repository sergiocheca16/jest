const { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe("addProduct", () => {
    it("debería agregar un producto", () => {
        const product = addProduct("Ordenador", 1000);
        expect(getProducts()).toContainEqual(product);
    });
    it("debería incrementar el id en 1 cada vez que se añada un producto", () => {
        addProduct("Raton", 20);
        addProduct("Teclado", 50);
        expect(getProducts()[1].id).toBe(1);
    });
    it("debería lanzar un error si el nombre o el precio no están definidos", () => {
        expect(() => addProduct("", 100)).toThrow("Nombre y precio son obligatorios.");
        expect(() => addProduct("Pantalla")).toThrow("Nombre y precio son obligatorios.");
    });
    it("debería lanzar un error si el producto ya existe", () => {
        addProduct("Tablet", 300);
        expect(() => addProduct("Tablet", 300)).toThrow("El producto ya existe.");
    });
});

describe("removeProduct", () => {
    it("debería eliminar un producto", () => {
        const product = addProduct("Impresora", 150);
        removeProduct(product.id);
        expect(getProducts()).not.toContainEqual(product);
    });
    it("debería lanzar un error si el producto no existe", () => {
        expect(() => removeProduct(999)).toThrow("Producto no encontrado.");
    });
});

describe("getProduct", () => {
    it("debería devolver un producto por su id", () => {
        const product = addProduct("Auriculares", 80);
        expect(getProduct(product.id)).toEqual(product);
    });
    it("debería lanzar un error si el producto no existe", () => {
        expect(() => getProduct(999)).toThrow("Producto no encontrado.");
    });
});

describe("updateProduct", () => {
    it("debería actualizar un producto por su id", () => {
        const product = addProduct("Cámara", 500);
        updateProduct(product.id, "Cámara 4K", 700);
        expect(getProduct(product.id)).toEqual({ id: product.id, name: "Cámara 4K", price: 700 });
    });
    it("debería lanzar un error si el producto no existe", () => {
        expect(() => updateProduct(999, "Nuevo", 100)).toThrow("Producto no encontrado.");
    });
    it("debería permitir actualizar solo el nombre", () => {
        const product = addProduct("Consola", 300);
        updateProduct(product.id, "Consola Next-Gen");
        expect(getProduct(product.id)).toEqual({ id: product.id, name: "Consola Next-Gen", price: 300 });
    });
    it("debería permitir actualizar solo el precio", () => {
        const product = addProduct("Tablet", 200);
        updateProduct(product.id, undefined, 250);
        expect(getProduct(product.id)).toEqual({ id: product.id, name: "Tablet", price: 250 });
    });
});

