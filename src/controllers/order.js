const orderService = require('../services/order')
const util = require('../common/util')


const getListOrder = async (req,res)=> {

    try {
        const {pageNumber,pageSize} = req.query;

        const orders = await orderService.getListOrder(pageNumber,pageSize);
  
        res.send(util.sendSuccess({orders}));
    } catch (error) {
        return error
    }
}



const getDetailOrder = async (req,res)=>{
    try {
        
        const {id} = req.params;

        const order = await orderService.getDetailOrder(id);

        res.send(util.sendSuccess({order}));
    } catch (error) {
        return error
    }
}


const createOrder = async (req,res)=>{
    try {
        const {idProduct} = req.params;
        const idUser = req.userId;
        const {Address,amount} = req.body;

        const order = await orderService.createOrder(idProduct,idUser,Address,amount);

        if(!order){
            throw{
                code:400,
                messgae:"user or product doesn't exists!"
            }
        }

        res.send(util.sendSuccess({order}));
    } catch (error) {
        return error
    }
}


const updateOrder = async(req,res)=>{
    try {
        const {status} = req.body;
        const {id} = req.params;
        if(!status){
            throw{
                code: 400,
                message:"status invalid!"
            }
        }
        const order = await orderService.updateOrder(id,status);

        res.send(util.sendSuccess({order,message:"update order successfully!",id}));
    } catch (error) {
        return error
    }
}


const deleteOrder = async (req,res)=>{
    try {
        const {id} = req.params;

        const order = await orderService.deleteOrder(id);

        res.send(util.sendSuccess({order,message:"delete order successfully!",id}));
    } catch (error) {
        return error
    }
}


const findOrderByUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const orders = await orderService.findOrderByUser(id);

        res.send(util.sendSuccess({orders}));
    } catch (error) {
        return error
    }

}


module.exports= {
    getListOrder,
    getDetailOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    findOrderByUser
}