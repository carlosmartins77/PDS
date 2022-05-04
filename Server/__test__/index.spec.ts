const request = require("supertest");
const app = require('../index');
/*

describe('Carrinho de Compras - Clientes', () => {
    it('Adicionar um Produto ao Carrinho válida - token com permissão', async () => {
        const user = {
            "clienteId": 1
        }

        const response = await request(app)
            .post("/cliente/adicionarCarrinho")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(user);

        expect(response.status).toBe(201)

    });

    it('Adicionar um Produto ao Carrinho inválida  - token sem permissao', async () => {
        const user = {
            "clienteId": 1
        }

        const response = await request(app)
            .post("/cliente/adicionarCarrinho")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlrWlsdfdfgvnV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(user);

        expect(response.status).toBe(403)

    });
    it('Remover um Produto do Carrinho válida  - token com permissão', async () => {
        const user = {
            "idCarrinhoDeCompras": 16
        }

        const response = await request(app)
            .post("/cliente/removerCarrinho")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(user);

        expect(response.status).toBe(201)

    });
    it('Remover um Produto do Carrinho inválida  - token sem permissao', async () => {
        const user = {
            "idCarrinhoDeCompras": 16
        }

        const response = await request(app)
            .post("/cliente/removerCarrinho")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlrWlsdfdfgvnV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(user);

        expect(response.status).toBe(403)

    });

});

describe('Aprovação de Lojas - Admin', () => {
    it('Aprovação válida - token com permissão', async () => {
        const user = {
            "idLoja": 1,
            "aprovacao": 0
        }

        const response = await request(app)
            .post("/aprovacaoLoja")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.am9hby5mZXJuYW5kZXNAY29kZXNvbHV0aW9ucy5wdA.TEow1rNQRINYiToJ6z5MaR6nOyoBMXve3gsnsPrjybw')
            .send(user);

        expect(response.status).toBe(200)

    });

    it('Aprovação inválida - token sem permissao', async () => {
        const user = {
            "idLoja": 1,
            "aprovacao": 0
        }

        const response = await request(app)
            .post("/aprovacaoLoja")
            .set('Authorization', 'Bearer: eyJhbGc9.am9hby5mZXJuYW5kZXNAY29kZXNvbHV0aW9ucy5wdA.TEow1rNQRINYiToJ6z5MaR6nOyoBMXve3gsnsPrjybw')
            .send(user);

        expect(response.status).toBe(403)

    });

    it('Aprovação inválida de ficheiros - token inválido', async () => {
        const user = {
            "idLoja": 1,
        }

        const response = await request(app)
            .post("/aprovacaoLoja")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.am9hby5mZXJuYW5kZXNAy5wdA.TEow1rNQRINYiToJ6z5MaR6nOyoBMXve3gsnsPrjybw')
            .send(user);

        expect(response.status).toBe(403)

    });

});

/*
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

/*
describe('Aprovação de Estafetas - Admin', () => {
    it('Aprovação válida - token com permissão', async () => {
        const user = {
            "idEstafeta": 1,
            "aprovacao": 0
        }

        const response = await request(app)
            .post("/aprovacaoEstafeta")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.am9hby5mZXJuYW5kZXNAY29kZXNvbHV0aW9ucy5wdA.TEow1rNQRINYiToJ6z5MaR6nOyoBMXve3gsnsPrjybw')
            .send(user);

        expect(response.status).toBe(200)

    });

    it('Aprovação inválida - token sem permissao', async () => {
        const user = {
            "idEstafeta": 1,
            "aprovacao": 0
        }

        const response = await request(app)
            .post("/aprovacaoEstafeta")
            .set('Authorization', 'Bearer: eyJhbGc9.am9hby5mZXJuYW5kZXNAY29kZXNvbHV0aW9ucy5wdA.TEow1rNQRINYiToJ6z5MaR6nOyoBMXve3gsnsPrjybw')
            .send(user);

        expect(response.status).toBe(403)

    });

    it('Aprovação inválida de ficheiros - token inválido', async () => {
        const user = {
            "idEstafeta": 1,
        }

        const response = await request(app)
            .post("/aprovacaoEstafeta")
            .set('Authorization', 'Bearer: eyJhbGciOiJIUzI1NiJ9.am9hby5mZXJuYW5kZXNAy5wdA.TEow1rNQRINYiToJ6z5MaR6nOyoBMXve3gsnsPrjybw')
            .send(user);

        expect(response.status).toBe(403)

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

/*describe('Candidatura Lojas', () => {
    it('Candidatura submetida (Tem permissões - token)', async () => {
        const candidacy = {
            "lojaId": 1,
            "name": "Silva Pastelaria",
            "adress": "Rua 24 de junho",
            "nif"; "530304052",
            "approval": "Aprovado"
            "doc": "docsCertficado.pdf",
            "token": "eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI"
        }

        const response = await request(app).post("/aprovacaoLoja").send(candidacy);
        expect(response.status).toBe(201)

    });
    it('Candidatura não submetida (Não tem permissões - token) ', async () => {
        const candidacy = {
            "lojaId": 1,
            "name": "Silva Pastelaria",
            "adress": "Rua 24 de junho",
            "nif": "530304052",
            "approval": "Não Aprovado"
            "doc": "docsCertficado.pdf",
        }

        const response = await request(app).post("/aprovacaoLoja").send(candidacy);

        // Usar toStrictEqual para objetos
        // Usar toBe para variaveis
        expect(response.status).toBe(403)
    });
}); 

*/


describe('Apagar - Admin', () => {
    it('Loja apagada (Tem permissões - token)', async () => {
        const store = {
            "email": "silva.pastelaria@outlook.com",
            "idloja": 2
        }

        const response = await request(app).post("/admin/store/delete").set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI').send(store);
        expect(response.status).toBe(201)

    });
    it('Loja não apagada (Não tem permissões - token) ', async () => {
        const store = {
            "email": "silva.pastelaria@outlook.com",
            "idloja": 2
        }

        const response = await request(app).post("/admin/store/delete").send(store);
        expect(response.status).toBe(403)
    });
    it('Estafeta apagado (Tem permissões - token)', async () => {
        const courier = {
            "idloja": 2
        }

        const response = await request(app).post("/admin/courier/delete").set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI').send(courier);
        expect(response.status).toBe(201)

    });
    it('Estafeta não apagado (Não tem permissões - token) ', async () => {
        const courier = {
            "email": "silva.pastelaria@outlook.com",
            "idloja": 2
        }

        const response = await request(app).post("/admin/courier/delete").send(courier);
        expect(response.status).toBe(403)
    });
});