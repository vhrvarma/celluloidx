

let config = require('../config/config')
let jwt = require("jsonwebtoken");

let isLogin = (req,res,next) => {
    let token = req.headers.token || req.headers.authorization || req.headers.userToken || req.headers['x-access-token'] ;
    // let token = req.headers.token ||  req.headers.userToken;
     jwt.verify(token,config.jwt.secret, function(err,decodedData){
         if(err){
             console.log(err);
             res.status(401).json({status: false,message: "user not authorized"})
         } else{
             console.log("decoseddd",decodedData)
             req.jwt = decodedData;
             console.log('111111',req.jwt);
             next();
         }
     })

}

module.exports = {
    isLogin
}

