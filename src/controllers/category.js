const categoryService = require('../services/category');
const util = require('../common/util');

const postCategory = async (req,res)=>{
    try {
        const {name} = req.body;
        const checkCategory = await categoryService.checkCategory(null,name);

        if(checkCategory!=0){
            return res.status(409).send(util.sendError(409,"message:","Name already exitsts!"));
        }

        const data = {
            name:name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const category = await categoryService.postCategory(data);

        return res.send(util.sendSuccess({category}));
    } catch (error) {
        return error
    }
}


const getListCategory = async (req,res)=>{
    try {
        const categorys = await categoryService.getListCategory();

        res.send(util.sendSuccess({categorys}));
    } catch (error) {
        return error
    }
}

const getDetailCategory = async (req,res)=>{
    try {
        const id = req.params.id
        const category = await categoryService.getDetailCategory(id);
        if(!category){
            res.send(util.sendError(404,"Not found!"));
        }

        return res.send(util.sendSuccess({category}));
    } catch (error) {
        return error
    }
}

const updateCategory = async (req,res)=>{
    try {
        const {name} = req.body;
        const id = req.params.id;
        const checkId = await categoryService.checkCategory(id,null);
        const checkName = await categoryService.checkCategory(null,name);

        if(checkId==0){
            res.send(util.sendError(404,"Not found!"));
        }
        if(checkName!=0){
            res.send(util.sendError(409,"message","Name already exitst!"))
        }

        const category = await categoryService.updateCategory(id,name);

        return res.send(util.sendSuccess({category}));

    } catch (error) {
        return error
    }
}



module.exports = {
    postCategory,
    getListCategory,
    getDetailCategory,
    updateCategory
}