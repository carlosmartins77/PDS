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
        expect(response.body).toHaveProperty("token")
    });
    it('Autenticacao com credenciais invalidas', async () => {
        const user = {
            "username": "name@codesolutions.pt",
            "password": "PFS2000"
        }

        const response = await request(app).post("/login").send(user);
        
        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.body).toBe("Nao possui registo!!")
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
        expect(response.status).toBe(201)
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