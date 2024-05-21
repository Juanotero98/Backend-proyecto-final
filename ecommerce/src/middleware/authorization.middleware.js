const authorization = (role) => {
    return async (req, res, next) => {
        // CREAMOS OTRA FUNCION PARA VERIFICAR LA AUTORIZACION EN CASO DE QUE EL MIDDLEWARE FALLE //
        
        if(!req.user) return res.status(401).json({status: 'error', error: 'Unauthorized'})
        if(req.user.role!==role) return res.status(403).json({status: 'error', error: 'No permissions'})
        next()
    }
}

module.exports = {
    authorization
}