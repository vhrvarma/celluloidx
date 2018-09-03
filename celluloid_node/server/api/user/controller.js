
let userCollection = require('./model');
let config = require('../../config/config');
let awsController = require("../../config/libs/aws.s3bucket");

let jwt = require('jsonwebtoken');


let login = (req, res) => {

    console.log("11111111", req);
    var body = req.body;
    new Promise((resolve, reject) => {
        if (!body.email) reject("provide email");
        if (!body.password) reject("provide password");
        else resolve();
    }).then(() => {
        userCollection.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] })
            .then(
                (response) => {

                    jwt.sign({ id: response._id }, config.jwt.secret, function (err, encodedData) {
                        if (!err) {
                            res.status(200).json({ status: true, message: "successfully logged in", userData: response, userToken: encodedData })
                        } else {
                            res.status(500).json({ status: false, message: err })
                        }
                    })

                }
            ).catch(
                (err) => {
                    res.status(400).json({ status: false, message: "Invalid credentials" })
                }
            )
    }).catch((err) => {
        res.status(400).json({ status: false, message: err })
    })


}

let signUp = (req, res) => {

    let body = req.body;
    new Promise((resolve, reject) => {
        if (!body.email) reject("Provide email");
        if (!body.password || body.password.length < 6) reject("Invalid password");
        if (!body.name) reject("Provide name");
        else resolve();
    }).then(() => {
        userCollection.findOne({ "email": body.email })
            .then(
                (response) => {
                    console.log('hiiiiidshdgb', response)
                    if (response) {
                        res.status(400).json({ status: false, message: "user already exists", data: null })
                    } else {
                        userCollection.create(body)
                            .then(
                                (response) => {
                                    res.status(200).json({ status: true, message: "successfully registered", data: response });
                                }
                            ).catch(
                                (err) => {
                                    res.status(500).json({ status: false, message: "Internal server error", data: null });
                                }
                            )
                    }
                }
            ).catch(
                (err) => {
                    res.status(500).json({ status: false, message: "Internal server error", data: null });
                }
            )
    }).catch((err) => {

        res.status(400).json({ status: true, message: err });
    })

 }


// let uploadPic = (req, res) => {
//         const file = req.files.image;
//         const trailer = req.files.trailer;
//         const movie = req.files.movie;
    
    
//         console.log("movie.path", movie.path);
//         console.log("trailer.path", trailer.path);
    
//         if (trailer) {
//             if (movie) {
//                 awsController.uploadFile(Date.now() + "movie", movie.path).then((response) =>{
//                     console.log("success",response);
//                     awsController.uploadFile(Date.now() + "trailer", trailer.path).then((response)=>{
//                         console.log("success trailer",response)
//                   }).catch((err)=>{
//                       console.log("err",err)
//                 })
//                 }).catch((err)=>{
//                     console.log("err",err);
//                 });
    
//             } else {
//             //     awsController.uploadFile(Date.now() + "trailer", trailer.path).then((response)=>{
//             //         console.log("success trailer",response)
//             //   }).catch((err)=>{
//             //       console.log("err",err)
//             //   })
//              }
//         } else {
//             console.log("No trailer");
//         }
    
    
       
//     }
    
let getFileFromS3Bucket = (req, res) => {
    console.log("file name", req.query.fileName);
    const url = awsController.s3.getSignedUrl('getObject', {
        Bucket: "celluloidx-rj",
        Key: req.query.fileName,
        Expires: 24 * 60 * 60
    });

    res.status(200).json({ status: true, data: url });
};
module.exports = {
    login,
    signUp,
    // uploadPic,
    getFileFromS3Bucket
}