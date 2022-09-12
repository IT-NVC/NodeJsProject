const {Order,SubOrder,Product,User} = require('../../models');


const getListOrder = async (pageNumber,pageSize)=>{
    
    let skip = Number(pageSize * (pageNumber - 1));
    let limit = Number(pageSize);
    
    const orders = await Order.findAll({
        limit: limit,
        offset:skip
    });

    const count = await Order.count();

    return {orders,count};
}



const getDetailOrder = async (id)=>{
    const order = await Order.findOne({
        where:{
            id
        },
        include:[
            {
                model:SubOrder,
            },
            {
                model: SubOrder,
                include:[
                    {
                        model:Product,
                    }
                ]
            }
        ],
    });

    return order;
}


//create one order
const createOrder = async (idProduct,idUser,Address,amount)=>{
    const product = await Product.findOne({
        where:{
            id:idProduct
        }
    });
    const user = await User.findOne({
        attributes:['id','name','address','phone'],
        where:{
            id:idUser
        }
    })

    if(!product || !user){
        return false;
    }

    if(amount>product.quantity){
        throw{
            "code":500,
            "message":"amount invalid!"
        }
    }

    //tinh tong tien
    let totalMoney = amount*product.price;

    //dia chi don hang
    let deliveryAddress = Address || user.Address;

    //tao don hang
    const createOrder = {
        userId:idUser,
        deliveryAddress,
        statusOrder:'pending',
        totalMoney,
        createdAt:new Date(),
        updatedAt:new Date()
    }
    const order = await Order.create(createOrder);

    //tao lien ket voi product
    const createSubOrder = {
        orderId: order.id,
        productId: idProduct,
        amount,
        totalPrice: totalMoney,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const subOrder = await SubOrder.create(createSubOrder);


    //cap nhat so luong product
    product.quantity = product.quantity - amount;
    product.quantitySold = product.quantitySold + amount;
    await product.save();

    return order;
}


const updateOrder = async(id,status)=>{
    const order = await Order.findByPk(id);
    if(!order){
        throw{
            code:400,
            message:"id order invalid!"
        }
    }

    order.statusOrder = status;
    order.updatedAt = new Date();

    await order.save();
    return order;
}


const deleteOrder = async (id)=>{
    
    await SubOrder.destroy({
        where:{
            orderId: id
        }
    })

    return await Order.destroy({
        where:{
            id
        }
    });
}


const findOrderByUser = async (idUser)=>{
    const orders = await Order.findAll({
        where:{userId: idUser},
        include:[
            {
                model:SubOrder,
            },
            {
                model: SubOrder,
                include:[
                    {
                        model:Product,
                    }
                ]
            }
        ]
    });
    return orders;
}



module.exports = {
    getListOrder,
    getDetailOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    findOrderByUser
}