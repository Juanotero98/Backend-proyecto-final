let users = []
class UserDaoMemory { 
    
    get = async ()=> {
        
        return await users
    }

    create = async (user)=> {}
}

module.exports = UserDaoMemory