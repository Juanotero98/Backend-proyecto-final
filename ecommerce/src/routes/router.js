const { Router } = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')

class ClassRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() {
        return this.router
    }

    init() {} //INICIALIZACION PARA CLASES HEREDADAS //

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
        
        console.log('user', req.user)
        if(!req.user) return res.status(401).send({status: 'error', message: 'No autorizado'})
        
        if(!policies.includes(req.user.role.toUpperCase())) return res.status(403).send({status: 'error', message: 'No permissions'})
        
        next()
    }

    passportCall = strategy => {
        return async (req, res, next) =>{
            passport.authenticate(strategy, function(err, user, info){
                if(err) return next(err)
                
                if(user) {  
                    req.user = user   
                }
                next()
            })(req, res, next)
        }
    }


    get(path, policies, ...callbacks) {
        this.router.get(path, this.passportCall('jwt'), this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path,  this.passportCall('jwt'), this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
}


module.exports = ClassRouter