const multer = require('multer')
const fs = require('fs')
const { dirname } = require('path')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = '';
      if (file.fieldname === 'profile') {
        folder = 'profiles';
      } 
      if (file.fieldname === 'products') {
        folder = 'products';
      } 
      if (file.fieldname === 'documents'){
        folder = `documents`; // CARPETA ESPECIFICA PARA USUARIOS //
      }
      const uploadFolder = `uploads/${req.params.uid}/${folder}`; // CARPETA DE DESTINO

      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true }); // SE CREA LA CARPETA DE DESTINO SI NO EXISTE //
      }
      cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
    
      cb(null, Date.now() + '-' + file.originalname)
    },
  });

const uploaderUser = multer({ 
    storage, 

    
   
    onError: function(err,next){
        console.log(err)
        next()
    }
})

module.exports = { uploaderUser }