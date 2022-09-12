const userService = require('../services/user');
const roleService = require('../services/role');
const util = require('../common/util')


const getDetailUser = async (req,res)=>{
  try {
    const id = req.params.id;
    const user = await userService.getDetailUser(id);

    res.send(util.sendSuccess({user}))
  } catch (error) {
    throw error
  }
}

const updateUser = async (req,res)=>{
      try {
        
        const id = req.params.id;
        const idRole = req.roleId;
        const role = await roleService.getRole(idRole);
        const {roleId,name,password,address,phone} = req.body;
        const checkUser = userService.getUserCheck(id);

        if(!checkUser){
            return res.status(404).send(util.sendError(404,"not found!"))
        }

        let data;
        if(role.name == util.Admin){
          data = {
            name,
            roleId,
            address,
            phone,
            password,
          }
        }
        else{
          data = {
            name,
            address,
            phone,
            password,
          }
        }

        const user = await userService.updateUser(id,data);

        res.send(util.sendSuccess({idUpdate: id,user}));
      } catch (error) {
        console.log(error)
        throw error
      }
}


const deleteUser = async(req,res)=>{
      try {
          const id = req.params.id;
          const checkUser = userService.getUserCheck(id);

          if(!checkUser){
              return res.status(404).send(util.sendError(404,"not found!"))
          }

          const user = await userService.deleteUser(id);

          res.send(util.sendSuccess({idDelete: id, user}));
      } catch (error) {
              throw error       
      }
}

const getListUser = async(req,res)=>{
    try {
        const users = await userService.getListUser();
        res.send(util.sendSuccess({users}));
    } catch (error) {
        throw error
    }
}
module.exports = {
    getDetailUser,
    updateUser,
    deleteUser,
    getListUser
}