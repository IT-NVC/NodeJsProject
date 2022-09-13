require("dotenv").config();
const jwt = require("jsonwebtoken");
const util = require("../common/util");
const userService = require("../services/user")
const roleService = require("../services/role")


const authenticateRole = function (roelArray){
      const ret = async function(req,res,next){
        const unAuthenticatedRes = {
            message: "You're not authorized"
        };

        try {
            const tokenstr = req.headers.authorization;
            console.log(tokenstr)
            if(tokenstr){
                const headerParts = tokenstr.split(' ');
                if(Array.isArray(headerParts) && headerParts.length >1){
                    const token = tokenstr.split(' ')[1];
                    const decoded = jwt.verify(token,process.env.APP_SECRET_KEY);
                    if(decoded){
                        req.userId = decoded.userId;
                        req.roleId = decoded.roleId;
                        const role = await userService.getRoleUser(decoded.roleId);
                        const authorized = roelArray.indexOf(role.name);
                        if(authorized == -1){
                            return res.status(403).json(unAuthenticatedRes);
                        }
                        return next();
                    }
                    return res.status(401)
                    .json(unAuthenticatedRes);
                }
                return res.status(401)
                .json(unAuthenticatedRes);
            }else{
                return res.status(401)
                .json(unAuthenticatedRes);
            }
            
        } catch (error) {
            console.log(error)
            return res.status(401)
            .json(unAuthenticatedRes);
        }
      };

    return ret;
};


const login = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    let user = await userService.getUser(email);
    user = user[0].dataValues;
    if(email === user.email && password === user.password)
    {
        const refreshToken = await jwt.sign(
            {
                userId: user.id,
                roleId: user.roleId,
                email: user.email,
            },
            process.env.APP_SECRET_KEY_REFRESH,
            {
                expiresIn: 180*24*60*1000,
            }
        );


        await userService.updateRefreshToken(user.id,refreshToken);

        const role = await userService.getUserCheck(user.id);


        res.cookie("refreshToken",refreshToken,{
            domain: 'http://localhost:3000/nodeJsProject/refreshToken',
            httpOnly: true,
            maxAge: 180 * 24 * 60 * 1000,
          });

        return res.send(util.sendSuccess({
            userId: user.id,
            roleId: user.roleId,
            role: role.name,
            email: user.email,
            refreshToken
        }));
    }
    else{
        return res.status(401)
        .json("You're not login");
    }
}



const refreshToken = async (req,res)=>{
    try {
        const cookies = req.cookies || {};
        const refreshToken = cookies.refreshToken || req.headers['x-refresh-token'];

        if(!refreshToken)
        {
            res.send(util.sendError(401,"Authorization", "Invalid token"));
        }

        const decoded = jwt.verify(refreshToken,process.env.APP_SECRET_KEY_REFRESH);

        if(!decoded)
        {
            res.send(util.sendError(401,"Authorization", "Invalid token"));
        }

        const payload = {
            userId: decoded.userId,
            roleId: decoded.roleId,
            email: decoded.email
        };

        const accessToken = await jwt.sign(
            payload,
            process.env.APP_SECRET_KEY,
            {
                expiresIn: 30 * 60 * 1000,
            }
        );

        return res.send(
            util.sendSuccess({
              success: true,
              accessToken,
            })
          );
    } catch (error) {
        return error
    }
}


const register = async (req,res) => {

    try {

        const checkEmail = await userService.checkEmail(req.body.email.trim());
        let roleMember = await roleService.getRoleMember(util.Member);
        roleMember = roleMember[0].dataValues;

        if(checkEmail !=0 ){
            throw{
                code:409,
                message: "Email already exitsts!"
            }
        }

        const {email,password,name,address,phone} = req.body;

        const data = {
            roleId: roleMember.id,
            email: email.trim(),
            password: password,
            name: name.trim(),
            address: address.trim(),
            phone: phone.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const user = await userService.insertUser(data);

        return res.send(util.sendSuccess(200,user));
        
    } catch (error) {

        console.log(error);
        return error;
    }
}

module.exports = {
    authenticateRole,
    login,
    refreshToken,
    register
}