const {Router} = require('express')
const { logger } = require('../middleware/logger')
const { productService, cartService } = require('../services')

const router = Router()

const products = [
    {title: 'Gorra rosa',  price: 400, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'},
    {title: 'Gorra roja',  price: 350, imageUrl: 'https://www.artebordado.com.mx/wp-content/uploads/2019/07/GORRA-ROJA-BAS.jpg', category:'gorras'},
    {title: 'Gorra azul',  price: 300, imageUrl: 'https://jmedical.com.mx/wp-content/uploads/2019/04/198647-DG600-AZUL-REY-5-1024x881.png', category:'gorras'},
    {title: 'Gorra verde',  price: 200, imageUrl: 'https://camisetascomohongos.es/4216-large_default/gorra-adulto-5-paneles-personalizada-verde-kelly.jpg', category:'gorras'},
    {title: 'Gorra amarilla',  price: 150, imageUrl: 'https://www.disfrazjaiak.com/5936-thickbox_default/gorro-con-visera-amarilla.jpg', category:'gorras'}
]


 let users = [{email: 'fede@gmail.com', password:'fede', role: 'admin'}]

router.get('/inicio', async (req, res)=>{    
    try {
        console.log('auth principal')
        let testUser = {
            name: 'Federico',
            last_name: 'Osandón',
            role: 'admin',
        }
        
        res.status(200).render('index', {
            user: testUser,
            isAdmin: testUser.role==='admin',
            products,
            showNav: true
            
        })        
    } catch (error) {
        logger.info(error)
    }
})

router.get('/profile', async (req, res)=>{
    res.status(200).render('profile', {
        showNav: true
    })
})

router.get('/detalle/:pid', async (req, res)=>{
    const {pid} = req.params
    const product = await productService.getProduct(pid)
    res.render('detalle', {
        product,
        showNav: true
    })
})

router.get('/carts', async (req, res)=>{
    try {
        
        const cart = []
        res.render('cart', {
            cart,
            showNav: true
        })        
    } catch (error) {
        logger.error(error)
    }
})

router.get('/', async (req, res)=>{
    try {
        res.status(200).render('products', {
            showNav: true
        })        
    } catch (error) {
        logger.info(error)
    }
})


router.get('/login', async (req, res)=>{    
    try {
        res.status(200).render('login', {
            showNav: true
        })        
    } catch (error) {
        logger.info(error)
    }
})

router.get('/register', async (req, res)=>{
    try {
        
        res.status(200).render('register',{
            showNav: true
        })
    } catch (error) {
        logger.info(error)
    }
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        
        res.render('productsRealTime', {
            showNav: true
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/cart', (req, res)=>{
    res.render('cart')
})

module.exports = router