

let mongoose = require('mongoose');

let objectId = mongoose.Schema.Types.ObjectId;


let movieDetails = new mongoose.Schema({
    filmType: [],
    
    runTime: {
        hours: Number,
        minutes: Number,
        seconds: Number
    },
    releaseDate : {
        day: Number,
        month: Number,
        year: Number
    },
    userId: String,
    movieName: {type: String,unique: true},
    genre: String,
    shootingFormat: String,
    productionBudget: String,
    country: String,
    filmLanguage: String,
    fimColor: String,
    story: String,
    uploadMovie: String,
    uploadTrailer: String,
    moviePoster: String,  
    coverImage: String,
    ticketPrice: Number,
    urlMovieName: String,
    onlineProfiles: {
      website: "",
      twitter:"",
      facebook: "",
      instagram: ""
    },


    cast:[{
        name:String,
        role:String,
        picture:String,
        key: String
    }],
    crew:[{
        name:String,
        role:String,
        picture:String,
        key: String
    }]
},{
    timestamps:true
})

let movieModel = mongoose.model('movies',movieDetails);

module.exports = movieModel;