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
      console.log("dentro", logUser.recordset)
      if (logUser.recordset.length > 0) return true
    else return false
  }
  catch (err) {
    console.log("Login: ", err);
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
  }
  catch (err) {
    console.log("registeruser: ", err);
  }
}

async function finduser(useremail) {
  try {
    const pool = await sql.connect(config);
    const user = await pool.request()
      .input('email', sql.VarChar, useremail)
      .query("SELECT * FROM Utilizador where email = @email;")
    return user.recordset
  }
  catch (err) {
    console.log("Find User: ", err);
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
  }
  catch (err) {
    console.log("Publicar Novo Produto: ", err);
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
  }
  catch (err) {
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
  }
  catch (err) {
    console.log("Listar Produto: ", err);
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
  }
  catch (err) {
    console.log("Publicar Candidatura: ", err);
  }
}
//#endregion

module.exports = {
  //#region Produtos
  newProduct: newProduct,
  editProduct: editProduct,
  listProduct: listProduct,

  loginUser: loginUser,
  finduser: finduser,
  registeruser: registeruser,
  //#endregion
  //#region Lojas
  //#endregion

}