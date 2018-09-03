
let moviesCollection = require('./model');
let config = require('../../config/config');
let awsController = require("../../config/libs/aws.s3bucket");

let jwt = require('jsonwebtoken');

let moviekey= "";
let trailerkey = "";

let castKeyPictures= [];
let castPicUploads=[];

// let uploadMovie = (req,res) => {
//        console.log("reqqqq",req.files)

//        console.log("reqqqqbodyyyy",req.body);

        
    
       
//         const trailer = req.files.trailer;
//         const movie = req.files.movie;

        
    
//         if(trailer) {
//             if(movie) {
//                 awsController.uploadFile(Date.now() + "movie", movie.path).then((response) =>{
//                     console.log("success Movie",response);
//                     this.movieKey = response.key;
                   
//                     awsController.uploadFile(Date.now() + "trailer", trailer.path).then((response)=>{
//                         this.trailerKey = response.key;
//                         res.status(200).json({status: true,message: "succesfully saved your trailer and movie",movieKey: this.movieKey,
//                                     trailerKey: this.trailerKey});
//                   }).catch((err)=>{
//                     res.status(400).json({status: false,message: err})
//                 })
//                 }).catch((err)=>{
//                     res.status(400).json({status: false,message: err})
//                 });
    
//             } else {
//                 awsController.uploadFile(Date.now() + "trailer", trailer.path).then((response)=>{
//                     this.trailerKey = response.key;
//                     res.status(200).json({status: true,message: "succesfully saved your trailer", trailerKey: this.trailerKey})
//               }).catch((err)=>{
//                 res.status(400).json({status: false,message: err})
//               })
//             }
//         } else {
//             if(movie){
//                 awsController.uploadFile(Date.now() + "movie", movie.path).then((response) =>{
//                     this.movieKey = response.key;
//                     res.status(200).json({status: true,message: "succesfully saved your trailer",movieKey:this.movieKey})
//                 }).catch((err)=>{
//                     res.status(400).json({status: false,message: err})
//                 });

//             } else{
//                 res.status(400).json({status: false,message: "No trailer,No movie"})
//             }
//         }
    
    
       
//     }

let uploadMovie = (req,res) => {
            
              
            const movie = req.files.movie;

            console.log("movieee",req.files)

            if(movie) {
                awsController.uploadFile(Date.now() + "movie", movie.path).then((response) =>{
                       console.log("success Movie",response);
                       this.movieKey = response.key;
                       res.status(200).json({status: true,message: "succesfully saved your movie",movieKey:this.movieKey})
                }).catch((err) => {
                       res.status(400).json({status: false,message: err})
                       
                })
            }

}

let uploadTrailer = (req, res) => {

    const trailer = req.files.trailer;

            if(trailer) {
                awsController.uploadFile(Date.now() + "trailer", trailer.path).then((response) =>{
                       console.log("success trailer",response);
                       this.trailerKey = response.key;
                       res.status(200).json({status: true,message: "succesfully saved your trailer",trailerKey:this.trailerKey})
                }).catch((err) => {
                       res.status(400).json({status: false,message: err})
                       
                })
            }

}


let addFilmDetails = (req,res) => {
    console.log("reqbodyyy",req.body)
    // console.log("req files",req.files)
     moviesCollection.findOne({movieName: req.body.movieName})
      .then(
          (response) => {
              if(response){
                  res.status(400).json({status: false,message: "movie with that name already exists"});
              } else{
                  req.body.userId = req.jwt.id;
                  moviesCollection.create(req.body)
                    .then(
                        (response)=> {
                            res.status(200).json({status: true,message: "your movie successfully registered",data:response});
                        }
                    ) .catch(
                        (err) => {
                            res.status(400).json({status: false,message: err});
                        }
                    )
              }
          }
      ).catch(
        (err) => {
            res.status(400).json({status: false,message: err});
        }
     ) 
}


// let uploadCastPic = (req,res) => {

//     console.log("nodeereqqq",req)
//     awsController.uploadPic(Date.now() + req.body.name, req.body.picture)
//      .then((response) => {
//             res.status(200).json({status: true,message: "your pic successfully saved",data:response})
//      }).catch(
//          (err) => {
//             res.status(400).json({status: false,message: err});
//          }
//      )
// }


let uploadCastPic = (req,res) => {
  
    
  for(let i=0;i<req.body.pictures.length;i++){
  castPicUploads.push((new Promise((resolve,reject)=> {

    awsController.uploadPic(Date.now() + "cast1", req.body.pictures[i])
    .then((response) => {
           console.log("picressss",response)
        //    this.castKeyPictures[i]= response.key;
        //    res.status(200).json({status: true,message: "your pic successfully saved",data:response})
        //    if(i==req.body.pictures.length-1){
            // res.status(200).json({status: true,message: "your pics successfully saved",data: this.castKeyPictures})
           resolve(response);
    }).catch(
        (err) => {
           res.status(400).json({status: false,message: err});
           resolve(err);
        }
    )

  })));
    

  }

  Promise.all(castPicUploads).then(
      (response) => {
        res.status(200).json({status: true,message: "your pic successfully saved",data:response})
      }
  ).catch(
      (err) => {
        res.status(400).json({status: false,message: err});
      }
  )
  
   
}
    


module.exports = {
    uploadMovie,
    uploadTrailer,
    addFilmDetails,
    uploadCastPic
}