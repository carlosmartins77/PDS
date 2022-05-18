const request = require("supertest");
const app = require('../index');



describe('Listar todos os produtos - Cliente', () => {
    it('Produtos Retornados (Tem permissões - token)', async () => {
        const response = await request(app)
            .get("/cliente/listarProdutos")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
        expect(response.status).toBe([])

    });
    it('Produtos nao retornados (Não tem permissões - token) ', async () => {
        const response = await request(app)
            .get("/cliente/listarProdutos")
            .set('Authorization', 'Bearer eyJhbGciOiJIU3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
        expect(response.status).toBe(403)
    });
});

describe('Suspender/reativar contas - Loja', () => {
    it('Suspender/reativar contas - Loja (Tem permissões - token)', async () => {
        const user =
        {
            "idLoja": 1,
            "estado": 1
        }

        const response = await request(app)
            .post("/alterarEstadoLoja")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI')
            .send(user)
        expect(response.status).toBe(200)

    });
    it('Suspender/reativar contas - Loja (Não tem permissões - token) ', async () => {
        const user =
        {
            "idLoja": 1,
            "estado": 1
        }

        const response = await request(app)
            .post("/alterarEstadoLoja")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjG')
            .send(user)
        expect(response.status).toBe(403)
    });
});


describe('Editar perfil - Loja', () => {
    it('Editar perfil - Loja (Tem permissões - token)', async () => {
        const user =
        {
            "password": "1234",
            "nome": "ricardog",
            "email": "codesolutions@gmail.com",
            "contacto": 123456709,
            "nif": 12345432,
            "morada": "Rua",
            "nifLoja": 1,
            "idLoja": 1
        }

        const response = await request(app)
            .post("/editarPerfil/Loja")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI')
            .send(user)
        expect(response.status).toBe(200)

    });
    it('Editar perfil - Loja (Não tem permissões - token) ', async () => {
        const user =
        {
            "password": "1234",
            "nome": "ricardog",
            "email": "codesolutions@gmail.com",
            "contacto": 123456709,
            "nif": 12345432,
            "morada": "Rua",
            "nifLoja": 1,
            "idLoja": 1
        }

        const response = await request(app)
            .post("/editarPerfil/Loja")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjG')
            .send(user)
        expect(response.status).toBe(403)
    });
});

describe('Editar perfil - Cliente', () => {
    it('Editar perfil - Cliente (Tem permissões - token)', async () => {
        const user =
        {
            "password": "1234",
            "nome": "joao",
            "email": "joao.aluno@gmail.com",
            "contacto": 98765431,
            "nif": 18935666,
            "dataNascimento": "8/8/1999",
            "pais": "pt",
            "localizacao": "braga",
            "idCliente": 1
        }

        const response = await request(app)
            .post("/editarPerfil/Cliente")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(user)
        expect(response.status).toBe(200)

    });
    it('Editar perfil - Cliente (Não tem permissões - token) ', async () => {
        const user =
        {
            "password": "1234",
            "nome": "ricardog",
            "email": "codesolutions@gmail.com",
            "contacto": 123456709,
            "nif": 12345432,
            "morada": "Rua",
            "nifLoja": 1,
            "idLoja": 1
        }

        const response = await request(app)
            .post("/editarPerfil/Cliente")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1')
            .send(user)
        expect(response.status).toBe(403)
    });
});

describe('Consultar o histórico de vendas - Loja', () => {
    it('Consultar o histórico de vendas - Loja (Tem permissões - token)', async () => {
        const user =
        {
            "idLoja": 1
        }

        const response = await request(app)
            .post("/consultarHistoricoLojas")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI')
            .send(user)
        expect(response.status).toBe(200)

    });
    it('Editar perfil - Cliente (Não tem permissões - token) ', async () => {
        const user =
        {
            "idLoja": 1
        }

        const response = await request(app)
            .post("/consultarHistoricoLojas")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1')
            .send(user)
        expect(response.status).toBe(403)
    });
});

describe('Criar uma Nova Encomenda - Cliente', () => {
    it('Criar uma Nova Encomenda - Cliente (Tem permissões - token)', async () => {
        const user =
        {
            "numEncomenda": 1,
            "dataEncomenda": "8/8/2022",
            "estado": "Entregue",
            "valorTotal": 10,
            "lojaId": 1,
            "id_Cliente": 1,
            "estafetaId": 1
        }

        const response = await request(app)
            .post("/publicarEncomenda")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(user)
        expect(response.status).toBe(200)

    });
    it('Criar uma Nova Encomenda - Cliente (Não tem permissões - token) ', async () => {
        const user =
        {
            "numEncomenda": 1,
            "dataEncomenda": "8/8/2022",
            "estado": "Entregue",
            "valorTotal": 10,
            "lojaId": 1,
            "id_Cliente": 1,
            "estafetaId": 1
        }

        const response = await request(app)
            .post("/publicarEncomenda")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVT')
            .send(user)
        expect(response.status).toBe(403)
    });
});


describe('Visualizar Encomendas (Historico) - Cliente', () => {
    it('Visualizar Encomendas - Cliente (Tem permissões - token)', async () => {
        const response = await request(app)
            .post("/verEncomendas")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
        expect(response.status).toBe(200)

    });
    it('Visualizar Encomendas - Cliente (Não tem permissões - token) ', async () => {
        const response = await request(app)
            .post("/verEncomendas")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVT')
        expect(response.status).toBe(403)
    });
});

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

describe('Estafeta', () => {
    it('Mudar estado do estafeta (Tem permissões - token)', async () => {
        const response = await request(app)
            .post("/estafeta/mudaEstado")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8');
        expect(response.status).toBe(200)

    });
    it('Mudar estado do estafeta (Não tem permissões - token) ', async () => {
        const response = await request(app)
            .post("/estafeta/mudaEstado");
        expect(response.status).toBe(403)
    });

    it('Mudar estado da encomenda (Tem permissões - token)', async () => {
        const order = {
            "idEncomenda": 1
        }

        const response = await request(app)
            .post("/estafeta/encomenda/alterarEstado")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXJpc3RldS5wZXJlaXJhQGdtYWlsLmNvbQ.xGEYi6cznV2ZGwU1phBOpVTJlVT3FIQEtx1d4VcScE8')
            .send(order);
        expect(response.status).toBe(200)

    });
    it('Mudar estado do estafeta (Não tem permissões - token) ', async () => {
        const order = {
            "idEncomenda": 1
        }

        const response = await request(app)
            .post("/estafeta/encomenda/alterarEstado")
            .send(order);
        expect(response.status).toBe(403)
    });
});

describe('Apagar - Admin', () => {
    it('Loja apagada (Tem permissões - token)', async () => {
        const store = {
            "email": "silva.pastelaria@outlook.com",
            "idloja": 2
        }

        const response = await request(app)
            .delete("/admin/store/delete")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI')
            .send(store);
        expect(response.status).toBe(200)

    });
    it('Loja não apagada (Não tem permissões - token) ', async () => {
        const store = {
            "email": "silva.pastelaria@outlook.com",
            "idloja": 2
        }

        const response = await request(app)
            .delete("/admin/store/delete")
            .send(store);
        expect(response.status).toBe(403)
    });
    it('Estafeta apagado (Tem permissões - token)', async () => {
        const courier = {
            "idloja": 2
        }

        const response = await request(app)
            .delete("/admin/courier/delete")
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.c2lsdmEucGFzdGVsYXJpYUBvdXRsb29rLmNvbQ.703UrqoZVtpVtqLjGILK05OrnNYUEnN_3URwkOjbymI')
            .send(courier);
        expect(response.status).toBe(200)

    });
    it('Estafeta não apagado (Não tem permissões - token) ', async () => {
        const courier = {
            "email": "silva.pastelaria@outlook.com",
            "idloja": 2
        }

        const response = await request(app)
            .delete("/admin/courier/delete")
            .send(courier);
        expect(response.status).toBe(403)
    });
});