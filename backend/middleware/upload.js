const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,"uploads/");
  }
  ,
  filename:(req,file,cb) =>{
    const uniquename = Date.now()+"_"+Math.round(Math.random() * 1e9);
    cb(null,uniquename+path.extname(file.originalname));
  }
})

const fileFilter = (req,file,cb) =>{
  const allowedTypes = /jpg|jpeg|png|webp/;
  
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if(extName && mimeType){
    return cb(null,true);
  }
  cb(new Error("Only iamges are allowed"))
};


const upload = multer({
  storage,
  fileFilter,
  limits:{
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;