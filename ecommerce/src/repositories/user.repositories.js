const UserDTO = require("../dto/user.dto")
const { logger } = require("../middleware/logger")

class UserRpositories { 
    constructor(dao){
        this.dao = dao
    }

    async getUsers(limit, page){
        try {
            return await this.dao.get(limit, page)            
        } catch (error) {
            return error
        }
    }

    async getUser(email){
        try {
            return await this.dao.getBy(email)   
        } catch (error) {
            logger.error(error)
        }
    }
    
    async createUser(newUser){
        try {
            
            return await this.dao.create(newUser)       
        } catch (error) {
            return error
        }
    }

    async updateUser(){}    
    async deleteUser(){}    
}

module.exports = UserRpositories