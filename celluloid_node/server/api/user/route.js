
let express = require('express');

let router = express.Router();

let userController = require('./controller');


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart(); 

router.post('/login', userController.login );

router.post('/sign-up', userController.signUp);

// router.post('/upload-profile-pic',multipartMiddleware,userController.uploadPic);

router.get('/getFileFromS3',userController.getFileFromS3Bucket);

module.exports = router;