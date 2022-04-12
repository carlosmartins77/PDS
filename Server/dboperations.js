var config = require('./dbconfig');
const sql = require('mssql');
const Int = require('tedious/lib/data-types/int');

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
        return true;
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
            .input('subCatProdId', sql.Int, product.subCatProdId)
            .query("update Produto set nomeProduto = @name , quantidade = @quantity , preco = @price , horaRecolhaMin = @hourRecoMin, horaRecolhaMax = @hourRecoMax, fotoProduto = @image, lojaId = @lojaId, SubcategoriaProdId = @subCatProdId WHERE idProduto = @id")
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
        let editProduct = await pool.request()
            .query("select * from Produto")
        console.log(editProduct.recordset)
        return editProduct.recordset;
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
        let registerCategory = await pool.request()
            .input('nomeCategoria', sql.VarChar, category.categoria)
            .query("INSERT INTO Categoria (Nome) VALUES (@nomeCategoria);")
        return true
    } catch (err) {
        return Error(err)
    }
}

async function novaCategoriaProduto(category) {
    try {
        let pool = await sql.connect(config);
        let registerCategory = await pool.request()
            .input('nomeCategoria', sql.VarChar, category.categoria)
            .query("INSERT INTO CategoriaProduto (Nome) VALUES (@nomeCategoria);")
        return true
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
            .input('id', sql.Int,id)
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
            .input('id', sql.Int,id)
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
            .input('id', sql.Int,id)
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
            //.query("UPDATE Utilizador SET (estado) VALUES (@estado) where id = @id;") // rever query(talvez seja preciso criar campo estado em vez de apagar)
            // a apagar realmente - nao vale a pena:
            /*.query("DELETE FROM LinhaEncomenda WHERE idUtilizador = @id")
            .query("DELETE FROM  WHERE idUtilizador = @id")
            .query("DELETE FROM Utilizador WHERE idUtilizador = @id")
            .query("DELETE FROM Utilizador WHERE idUtilizador = @id")
            .query("DELETE FROM Utilizador WHERE idUtilizador = @id")
            .query("DELETE FROM Utilizador WHERE idUtilizador = @id")*/
        /*
            DELETE FROM table WHERE condition
            tabelas onde apagar:
            LinhaEncomenda
            encomenda
            documentos da loja
            adminloja
            estafeta/loja
            utilizador
        */  
        return true;
    } catch (err) {
        throw new Error(err);
    }
}

//#endregion

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
    //#endregion
    approvestore: approvestore,
    dowloadfiles: dowloadfiles,
    removerCategoria: removerCategoria,
    approvestore: approvestore,
    dowloadfiles: dowloadfiles,
    //#region Clientes
    listarProdutosClientes:listarProdutosClientes,
    adicionarCarrinho: adicionarCarrinho,
    removerCarrinho: removerCarrinho,
    listarCarrinho: listarCarrinho,
    //#endregion

    //#region admin
    getStoreFromAdmin: getStoreFromAdmin,
    deleteStore: deleteStore
    //#endregion
    //#endregion
}