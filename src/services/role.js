const {Role} = require('../../models');


const getAllRole =async () => {
    let roles = await Role.findAll({
        attributes:['id','name'],
    });
    return roles;
};

const getRoleMember = async (nameRole)=>{
    let role =await Role.findAll({
        where:{
            name:nameRole,
        },
        attributes:['id','name']
    });
    return role;
};

const getRole = async (roleId)=>{
    let role = await Role.findByPk(roleId);
    return role;
}

const postRole = async (data)=>{
    let role = await Role.create(data);

    return role;
}


module.exports = {
    getAllRole,
    getRoleMember,
    postRole,
    getRole
}