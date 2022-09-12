const roleService = require('../services/role')
const util = require('../common/util')

const getAllRole = async (req,res)=>{
    try {
        
        let roles = await roleService.getAllRole();
        return res.send(util.sendSuccess({
            roles
        }));
    } catch (error) {
        console.log(error)
        throw error
    }
}

const postRole = async (req,res)=>{
    try {
        let data = {
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        let role = await roleService.postRole(data);

        return res.send(util.sendSuccess({
            role
        }));
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = {
    getAllRole,
    postRole
}