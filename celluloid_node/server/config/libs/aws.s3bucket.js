let config = require('../../config/config');

let jwt = require('jsonwebtoken');

const AWS = require('aws-sdk');

let fs = require('fs');
let s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: "AKIAI3KYSGEJNHGXZ5GQ",
    secretAccessKey: "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",
    region: "ap-southeast-1"
});


let uploadFile = function (fileKey, filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                let base64Data = new Buffer(data, 'binary');
                var params = { Bucket: "celluloidx-rj/profile_pics", Key: fileKey, Body: base64Data };
                s3.upload(params, function (err, s3data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(s3data);
                    }
                });
            }
        });
    });
}

let getFileFromS3Bucket = (req, res) => {
    console.log("file name", req.query.fileName);
    const url = s3.getSignedUrl('getObject', {
        Bucket: "celluloidx-rj",
        Key: req.query.fileName,
        Expires: 24 * 60 * 60,
        region: "ap-southeast-1"
    });

    res.status(200).json({ status: true, data: url });
};
let uploadBase64 = function (file, path) {
    new Promise((resolve, reject) => {
        if (file) {
            var newFileKey = path;
            buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            var params = {
                Bucket: config.aws.bucketName, Key: newFileKey,
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            };

            s3.upload(params, function (err, s3data) {
                if (err) {
                    reject("File upload failed," + err.message);
                } else {
                    resolve(s3data);
                }
            })

        } else {
            reject("Please provide file");
        }
    })


};

let uploadPic = function (key, data) {
    console.log("node workinggg")
    return new Promise((resolve, reject) => {
       
                var params = { Bucket: "celluloidx-rj/profile_pics", Key: key, Body: data };
                s3.upload(params, function (err, s3data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(s3data);
                    }
                });
            
        });
   
}



module.exports = {
    uploadFile,
    uploadBase64,
    getFileFromS3Bucket,
    s3,
    uploadPic
}