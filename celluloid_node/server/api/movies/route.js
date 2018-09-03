
let express = require('express');

let router = express.Router();

let userController = require('./controller');


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart(); 
var auth=require('./../../middleware/middleware')

router.post('/uploadMovie',auth.isLogin,multipartMiddleware,userController.uploadMovie);

router.post('/uploadTrailer',multipartMiddleware,userController.uploadTrailer);

router.post('/addFilmDetails',auth.isLogin,userController.addFilmDetails);

router.post('/uploadCastPic',auth.isLogin,userController.uploadCastPic);


// router.get('/getFileFromS3',userController.getFileFromS3Bucket);

module.exports = router;