const { Router } = require('express')
const jwt = require('jsonwebtoken')

class ClassRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() {
        return this.router
    }

    //INICIALIZACION PARA CLASES HEREDADAS
    init() {} 

    applyCallbacks(callbacks) {
        // SE MAPEAN LOS CALLBACK UNO POR UNO PARA OBTENER SUS PARAMETROS //
        return callbacks.map(callback => async(...params)=> {
            try {
                // SE EJECUTA APPLY APUNTANDO DIRECTAMENTE A UNA INSTANCIA DE LA CLASE, COLOCAMOS THIS PARA QUE UTILICE SOLO EL CONTEXTO DEL ROUTER// 
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                // PARAMS [1] HACE REFERENCIA A LAS RESPUESTA //
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        // SENDSUCCESS , EL DESARROLLADOR SOLO DEBE ENVIAR EL PAYLOAD, EL FORMATO SE GESTIONA DE MANERA INTERNA // 
        res.sendSuccess = payload => res.send({status: "success", payload})
        res.sendServerError = err => res.status(500).send({status: "error", err})
        res.sendUserError = err => res.status(400).send({status: "error", err})
        next()
    }

    handlePolicies = policies => (req, res, next) =>{
        if (policies[0]==='PUBLIC') return next() 
        const authHeaders = req.headers.authorization
        if(!authHeaders) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        const token = authHeaders.split(" ")[1] 
        // OBTENEMOS EL USUARIO GRACIAS AL TOKEN //
        let user = jwt.verify(token, 'CoderSecretClassRouter')
        
        if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status: 'error', err: 'No permissions'})
        req.user = user
        next()
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
}


module.exports = ClassRouter