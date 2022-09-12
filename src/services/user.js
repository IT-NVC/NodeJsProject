const {SubOrder,Order,User,Role} = require('../../models');
const { Op } = require("sequelize");

const getRoleUser = async (roleId) => {
        let role =  await Role.findByPk(roleId,{attributes:['name']});   
        return role;
};

const getUser = async (email)=>{
        const user = await User.findAll({
                where:{
                        email
                }
        });
        return user;
}

const getDetailUser = async (id)=>{
        const user = await User.findByPk(id);

        return user;
}
const getUserCheck = async (id)=>{
        return await User.findByPk(id,{
                attributes:['id','name','roleId'],
                includes:[{
                        model: Role,
                        attributes: ['name']
                }],
        });
}

const  updateRefreshToken = async (id,refreshToken)=>{
        let user = await User.findByPk(id);
        user.refreshToken = refreshToken;
        user.updatedAt = new Date();
        await user.save();
        return user;
}

const insertUser = async (data)=>{
        const user = await User.create(data);
        return user;
}

const updateUser = async (id,data)=>{
        let user = await User.findByPk(id);
        user.name= data.name||user.name,
        user.roleId=data.roleId||user.roleId,
        user.password= data.password||user.password,
        user.address= data.address||user.address,
        user.phone = data.phone||user.phone,
        user.updatedAt= new Date()
        return await user.save();
}

const checkEmail = async (email)=>{
        return await User.count({where:{
                email
        }})
}

const deleteUser = async (id)=>{

        let orders = await Order.findAll({
                where:{
                        userId: id
                }
        })

        let idOrder = orders.map(order=>{
                return order.id;
        })
        console.log(idOrder)
        await SubOrder.destroy({
                where:{
                        orderId:{
                                [Op.in]: idOrder
                        }
                }
        });
        
        await Order.destroy({
                where:{
                        id:{
                                [Op.in]: idOrder
                        }
                }
        })
       
        return await User.destroy({
                where:{
                        id
                }
        }) ;
}

const getListUser = async()=>{
        return await User.findAll({
                attributes:['id','name','email','address','phone']
        });
}

module.exports = {
        getRoleUser,
        getUser,
        getUserCheck,
        updateRefreshToken,
        insertUser,
        checkEmail,
        updateUser,
        deleteUser,
        getListUser,
        getDetailUser
}

