const productService = require('../services/product');
const util = require('../common/util')

const getListProduct = async (req,res)=>{
    try {
        const products = await productService.getListProduct();
        console.log(products)
        res.send(util.sendSuccess({products})) 
    } catch (error) {
        return error
    }

}


const getDetailProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await productService.getDetailProduct(id);

        res.send(util.sendSuccess({product}))
    } catch (error) {
        return error
    }
}


const getProductInCategory = async (req,res)=>{
    try {
        const {id} = req.params;

        const products = await productService.getProductInCategory(id);

        res.send(util.sendSuccess({products}))
    } catch (error) {
        return error
    }
}


const findProduct = async (req,res)=>{
    try {
        const name = req.body.name;

        const products = await productService.findProduct(name);

        if(!products){
            throw{
                code:400,
                message:"Not found product!"
            }
        }
        
        res.send(util.sendSuccess({products}))
    } catch (error) {
        return error
    }
}




const createProduct = async (req,res)=>{
    try {
        const {categoryId,name,quantity,price,LinkImg} = req.body;

        const data = {
            categoryId,
            name,
            quantity,
            quantitySold: 0,
            price,
            LinkImg,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const product = await productService.createProduct(data);

        res.send(util.sendSuccess({product}));
    } catch (error) {
        return error
    }
}


const updateProduct = async (req,res)=>{
    try {
        const {id} = req.params;

        const {categoryId,name,quantity,price,LinkImg} = req.body;

        const data = {
            categoryId,
            name,
            quantity,
            price,
            LinkImg,
        }
        const product = productService.updateProduct(id,data);

        if(!product){
            throw{
                code: 400,
                message:"id doesn't exists!"
            }
        }

        res.send(util.sendSuccess({idProduct: id,product}));
    } catch (error) {
        return error
    }
}


const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        
        const product = await productService.deleteProduct(id);

        if(!product){
            throw{
                code:400,
                message:"id doesn't exists!"
            }
        }

        res.send(util.sendSuccess({idProduct: id,product}));
    } catch (error) {
        return error
    }
}




module.exports = {
    getListProduct,
    getDetailProduct,
    getProductInCategory,
    findProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}