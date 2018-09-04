
let express = require('express');

let router = express.Router();

let movieController = require('./controller');


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart(); 
var auth=require('./../../middleware/middleware')

router.post('/uploadMovie',auth.isLogin,multipartMiddleware,movieController.uploadMovie);

router.post('/uploadTrailer',multipartMiddleware,movieController.uploadTrailer);

router.post('/addFilmDetails',auth.isLogin,movieController.addFilmDetails);

router.post('/uploadCastPic',auth.isLogin,movieController.uploadCastPic);

router.get('/getMyFilms',auth.isLogin,movieController.getMyFilms);


// router.get('/getFileFromS3',userController.getFileFromS3Bucket);

module.exports = router;