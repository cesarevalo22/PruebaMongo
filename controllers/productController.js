
const response = require("./responses/responses");
const productsDao = require("../infraestructure/dao/productsDao/productsDao")


exports.createProduct = async (req, res , next) => {

try {
    const name = req.query.name;
    const insertPrueba = await productsDao.createNewProduct(name);
    console.log(insertPrueba)
        
    response.success(req, res, 1, 201, "prueba ok");
} catch (error) {
    response.error(req, res, "prueba not created!", 400, error.message);
} 

} 