var config = require('./dbconfig');
const sql = require('mssql');

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
        throw new Error(err);
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
        throw new Error(err);
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
        throw new Error(err);
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
        throw new Error(err);
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
        throw new Error(err);
    }
}

// Editar um Produto 
// Input _> Produto
// Output _> true/erro
async function editProduct(product) {
    try {
        let pool = await sql.connect(config);
        let editProduct = await pool.request()
            .input('id', sql.Int, product.id)
            .input('name', sql.VarChar, product.name)
            .input('quantity', sql.Int, product.quantity)
            .input('image', sql.VarChar, product.image)
            .query("update Produtos set id = @id, name_product = @name, image_product = @image, quantity_product =  @quantity WHERE id = @id")
        return true;
    } catch (err) {
        throw new Error(err);
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
        throw new Error(err);
    }
}
//#endregion

//#region Lojas
// Publicar uma Candidatura 
// Input _> Candidatura
// Output _> true/erro

async function newCandidacy(candidacy) {
    try {
        let pool = await sql.connect(config);
        let newProduct = await pool.request()
            .input('id', sql.Int, candidacy.id)
            .input('name', sql.VarChar, candidacy.name)
            .query("Insert into ... (id, ) values ();")
        return true;
    } catch (err) {
        throw new Error(err);
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
        throw new Error(err);
    }
}

module.exports = {
    //#region Produtos
    newProduct: newProduct,
    editProduct: editProduct,
    listProduct: listProduct,

    loginUser: loginUser,
    finduser: finduser,
    registeruser: registeruser,
    compareuser: compareuser,
    //#endregion
    //#region Lojas
    //#endregion
    //#region Candidaturas
    mostrarPerfil: mostrarPerfil
        //#endregion
}