
let express = require('express');

let router = express.Router();

let userRouter = require('../api/user/route');

let moviesRouter = require('../api/movies/route');

let middleware = require("../middleware/middleware")



router.use('/user', userRouter);

router.use('/movies',moviesRouter);




module.exports = router;