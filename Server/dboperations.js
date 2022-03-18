var config = require('./dbconfig');
const sql = require('mssql');
const { get } = require('express/lib/response');

//#region Exemplo
async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('select * from Produtos');
        return result.recordsets;
    } catch (err) {
        console.log("Erro: ", err)
    }
}

async function getOrder(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, orderId)
            .query("select * from Produtos where id = @input_parameter");
        return product.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addOrder(order) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('id', sql.Int, order.id)
            .input('name', sql.VarChar, order.name)
            .input('quantity', sql.Int, order.quantity)
            .input('image', sql.VarChar, order.image)
            .query("Insert into Produtos (id, name_product, image_product, quantity_product) values (@id, @name, @image, @quantity);")
            // Ver depois se sera melhor usar o execute _> execute('insert_Produtos');
        return insertProduct.recordsets;
    } catch (err) {
        console.log(err);
    }
}
//#endregion

//#region Produto

// Publicar um Produto 
// Input _> Produto
// Output _> true/erro
async function newProduct(product) {
    try {
        let pool = await sql.connect(config);
        let newProduct = await pool.request()
            .input('id', sql.Int, product.id)
            .input('name', sql.VarChar, product.name)
            .input('quantity', sql.Int, product.quantity)
            .input('image', sql.VarChar, product.image)
            .query("Insert into Produtos (id, name_product, image_product, quantity_product) values (@id, @name, @image, @quantity);")
        return true;
    } catch (err) {
        console.log("Publicar Produto: ", err);
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
        console.log("Editar Produto: ", err);
    }
}

// Listar um Produto 
// Input _> Produto
// Output _> true/erro
async function listProduct(productid) {
    try {
        let pool = await sql.connect(config);
        let editProduct = await pool.request()
            .input('input_parameter', sql.Int, productid)
            .query("select * from Produtos where id = @input_parameter")
        return true;
    } catch (err) {
        console.log("Listar Produto: ", err);
    }
}
//#endregion

//#region Lojas
// Publicar uma Candidatura 
// Input _> Candidatura
// Output _> true/erro
async function newProduct(candidacy) {
    try {
        let pool = await sql.connect(config);
        let newProduct = await pool.request()
            .input('id', sql.Int, candidacy.id)
            .input('name', sql.VarChar, candidacy.name)
            .query("Insert into ... (id, ) values ();")
        return true;
    } catch (err) {
        console.log("Publicar Candidatura: ", err);
    }
}

//#endregion

// # Permissoes
// Obter permissoes do user
// Input -> 
// Output -> Tipo de permissoes/Erro

async function getPermissoes(utilizadorId) {
    try {
        let pool = await sql.connect(config);
        let getPermissoes = await pool.request()
            .input('id', sql.Int, utilizadorId)
            .query("SELECT TipoPermissoes FROM utilizador WHERE id = @id");

        return getPermissoes.recordsets;

    } catch (err) {
        console.log("Erro", err);
    }
}

//#endregion


module.exports = {
    //#region Exemplo
    getOrders: getOrders,
    getOrder: getOrder,
    addOrder: addOrder,
    //#endregion
    //#region Produtos
    newProduct: newProduct,
    editProduct: editProduct,
    listProduct: listProduct,
    //#endregion
    //#region Lojas
    getPermissoes: getPermissoes
        //#endregion

}