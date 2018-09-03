module.exports = {
    port : 3500,
    jwt : {
        secret:"krishnavarma23",
        options: {expiresIn: 365 * 60 * 60 * 24 }
    },
    db : {
        mongo:{
            uri:"mongodb://localhost:27017/celluloidx",
            options : {
                user :'',
                pass : ''
            }
        }
       
    },
    baseUrl:'http://localhost:'+3500,
}