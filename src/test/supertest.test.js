import supertest from "supertest";
import chai from "chai";


const expect = chai.expect;
const request = supertest.agent('http://localhost:8080')


describe('Carts endpoints', () => {

        
    it('Carrito creado con éxito', async function ()  {

        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });

        const obj = {
            products: [],
        };

        const response = await request
        .post('/api/carts')
        .send(obj);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('cart');
    });


    it('Obtener todos los carritos', async () => {
        const response = await request.get('/api/carts/')
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });



    it('Obtener un carrito por el id', async () => {
        const cid = '654bdbccccf9fc86dc9354f0'
        const response = await request.get(`/api/carts/${cid}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('cart');
    });



    it('Eliminar un producto dado del carrito', async () => {

        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });


        const cid = '654d1d7862c47c5973b82ed9'
        const pid = '658608c5e2f9c1b7534de768'

        const response = await request.delete(`/api/carts/${cid}/product/${pid}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('cart');
    });



    it('Eliminar todos los productos de un carrito', async () => {

        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });

        const cid = '654d1cdc62c47c5973b82eb9'

        const response = await request.delete(`/api/carts/${cid}`)
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('cart');
    });


    it('Actualizar la cantidad de un producto específico del carrito', async () => {

        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });


        const cid = '654d1cdc62c47c5973b82eb9'
        const pid = '650e307e8ea313dd847b6e9a'

        const response = await request.put(`/api/carts/${cid}/products/${pid}`).send({ quantity: 1 });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('result')
    });



    it('Debería avanzar con el proceso de compra', async () => {

        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });

        const cid = '654bdbccccf9fc86dc9354f0'

        const response = await request.get(`/api/carts/${cid}/purchase`);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message').that.equals('Compra finalizada con éxito');
    });



})


describe('Products endpoints', () => {

        
    it('POST - Created a product', async () => {
        
        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });
        
        const product = {
            "title": "Remera NIke",
            "description": "Remera Marron",
            "price": 12500,
            "stock": 3,
            "thumbnail": "remera.png",
            "code": "RMEEER",
            "category": "Remera"
        };
        
        const response = await request.post('/api/products').send(product);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("message").that.equals("Producto creado");
    });


    it('GET -- product list', async () => {
        const response = await request.get('/api/products');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status').that.equals('Lista de productos obtenida');
    });

    it('GET -- product by ID', async () => {
        const pid = '650e307e8ea313dd847b6e98';
        const response = await request.get(`/api/products/${pid}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('product');
    });

    it('PUT -- product change property', async () => {
        const pid = '650e307e8ea313dd847b6e98';
        const product = {
            price: 12000,
            stock: 15
        };

        await request.post("/api/auth/login").send({
            username: "Benjamin",
            password: "benja"
        });

        const response = await request.put(`/api/products/${pid}`).send(product);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message').that.equals('Producto actualizado');
    });

    it('Delete -- product deleted by ID', async () => {
        const pid = '65860b7728826db1f6be9780';
        const response = await request.delete(`/api/products/${pid}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message').that.equals('Producto Eliminado');
    });
})



describe('Users endpoints', () => {

    it('POST -- Register a new user', async () => {
        const userData = {
            first_name: 'Angel',
            last_name: 'Di Maria',
            username: 'Angel',
            email: 'dimaria@gmail.com',
            age: 35,
            role: 'user',
            password: 'dimaria',
        };

        const response = await request.post('/api/auth/register').send(userData);
        expect(response.status).to.equal(201);
    });

    it('POST -- Login', async () => {
        const userData = {
            username: 'Benjamin',
            password: 'benja'
        };

        const response = await request.post('/api/auth/login').send(userData);
        expect(response.status).to.equal(200);
    });

    it('POST -- Change user role', async () => {
        const uid = 'Agus';
        const response = await request.post(`/api/auth/premium/${uid}`);
        expect(response.status).to.equal(200);
    });

})