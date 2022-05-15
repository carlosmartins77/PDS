var config = require('./dbconfig');
const sql = require('mssql');
const Int = require('tedious/lib/data-types/int');
//const { produto } = require('./Functions/ProductRoutes');

//#region Login 
async function loginUser(user) {
    try {
        let pool = await sql.connect(config);
        let logUser = await pool.request()
            .input('email', sql.VarChar, user.email)
            .input('password', sql.VarChar, user.password)
            .query("SELECT * FROM Utilizador where email = @email and password = @password;")
        console.log("dentro", logUser.recordset[0])
        return !!logUser.recordset[0]
    } catch (err) {
        return Error(err)
    }
}

async function registeruser(user) {
    try {
        let pool = await sql.connect(config);
        let registerUser = await pool.request()
            .input('email', sql.VarChar, user.email)
            .input('password', sql.VarChar, user.password)
            .input('nome', sql.VarChar, user.name)
            .input('contacto', sql.Int, user.contact)
            .input('nif', sql.Int, user.nif)
            .input('tipoPermissao', sql.Int, user.permission)
            .query("INSERT INTO Utilizador (password, nome, email, contacto, nif, tipoPermissao) VALUES (@password, @nome, @email, @contacto, @nif, @tipoPermissao)")
        return true
    } catch (err) {
        return Error(err)
    }
}

async function finduser(useremail) {
    try {
        const pool = await sql.connect(config);
        const user = await pool.request()
            .input('email', sql.VarChar, useremail)
            .query("SELECT * FROM Utilizador where email = @email;")
        return user.recordset
    } catch (err) {
        return Error(err)
    }
}


async function compareuser(useremail) {
    try {
        const pool = await sql.connect(config);
        const user = await pool.request()
            .input('email', sql.VarChar, useremail)
            .query("SELECT * FROM AdminLoja INNER JOIN Loja ON AdminLoja.idAdminLoja = Loja.adminlojaId INNER JOIN Utilizador ON AdminLoja.utilizadorId = Utilizador.idUtilizador where Utilizador.email = @email")
        return user.recordset
    } catch (err) {
        return Error(err)
    }
}
//#endregion

//#region Produto

// Publicar um Produto 
// Input _> Produto
// Output _> true/erro
async function newProduct(product) {
    try {
        // Name, Quantity, Price, hourRecoMin, HourRecoMax, Image, lojaId, subCatProdId
        let pool = await sql.connect(config);
        let verifyStore = await pool.request()
            .input('lojaId', sql.Int, product.lojaId)
            .query("SELECT COUNT(*) as ContasLinhas FROM Loja WHERE Aprovacao = 1 ANd idLoja = @lojaId")

        let nRegistos = verifyStore.recordset[0].ContaLinhas

        if (verifyStore.recordset[0].ContasLinhas == 1) {

            let newProduct = await pool.request()
                .input('name', sql.VarChar, product.name)
                .input('quantity', sql.Int, product.quantity)
                .input('price', sql.Float, product.price)
                .input('hourRecoMin', sql.DateTime, product.hourRecoMin)
                .input('hourRecoMax', sql.DateTime, product.hourRecoMax)
                .input('image', sql.VarChar, product.image)
                .input('lojaId', sql.Int, product.lojaId)
                .input('subCatProdId', sql.Int, product.subCatProdId)
                .query("Insert into Produto (nomeProduto, quantidade, preco, horaRecolhaMin, horaRecolhaMax, fotoProduto, lojaId, SubcategoriaProdId) values (@name, @quantity, @price, @hourRecoMin,@hourRecoMax, @image,@lojaId, @subCatProdId);")
            return true
        }
        return false
    } catch (err) {
        return Error(err)
    }
}

// Editar um Produto 
// Input _> Produto
// Output _> true/erro
async function editProduct(product, id) {
    try {
        let pool = await sql.connect(config);
        let editProduct = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, product.name)
            .input('quantity', sql.Int, product.quantity)
            .input('price', sql.Float, product.price)
            .input('hourRecoMin', sql.DateTime, product.hourRecoMin)
            .input('hourRecoMax', sql.DateTime, product.hourRecoMax)
            .input('image', sql.VarChar, product.image)
            .input('lojaId', sql.Int, product.lojaId)
            .input('description', sql.VarChar, product.description)
            .input('subCatProdId', sql.Int, product.subCatProdId)
            .query("Insert into Produto (nomeProduto, quantidade, preco, horaRecolhaMin, horaRecolhaMax, fotoProduto, lojaId, descricao, SubcategoriaProdId) values (@name, @quantity, @price, @hourRecoMin,@hourRecoMax, @image,@lojaId, @description, @subCatProdId);")
        return true;
    } catch (err) {
        return Error(err)
    }
}

// Listar um Produto 
// Input _> Produto
// Output _> true/erro
async function listProduct() {
    try {
        let pool = await sql.connect(config);
        let listProduct = await pool.request()
            .query("select * from Produto")
        console.log(listProduct.recordset)
        return listProduct.recordset;
    } catch (err) {
        return Error(err)
    }
}
//#endregion

//#region Lojas
// Publicar uma Candidatura 
// Input _> Candidatura
// Output _> true/erro
async function newCandidacy(candidacy, token) {
    try {
        let pool = await sql.connect(config);
        let can = await pool.request()
            .input('address', sql.VarChar, candidacy.adress)
            .input('nif', sql.Int, candidacy.nif)
            .input('idAdmin', sql.Int, candidacy.id)
            .input('idCategoria', sql.Int, candidacy.category)
            .query("Insert into Loja (morada, nif, adminlojaId, categoriaId) values (@address, @nif, @idAdmin, @idCategoria);")
        let idloja = await pool.request()
            .input('input_parameter', sql.Int, candidacy.nif)
            .query("select * from Loja where nif = @input_parameter")
        filename = (token + '--' + idloja.recordset[0].idLoja + '--' + candidacy.doc).toString()
        let canloja = await pool.request()
            .input('pdfExtratoAnoAnterior', sql.VarChar, filename)
            .input('lojaId', sql.Int, idloja.recordset[0].idLoja)
            .query("Insert into DocumentosLoja (pdfExtratoAnoAnterior, lojaId) values (@pdfExtratoAnoAnterior, @lojaId);")
        return idloja.recordset[0].idLoja
    } catch (err) {
        return Error(err)
    }
}

//#endregion

async function mostrarPerfil(email) {
    try {
        let pool = await sql.connect(config);
        let perfil = await pool.request()
            .input('input_parameter', sql.VarChar, email)
            .query("select * from Utilizador where email = @input_parameter")
        return perfil.recordset[0];
    } catch (err) {
        return Error(err)
    }
}

async function approvestore(id, approve) {
    try {
        let pool = await sql.connect(config);
        let store = await pool.request()
            .input('input_parameter_id', sql.Int, id)
            .input('input_parameter_approve', sql.Int, approve)
            .query("update Loja set aprovacao =@input_parameter_approve where idLoja = @input_parameter_id")
        let objectstore = {
            idLoja: id,
            aprovacao: approve
        }
        return objectstore;
    } catch (err) {
        return Error(err)
    }
}

async function approvecourier(id, approve) {
    try {
        let pool = await sql.connect(config);
        let courier = await pool.request()
            .input('input_parameter_id', sql.Int, id)
            .input('input_parameter_approve', sql.Int, approve)
            .query("update Estafeta set aprovacao =@input_parameter_approve where idEstafeta = @input_parameter_id")
        let objectcourier = {
            idEstafeta: id,
            aprovacao: approve
        }
        return objectcourier;
    } catch (err) {
        return Error(err)
    }
}


async function dowloadfiles(id) {
    try {
        let pool = await sql.connect(config);
        let file = await pool.request()
            .input('input_parameter_id', sql.Int, id)
            .query("select pdfExtratoAnoAnterior from DocumentosLoja where lojaid = @input_parameter_id")
        return file.recordset[0].pdfExtratoAnoAnterior;
    } catch (err) {
        return Error(err)
    }
}


async function removerCategoria(nome) {
    try {
        let pool = await sql.connect(config);
        let categoria = await pool.request()
            .input('nome', sql.VarChar, nome)
            .query("DELETE from Categoria WHERE nome = @nome")
        if (categoria.rowsAffected == 0) {
            return categoria.Error
        } else {
            return true
        }
    } catch (err) {
        return Error(err)
    }
}

async function novaCategoriaLoja(category) {
    try {
        let pool = await sql.connect(config);

        let findCategory = await pool.request()
            .input('nomeCategoria', sql.VarChar, category.categoria)
            .query("SELECT COUNT(*) as ContaLinhas FROM Categoria WHERE nome = @nomeCategoria")
        var nRegistos = findCategory.recordset[0].ContaLinhas
        //console.log(nRegistos)

        if (nRegistos == 0) {
            let registerCategory = await pool.request()
                .input('nomeCategoria', sql.VarChar, category.categoria)
                .query("INSERT INTO Categoria (Nome) VALUES (@nomeCategoria);")
            return true
        }

    } catch (err) {
        return Error(err)
    }
}

async function novaCategoriaProduto(category) {
    try {
        let pool = await sql.connect(config);

        let findCategory = await pool.request()
            .input('nomeCategoria', sql.VarChar, category.categoria)
            .query("SELECT COUNT(*) as ContaLinhas FROM CategoriaProduto WHERE nome = @nomeCategoria")
        var nRegistos = findCategory.recordset[0].ContaLinhas
        //console.log(nRegistos)

        if (nRegistos == 0) {
            let registerCategory = await pool.request()
                .input('nomeCategoria', sql.VarChar, category.categoria)
                .query("INSERT INTO CategoriaProduto (Nome) VALUES (@nomeCategoria);")
            return true
        }
    } catch (err) {
        return Error(err)
    }
}

async function removerCategoriaProduto(nome) {
    try {
        let pool = await sql.connect(config);
        let categoria = await pool.request()
            .input('nome', sql.VarChar, nome)
            .query("DELETE from CategoriaProduto WHERE nome = @nome")
        //console.log(categoria)
        if (categoria.rowsAffected == 0) {
            return categoria.Error
        } else {
            return true
        }
    } catch (err) {
        //console.log(err)
    }
}

async function novaSubCategoriaProduto(subcategory) {
    try {

        let pool = await sql.connect(config);

        let findCategory = await pool.request()
            .input('nomeCategoria', sql.VarChar, subcategory.categoria)
            .query("SELECT COUNT(*) as ContaLinhas FROM CategoriaProduto WHERE nome = @nomeCategoria")
        var nRegistos = findCategory.recordset[0].ContaLinhas

        let findIdCategory = await pool.request()
            .input('idnomeCategoria', sql.VarChar, subcategory.categoria)
            .query("SELECT idCategoriaProd as idCategoria FROM CategoriaProduto WHERE nome = @idnomeCategoria")

        var id = findIdCategory.recordset[0].idCategoria

        if (nRegistos == 1) {
            let registerSubCategory = await pool.request()
                .input('nomeSubCategoria', sql.VarChar, subcategory.subcategoria)
                .input('idCategoria', sql.Int, id)
                .query("INSERT INTO SubCategoriaProduto (Nome, categoria) VALUES (@nomeSubCategoria, @idCategoria);")
            return true
        }
        return false;

    } catch (err) {
        return Error(err)
    }
}

async function listarProdutosClientes() {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .query("SELECT * from Produto")
        console.log("n pode")
        return product.recordset;
    } catch (err) {
        return Error(err)
    }
}

async function adicionarCarrinho(id) {
    try {
        let pool = await sql.connect(config);
        let car = await pool.request()
            .input('id', sql.Int, id)
            .query("insert into CarrinhoDeCompras (clienteId) values(@id)")
        return true;
    } catch (err) {
        return Error(err)
    }
}

async function removerCarrinho(id) {
    try {
        let pool = await sql.connect(config);
        let car = await pool.request()
            .input('id', sql.Int, id)
            .query("delete from CarrinhoDeCompras where idCarrinhoDeCompras = @id ")
        return true;
    } catch (err) {
        return Error(err)
    }
}

async function listarCarrinho(id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT * from CarrinhoDeCompras WHERE clienteId = @id")
        console.log("n pode")
        return product.recordset;
    } catch (err) {
        return Error(err)
    }
}

//#region Admin

async function getStoreFromAdmin(email, idloja) {
    try {
        const pool = await sql.connect(config);
        console.log("getstore1")
        const admin = await pool.request()
            .input('email', sql.VarChar, email)
            .input('idloja', sql.SmallInt, idloja)
            .query("SELECT * FROM AdminLoja INNER JOIN Loja ON Loja.idLoja = @idloja INNER JOIN Utilizador ON AdminLoja.utilizadorId = Utilizador.idUtilizador where Utilizador.email = @email")
        /* SELECT * FROM AdminLoja 
            INNER JOIN Loja ON AdminLoja.idAdminLoja = 1
            WHERE Loja.idLoja = 2*/
        console.log("getstore2")
        return admin.recordset
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteStore(id) {
    try {
        let pool = await sql.connect(config);
        let store = await pool.request()
            .input('id', sql.SmallInt, id)
            .query("UPDATE Loja SET deleted = 1 WHERE idLoja = @id;")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteCourier(id) {
    try {
        let pool = await sql.connect(config);
        let store = await pool.request()
            .input('id', sql.SmallInt, id)
            .query("UPDATE Estafeta SET deleted = 1 WHERE idEstafeta = @id;")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

async function getCategoria(id) {
    try {
        let pool = await sql.connect(config);
        let catg = await pool.request()
            .input('id', sql.SmallInt, id)
            .query("SELECT * FROM Categoria")
        return catg.recordset
    } catch (err) {
        throw new Error(err)
    }
}

async function getCategoriaProd(id) {
    try {
        let pool = await sql.connect(config);
        let catg = await pool.request()
            .input('id', sql.SmallInt, id)
            .query("SELECT * FROM CategoriaProduto, SubCategoriaProduto")
        return catg.recordset
    } catch (err) {
        throw new Error(err)
    }
}

async function getMedalhas(id) {
    try {
        let pool = await sql.connect(config);
        let medal = await pool.request()
            .input('id', sql.SmallInt, id)
            .query("SELECT ListaMedalhas.nomeMedalha, ListaMedalhas.descricao, ListaMedalhas.icon, MedalhasUtilizador.dataDesbloqueio, MedalhasUtilizador.clienteId FROM ListaMedalhas INNER JOIN MedalhasUtilizador ON ListaMedalhas.idMedalha = MedalhasUtilizador.medalhaId WHERE MedalhasUtilizador.clienteId = @id")
        return medal.recordset
    } catch (err) {
        throw new Error(err)
    }
}

//
async function verEncomendas(id) {
    try {
        let pool = await sql.connect(config);
        let client = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT Cliente.*, Encomenda.* FROM  Encomenda INNER JOIN Cliente ON Encomenda.clienteId = Cliente.idCliente where Cliente.utilizadorId = @id")
        console.log(client)
        return client.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

async function retornaCliente(id) {
    try {
        let pool = await sql.connect(config);
        let client = await pool.request()
            .input('id', sql.Int, id)
            .query("SELECT Cliente.idCliente FROM  Utilizador INNER JOIN Cliente ON Utilizador.idUtilizador = Cliente.utilizadorId where Cliente.utilizadorId = @id")
        console.log(client.recordset[0].idCliente)
        return client.recordset[0].idCliente;
    } catch (err) {
        throw new Error(err);
    }
}

async function publicarEncomenda(numEncomenda, dataEncomenda, estado, valorTotal, lojaId, clienteId, estafetaId) {
    try {
        let pool = await sql.connect(config);
        let client = await pool.request()
            .input('numEncomenda', sql.Int, numEncomenda)
            .input('dataEncomenda', sql.DateTime, dataEncomenda)
            .input('estado', sql.VarChar, estado)
            .input('valorTotal', sql.Int, valorTotal)
            .input('lojaId', sql.Int, lojaId)
            .input('clienteId', sql.Int, clienteId)
            .input('estafetaId', sql.Int, estafetaId)
            .query("insert into Encomenda (numEncomenda, dataEncomenda, estado, valorTotal, lojaId, clienteId, estafetaId) values(@numEncomenda, @dataEncomenda, @estado, @valorTotal, @lojaId, @clienteId, @estafetaId)")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

//#endregion

// #region Courier

// funcao verificar estado
async function getCourierState(email) {
    try {
        let pool = await sql.connect(config);
        let store = await pool.request()
            .input('email', sql.VarChar, email)
            .query("SELECT idEstafeta, estado FROM Estafeta es INNER JOIN Utilizador u on es.utilizadorId = u.idUtilizador WHERE u.email = @email");
        if (store) {
            return store.recordset[0];
        } else {
            return -1;
        }
    } catch (err) {
        throw new Error(err);
    }
}

// funcao altera estado da encomenda
async function changeOrderStatus(id, status) {
    try {
        let pool = await sql.connect(config);
        let client = await pool.request()
            .input('id', sql.SmallInt, id)
            .input('estado', sql.VarChar, status)
            .query("UPDATE Encomenda SET estado = @estado WHERE idEncomenda = @id");
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

//funcao candidatura estafeta
async function newCandidacyCourier(candidacy, token) {
    try {
        let pool = await sql.connect(config);
        let can = await pool.request()
            .input('utilizadorId', sql.Int, candidacy.id)
            .query("Insert into Estafeta (utilizadorId) values (@utilizadorId);")
        let idestafeta = await pool.request()
            .input('input_parameter', sql.Int, candidacy.idEstafeta)
            .query("select * from Estafeta where idEstafeta = @input_parameter")
        filename = (token + '--' + idestafeta.recordset[0].idEstafeta + '--' + candidacy.doc).toString()
        let canestafeta = await pool.request()
            .input('fotoPerfil', sql.VarChar, filename)
            .input('fotoCartaoCidadaoFrente', sql.VarChar, filename)
            .input('fotoCartaoCidadaoVerso', sql.VarChar, filename)
            .input('pdfRegistoCriminal', sql.VarChar, filename)
            .input('estafetaId', sql.Int, idestafeta.recordset[0].idestafeta)
            .query("Insert into DocumentosEstafeta (fotoPerfil, fotoCartaoCidadaoFrente, fotoCartaoCidadaoVerso, pdfRegistoCriminal, estafetaId) values (@fotoPerfil, @fotoCartaoCidadaoFrente, @fotoCartaoCidadaoVerso, @pdfRegistoCriminal, @estafetaId);")
        return idestafeta.recordset[0].idEstafeta
    } catch (err) {
        return Error(err)
    }
}

async function updateCourierState(id, state) {
    try {
        let pool = await sql.connect(config);
        let store = await pool.request()
            .input('id', sql.SmallInt, id)
            .input('state', sql.SmallInt, state)
            .query("UPDATE Estafeta SET estado = @state WHERE idEstafeta = @id")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

async function atribiurMedalhas(idCliente) {
    try {
        let pool = await sql.connect(config);

        let nEncomendasPorUtilizador = await pool.request()
            .input('idCliente', sql.Int, idCliente)
            .query("SELECT c.idCliente, count(e.clienteId) as nEncomendas FROM Cliente c INNER JOIN Encomenda e ON e.clienteId = c.idCliente WHERE c.idCliente = @idCliente GROUP BY c.idCliente")
        var nEncomendas = nEncomendasPorUtilizador.recordset[0].nEncomendas

        //#region Gerar valor da data
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();

        var date = year + "-" + month + "-" + day;
        //#endregion

        // Nao verifico se já tem a medalha porque era impossivel ter.

        switch (nEncomendas) {
            case 1:
                let atribuiMedalha1 = await pool.request()
                    .input('medalhaId', sql.Int, 1)
                    .input('dataDesbloqueio', sql.Date, date)
                    .input('idCliente', sql.Int, idCliente)
                    .query("INSERT INTO MedalhasUtilizador (medalhaId, dataDesbloqueio, clienteId)  VALUES(@medalhaId,@dataDesbloqueio,@idCliente)")
                return true;
            case 2:
                let atribuiMedalha2 = await pool.request()
                    .input('medalhaId', sql.Int, 2)
                    .input('dataDesbloqueio', sql.Date, date)
                    .input('idCliente', sql.Int, idCliente)
                    .query("INSERT INTO MedalhasUtilizador (medalhaId, dataDesbloqueio, clienteId)  VALUES(@medalhaId,@dataDesbloqueio,@idCliente)")
                return true;
            case 3:
                let atribuiMedalha3 = await pool.request()
                    .input('medalhaId', sql.Int, 3)
                    .input('dataDesbloqueio', sql.Date, date)
                    .input('idCliente', sql.Int, idCliente)
                    .query("INSERT INTO MedalhasUtilizador (medalhaId, dataDesbloqueio, clienteId)  VALUES(@medalhaId,@dataDesbloqueio,@idCliente)")
                return true;
            case 4:
                let atribuiMedalha4 = await pool.request()
                    .input('medalhaId', sql.Int, 4)
                    .input('dataDesbloqueio', sql.Date, date)
                    .input('idCliente', sql.Int, idCliente)
                    .query("INSERT INTO MedalhasUtilizador (medalhaId, dataDesbloqueio, clienteId)  VALUES(@medalhaId,@dataDesbloqueio,@idCliente)")
                return true;
            case 5:
                let atribuiMedalha5 = await pool.request()
                    .input('medalhaId', sql.Int, 5)
                    .input('dataDesbloqueio', sql.Date, date)
                    .input('idCliente', sql.Int, idCliente)
                    .query("INSERT INTO MedalhasUtilizador (medalhaId, dataDesbloqueio, clienteId)  VALUES(@medalhaId,@dataDesbloqueio,@idCliente)")
                return true;
        }
    } catch (err) {
        throw new Error(err)
    }
}

async function cancelEncomenda(idEncomenda) {
    try {
        let pool = await sql.connect(config);
        let cancelarEncomenda = await pool.request()
            .input('idEncomenda', sql.Int, idEncomenda)
            .query("UPDATE Encomenda SET estado = 'Cancelada' WHERE idEncomenda = @idEncomenda")

        return true

    } catch (err) {
        throw new Error(err)
    }
}

async function acompanharEncomenda(idEncomenda) {
    try {
        let pool = await sql.connect(config);
        let acompanaEncomenda = await pool.request()
            .input('idEncomenda', sql.Int, idEncomenda)
            .query("SELECT estado FROM Encomenda WHERE idEncomenda = @idEncomenda")

        return acompanaEncomenda.recordset[0].estado

    } catch (err) {
        throw new Error(err)
    }
}

async function filtrarLojasCategoria(nomeCategoria) {
    try {
        let pool = await sql.connect(config);
        let categoriaFiltro = await pool.request()
            .input('nomeCategoria', sql.VarChar, nomeCategoria)
            .query("SELECT nomeLoja as Nome, morada, c.nome as Categoria FROM Loja l INNER JOIN Categoria c ON l.categoriaId= c.idCategoria WHERE c.nome = @nomeCategoria")

        return categoriaFiltro.recordset

    } catch (err) {
        throw new Error(err)
    }
}

async function filtrarProdutosCategoria(tipo, nomeCategoria, nomeSubCategoria) {
    try {
        let pool = await sql.connect(config);

        if (tipo == 3) {
            3
            let categoriaFiltro = await pool.request()
                .input('nomeCategoria', sql.VarChar, nomeCategoria)
                .input('nomeSubCategoria', sql.VarChar, nomeSubCategoria)
                .query(`SELECT Produto.nomeProduto, Produto.preco, Produto.horaRecolhaMin, Produto.horaRecolhaMax, Produto.fotoProduto, Produto.descricao, CategoriaProduto.nome as categoria, SubCategoriaProduto.nome AS subcategoria
FROM     Produto INNER JOIN
                  SubCategoriaProduto ON Produto.SubcategoriaProdId = SubCategoriaProduto.idSubcategoriaProd INNER JOIN
                  CategoriaProduto ON SubCategoriaProduto.categoria = CategoriaProduto.idCategoriaProd
                    WHERE CategoriaProduto.nome = @nomeCategoria AND SubCategoriaProduto.nome = @nomeSubCategoria`)

            return categoriaFiltro.recordset
        }
        if (tipo == 2) {
            let categoriaFiltro = await pool.request()
                .input('nomeCategoria', sql.VarChar, nomeCategoria)
                .query(`SELECT Produto.nomeProduto, Produto.preco, Produto.horaRecolhaMin, Produto.horaRecolhaMax, Produto.fotoProduto, Produto.descricao, CategoriaProduto.nome as categoria, SubCategoriaProduto.nome AS subcategoria
FROM     Produto INNER JOIN
                  SubCategoriaProduto ON Produto.SubcategoriaProdId = SubCategoriaProduto.idSubcategoriaProd INNER JOIN
                  CategoriaProduto ON SubCategoriaProduto.categoria = CategoriaProduto.idCategoriaProd
                    WHERE CategoriaProduto.nome = @nomeCategoria`)

            return categoriaFiltro.recordset
        }
        if (tipo == 1) {
            let categoriaFiltro = await pool.request()
                .input('nomeSubCategoria', sql.VarChar, nomeSubCategoria)
                .query(`SELECT Produto.nomeProduto, Produto.preco, Produto.horaRecolhaMin, Produto.horaRecolhaMax, Produto.fotoProduto, Produto.descricao, CategoriaProduto.nome as categoria, SubCategoriaProduto.nome AS subcategoria
FROM     Produto INNER JOIN
                  SubCategoriaProduto ON Produto.SubcategoriaProdId = SubCategoriaProduto.idSubcategoriaProd INNER JOIN
                  CategoriaProduto ON SubCategoriaProduto.categoria = CategoriaProduto.idCategoriaProd
                    WHERE SubCategoriaProduto.nome = @nomeSubCategoria`)

            return categoriaFiltro.recordset
        }


    } catch (err) {
        throw new Error(err)
    }
}

async function consultarHistoricoLojas(id) {
    try {
        let pool = await sql.connect(config);
        let store = await pool.request()
            .input('id', sql.SmallInt, id)
            .query("select * from Encomenda where lojaId = @id")
        return store.recordset;
    } catch (err) {
        throw new Error(err);
    }
}

async function editarPerfilLoja(id, idLoja, password, nome, email, contacto, nif, morada, nifLoja) {
    try {
        let pool = await sql.connect(config);
        let person = await pool.request()
            .input('id', sql.Int, idLoja)
            .query("select * from Loja WHERE idLoja = @id")
        let person2 = await pool.request()
            .input('idu', sql.Int, id)
            .query("select * from Utilizador WHERE idUtilizador = @idu")
        let product = {
            morada: person.recordset[0].morada,
            nif: person.recordset[0].nif
        }
        let util = {
            password: person2.recordset[0].password,
            nome: person2.recordset[0].nome,
            email: person2.recordset[0].email,
            contacto: person2.recordset[0].contacto,
            nif: person2.recordset[0].nif
        }
        console.log("Dados Loja: ", product)
        console.log("Dados Util: ", util)
        console.log("TEST: ", morada == "string" || morada.length == 0 ? product.morada : morada)
        console.log("TEST: ", morada)
        console.log("TEST: ", contacto)

        let perfil = await pool.request()
            .input('idLoja', sql.Int, idLoja)
            .input('morada', sql.VarChar, morada == "string" || morada.length == 0 ? product.morada : morada)
            .input('nifLoja', sql.Int, nifLoja == 0 || nifLoja.length == 0 ? product.nif : nifLoja)
            .query("update Loja set morada = @morada , nif = @nifLoja WHERE idLoja = @idLoja")
        let perfil2 = await pool.request()
            .input('id', sql.Int, id)
            .input('password', sql.VarChar, password == "string" || password.length == 0 ? util.password : password)
            .input('email', sql.VarChar, email == "string" || email.length == 0 ? util.email : email)
            .input('nome', sql.VarChar, nome == "string" || nome.length == 0 ? util.nome : nome)
            .input('nif', sql.Int, nif == 0 || nif.length == 0 ? util.nif : nif)
            .input('contacto', sql.Int, contacto === 0 || mocontactorada.length == 0 ? util.contacto : contacto)
            .query("update Utilizador set password = @password , nome = @nome , email = @email , contacto = @contacto, nif = @nif  WHERE idUtilizador = @id")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

async function editarPerfilCliente(id, idCliente, password, nome, email, contacto, nif, dataNascimento, pais, localizacao) {
    try {

        let pool = await sql.connect(config);
        let person = await pool.request()
            .input('id', sql.Int, idCliente)
            .query("select * from Cliente WHERE idCliente = @id")
        let person2 = await pool.request()
            .input('idu', sql.Int, id)
            .query("select * from Utilizador WHERE idUtilizador = @idu")

        let product = {
            dataNascimento: person.recordset[0].dataNascimento,
            pais: person.recordset[0].pais,
            localizacao: person.recordset[0].localizacao
        }
        let util = {
            password: person2.recordset[0].password,
            nome: person2.recordset[0].nome,
            email: person2.recordset[0].email,
            contacto: person2.recordset[0].contacto,
            nif: person2.recordset[0].nif
        }

        let perfil = await pool.request()
            .input('id', sql.Int, idCliente)
            .input('dataNascimento', sql.VarChar, dataNascimento == "string" || dataNascimento.length == 0 ? product.dataNascimento : dataNascimento)
            .input('pais', sql.VarChar,  pais == "string" || pais.length == 0 ? product.pais : pais)
            .input('localizacao', sql.VarChar,  localizacao == "string" || localizacao.length == 0 ? product.localizacao : localizacao)
            .query("update Cliente set dataNascimento = @dataNascimento , pais = @pais , localizacao = @localizacao, WHERE idCliente = @id")
        let perfil2 = await pool.request()
            .input('id', sql.Int, id)
            .input('password', sql.VarChar, password == "string" || password.length == 0 ? util.password : password)
            .input('email', sql.VarChar, email == "string" || email.length == 0 ? util.email : email)
            .input('nome', sql.VarChar, nome == "string" || nome.length == 0 ? util.nome : nome)
            .input('nif', sql.Int, nif == 0 || nif.length == 0 ? util.nif : nif)
            .input('contacto', sql.Int, contacto === 0 || mocontactorada.length == 0 ? util.contacto : contacto)
            .query("update Utilizador set password = @password , nome = @nome , email = @email , contacto = @contacto, nif = @nif  WHERE idUtilizador = @id")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

async function alterarEstadoLoja(id, estado) {
    try {
        let pool = await sql.connect(config);
        let perfil = await pool.request()
            .input('id', sql.Int, id)
            .input('estado', sql.Int, estado)
            .query("update Loja set aprovacao = @estado where idLoja = @id")
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

async function verEncomenda(idEncomenda) {
    try {
        let pool = await sql.connect(config);
        let acompanaEncomenda = await pool.request()
            .input('idEncomenda', sql.Int, idEncomenda)
            .query("SELECT * FROM Encomenda WHERE idEncomenda = @idEncomenda")

        return acompanaEncomenda.recordset

    } catch (err) {
        throw new Error(err)
    }
}


// #endregion

module.exports = {
    //#region Produtos
    newProduct: newProduct,
    editProduct: editProduct,
    listProduct: listProduct,
    removerCategoriaProduto: removerCategoriaProduto,
    novaCategoriaProduto: novaCategoriaProduto,
    novaSubCategoriaProduto: novaSubCategoriaProduto,
    loginUser: loginUser,
    finduser: finduser,
    registeruser: registeruser,
    compareuser: compareuser,
    //#endregion
    //#region Lojas
    novaCategoriaLoja: novaCategoriaLoja,
    //#endregion
    //#region Candidaturas
    mostrarPerfil: mostrarPerfil,
    newCandidacy: newCandidacy,
    newCandidacyCourier: newCandidacyCourier,
    consultarHistoricoLojas: consultarHistoricoLojas,
    alterarEstadoLoja: alterarEstadoLoja,

    //#endregion
    //#region Aprovacao
    approvestore: approvestore,
    approvecourier: approvecourier,
    dowloadfiles: dowloadfiles,
    removerCategoria: removerCategoria,
    approvestore: approvestore,
    dowloadfiles: dowloadfiles,
    //#endregion
    //#region Clientes
    listarProdutosClientes: listarProdutosClientes,
    adicionarCarrinho: adicionarCarrinho,
    removerCarrinho: removerCarrinho,
    listarCarrinho: listarCarrinho,
    getMedalhas: getMedalhas,
    cancelEncomenda: cancelEncomenda,
    acompanharEncomenda: acompanharEncomenda,
    filtrarLojasCategoria: filtrarLojasCategoria,
    filtrarProdutosCategoria: filtrarProdutosCategoria,
    editarPerfilLoja: editarPerfilLoja,
    editarPerfilCliente: editarPerfilCliente,
    //#endregion

    //#region admin
    getStoreFromAdmin: getStoreFromAdmin,
    deleteStore: deleteStore,
    deleteCourier: deleteCourier,
    atribiurMedalhas: atribiurMedalhas,
    getCategoria: getCategoria,
    getCategoriaProd: getCategoriaProd,
    //#endregion

    //#region courier
    getCourierState: getCourierState,
    updateCourierState: updateCourierState,
    changeOrderStatus: changeOrderStatus,
    verEncomenda: verEncomenda,
    //#endregion
    //#endregion
    verEncomendas: verEncomendas,
    publicarEncomenda: publicarEncomenda,
    retornaCliente: retornaCliente
}