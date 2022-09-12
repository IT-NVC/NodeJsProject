const {Category} = require('../../models')


const checkCategory = async (id,name)=>{
    if(id){
        return await Category.count({
            where: {
                id
            }
        });
    }
    else
    {
        return await Category.count({
            where: {
                name
            }
        });
    }
}


const postCategory = async (data)=>{
    return await Category.create(data);
}

const getListCategory = async ()=>{
    return await Category.findAll({
        attributes:['id','name']
    });
}

const getDetailCategory = async (id)=>{
    return await Category.findByPk(id);
}

const updateCategory = async (id,name)=>{
    let category = await Category.findByPk(id);
    category.name = name;
    category.updatedAt = new Date();
    await category.save();
    return category;
}

module.exports = {
    checkCategory,
    postCategory,
    getListCategory,
    updateCategory,
    getDetailCategory
}

