const { Router } = require('express')

const viewsRouter    = require('./views.router.js')
const usersRouter    = require('./users.router.js')
const authRouter     = require('./session.router.js')
const productsRouter = require('./products.router.js')
const ordersRouter   = require('./orders.router.js')
const cartsRouter    = require('./carts.router.js')
const pruebasRouter  = require('./pruebas.router.js')
const errorHandler   = require('../middleware/error/index.js')
const CustomError = require('../utils/errors/CustomeError.js')

const router = Router()

router.use('/',             viewsRouter.getRouter())
router.use('/session',      authRouter.getRouter())
router.use('/api/users',    usersRouter.getRouter())
router.use('/api/products', productsRouter.getRouter())
router.use('/api/orders',   ordersRouter.getRouter())
router.use('/api/carts',    cartsRouter.getRouter())
router.use('/pruebas',      pruebasRouter)

router.use('*', async (req, res)=>{
    res.status(404).json({
        mensaje: 'ruta no encontrada'
    })
})

router.use(errorHandler)


module.exports = {
    router
}