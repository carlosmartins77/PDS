const request = require("supertest");
const app = require('../index');

describe('Autenticacao', () => {
    it('Autenticacao com credenciais validas', async () => {
        const user = {
            "username": "joao.fernandes@codesolutions.pt",
            "password": "PFS2000"
        }

        const response = await request(app).post("/login").send(user);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        // Usar toHaveProperty para verificar que tem um propriedade
        expect(response.status).toBe(200)

    });
    it('Autenticacao com credenciais invalidas', async () => {
        const user = {
            "username": "name@codesolutions.pt",
            "password": "PFS2000"
        }

        const response = await request(app).post("/login").send(user);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(404)
    });
});

describe('Registo', () => {
    it('Registo com parametros válidos', async () => {
        const user = {
            "name": "Simao",
            "password": "12345",
            "email": "antoniooliveira@codesolutions.pt",
            "contact": 910000000,
            "nif": 123456789,
            "permission": 1
        }

        const response = await request(app).post("/registeruser").send(user);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        // Usar toHaveProperty para verificar que tem um propriedade
        expect(response.status).toBe(201);
    });
    // Contacto em string - ERRO ------------------------- VALIDAR
    //it('Registo com parametros inválidos', async () => {
    //    const user = {
    //        "name": "Carlos",
    //        "password": "12345",
    //        "email": "carlosmartins@codesolutions.pt",
    //        "contact": "contactostring",
    //        "nif": 123456789,
    //        "permission": 1
    //      }
    //
    //    const response = await request(app).post("/registeruser").send(user);

    // Usar toStrictEqual para objetos
    // Usar toBe para variaveis
    //   expect(response.body).toBe(400)
    //})
    it('Registo com campos já existentes', async () => {
        const user = {
            "name": "João Fernandes",
            "password": "PFS2000",
            "email": "joao.fernandes@codesolutions.pt",
            "contact": 253900900,
            "nif": 159560876,
            "permission": 1
        }

        const response = await request(app).post("/registeruser").send(user);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(401)
    })
        ;
});

describe('Adicionar produto', () => {
    it('Produto publicado (Tem permissões - token)', async () => {
        const product = {
            "name": "bolos",
            "image": "/imagem/133.png",
            "quantity": 3,
            "price": 23.99,
            "hourRecoMin": "10/10/21",
            "hourRecoMax": "10/10/21",
            "lojaId": 1,
            "subCatProdId": 1,
            "token": "eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI"
        }

        const response = await request(app).post("/produto/publicarProduto").send(product);
        expect(response.status).toBe(201)

    });
    it('Produto não publicado (Não tem permissões - token) ', async () => {
        const product = {
            "name": "bolos",
            "image": "/imagem/133.png",
            "quantity": 3,
            "price": 23.99,
            "hourRecoMin": "10/10/21",
            "hourRecoMax": "10/10/21",
            "lojaId": 1,
            "subCatProdId": 1,
        }

        const response = await request(app).post("/produto/publicarProduto").send(product);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(403)
    });
});

/*
describe('Editar um produto', () => {
    it('Produto editado com sucesso (Tem permissões - token)', async () => {
        const product = {
            "id": 1,
            "name": "a",
            "image": "a",
            "quantity": 3,
            "price": 3,
            "hourRecoMin": "1/1/1",
            "hourRecoMax": "1/1/1",
            "lojaId": 1,
            "subCatProdId": 1,
            "token": "eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI"
        }

        const response = await request(app).post("/produto/editarProduto").send(product);
        expect(response.status).toBe(201)

    });
    it('Produto não editado (Não tem permissões - token) ', async () => {
        const product = {
            "id": 1,
            "name": "a",
            "image": "a",
            "quantity": 3,
            "price": 3,
            "hourRecoMin": "1/1/1",
            "hourRecoMax": "1/1/1",
            "lojaId": 1,
            "subCatProdId": 1,
            "token": "eyJhbGciOiJIUzI1NiJ9.YXJpYUBvdqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI"
        }
        const response = await request(app).post("/produto/editarProduto").send(product);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(403)
    });
});
*/
/*
describe('Listar um produto', () => {
    it('Produto publicado (Tem permissões - token)', async () => {
        const product = {
            "name": "bolos",
            "image": "/imagem/133.png",
            "quantity": 3,
            "price": 23.99,
            "hourRecoMin": "10/10/21",
            "hourRecoMax": "10/10/21",
            "lojaId": 1,
            "subCatProdId": 1,
            "token": "eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI"
        }

        const response = await request(app).post("/produto/publicarProduto").send(product);
        expect(response.status).toBe(201)

    });
    it('Produto não publicado (Não tem permissões - token) ', async () => {
        const product = {
            "name": "bolos",
            "image": "/imagem/133.png",
            "quantity": 3,
            "price": 23.99,
            "hourRecoMin": "10/10/21",
            "hourRecoMax": "10/10/21",
            "lojaId": 1,
            "subCatProdId": 1,
        }

        const response = await request(app).post("/produto/publicarProduto").send(product);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(403)
    });
});

describe('Mostrar um Perfil', () => {
    it('Retornar o Perfil', async () => {
        const product = {
            "name": "bolos",
            "image": "/imagem/133.png",
            "quantity": 3,
            "price": 23.99,
            "hourRecoMin": "10/10/21",
            "hourRecoMax": "10/10/21",
            "lojaId": 1,
            "subCatProdId": 1,
            "token": "eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI"
        }

        const response = await request(app).post("/produto/publicarProduto").send(product);
        expect(response.status).toBe(201)

    });
    it('Token não corresponder ao username', async () => {
        const product = {
            "name": "bolos",
            "image": "/imagem/133.png",
            "quantity": 3,
            "price": 23.99,
            "hourRecoMin": "10/10/21",
            "hourRecoMax": "10/10/21",
            "lojaId": 1,
            "subCatProdId": 1,
        }

        const response = await request(app).post("/produto/publicarProduto").send(product);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(403)
    });
});

*/