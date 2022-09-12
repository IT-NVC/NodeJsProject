const {Product,SubOrder} = require('../../models');
const { Op } = require("sequelize");

const getListProduct = async ()=>{
    const products = await Product.findAll();
    return products;
}

const getDetailProduct = async (id)=>{
    const product = await Product.findByPk(id);

    return product;
}


const getProductInCategory = async (categoryId)=>{
    const {count,rows} = await Product.findAndCountAll({
        where:{
            categoryId
        }
    });

    return {
        count,
        products:rows
    }
}


const findProduct = async (name)=>{
    const {count,rows} = await Product.findAndCountAll({
        where:{
           name:{
            [Op.substring]: `${name}`,
           }
        }
    });


    return {
        count,
        products: rows
    };
}





const createProduct = async(data)=>{
    return await Product.create(data);
}



const updateProduct = async(id,data)=>{
    const product = await Product.findByPk(id);

    if(!product){
        return false;
    }

    product.categoryId= data.categoryId|| product.categoryId;
    product.name=  data.name ||product.name;
    product.quantity=  data.quantity || product.quantity;
    product.price=  data.price || product.price;
    product.LinkImg=  data.price || product.LinkImg;
    product.updatedAt= new Date()

    return await product.save();
}

const deleteProduct = async (id)=>{
    await SubOrder.destroy({where:{productId: id}});
    const product = await Product.findByPk(id);

    if(!product){
        return false;
    }

    return await Product.destroy({
        where:{
            id
        }
    });

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