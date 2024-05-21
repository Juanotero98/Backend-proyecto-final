const Router = require('./router.js')
const { 
    getUsers,
    getUser, 
    createUser,
    updateUser,
    deleteUser,
    upgradeToPremiun,
    uploadDocuments
} = require('../controllers/users.controller.js')

const jwt = require('jsonwebtoken')
const { uploaderUser } = require('../utils/multerUserDocument.js')

class UserRouter extends Router {
    // CONSTRUCTO DE ROUTERCLASS //
    init(){
        this.get('/',              ['PUBLIC'],getUsers)
        this.get('/:uid',          ['PUBLIC'], getUser)
        this.post('/',             ['PUBLIC'], createUser)
        this.post('/premiun/:uid', ['PUBLIC'], upgradeToPremiun)
        this.put('/:uid',          ['PUBLIC'], updateUser)
        this.delete('/:uid',       ['PUBLIC'], deleteUser)
        this.post('/:uid/documents', 
            ['PUBLIC'], 
            uploaderUser.array('documents',5),
            
            uploadDocuments
        )        
    }
}



module.exports = new UserRouter()