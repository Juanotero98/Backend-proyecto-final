const { productService, cartService, userService } = require('../services')
const { logger } = require("../middleware/logger")

class ViewsController {
    renderInicio = async (req, res) => {
        try {
            const products = [
                {title: 'Gorra rosa',  price: 400, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category:'gorras'},
                {title: 'Gorra roja',  price: 350, imageUrl: 'https://www.artebordado.com.mx/wp-content/uploads/2019/07/GORRA-ROJA-BAS.jpg', category:'gorras'},
                {title: 'Gorra azul',  price: 300, imageUrl: 'https://jmedical.com.mx/wp-content/uploads/2019/04/198647-DG600-AZUL-REY-5-1024x881.png', category:'gorras'},
                {title: 'Gorra verde',  price: 200, imageUrl: 'https://camisetascomohongos.es/4216-large_default/gorra-adulto-5-paneles-personalizada-verde-kelly.jpg', category:'gorras'},
                {title: 'Gorra amarilla',  price: 150, imageUrl: 'https://www.disfrazjaiak.com/5936-thickbox_default/gorro-con-visera-amarilla.jpg', category:'gorras'}
            ]
    
    
            let users = [{email: 'coderjuanse@gmail.com', password:'Master98', role: 'admin'}]
            console.log('auth principal')
            let testUser = {
                name: 'Juan Sebastian',
                last_name: 'Otero',
                role: 'admin',
            }
            
            res.status(200).render('index', {
                user: testUser,
                isAdmin: testUser.role==='admin',
                products,
                showNav: true
                // style: 'index.css'
            })        
        } catch (error) {
            logger.info(error)
        }
    }
    renderProfile = async (req, res) => {
        try {            
            res.status(200).render('profile', {
                showNav: true
            })            
        } catch (error) {
            logger.error(error)
        }
    }
    
    renderCart = async (req, res) => {
        try {
            const {cid} = req.params
            
            const cart = await cartService.getCart(cid)
            console.log(cart.products)
            res.render('cart', {
                cart,
                showNav: true
            })        
        } catch (error) {
            logger.error(error)
        }
    }

    renderProducts = async (req, res) => {
        try {
            res.status(200).render('products', {
                showNav: true
            })        
        } catch (error) {
            logger.info(error)
        }
    }

    renderDetalle = async (req, res) => {
        try {
            const {pid} = req.params
            const product = await productService.getProduct(pid)
            res.render('detalle', {
                product,
                showNav: true
            })
        } catch (error) {
            logger.error(error)
        }
    }
    
    renderLogin            = async (req, res) => {
        try {
            res.status(200).render('login', {
                showNav: true
            })        
        } catch (error) {
            logger.info(error)
        }
    }
    renderRegister = async (req, res) => {
        try {
                
            res.status(200).render('register',{
                showNav: true
            })
        } catch (error) {
            logger.info(error)
        }
    }
    renderRealTimeProducts = async (req, res) => {
        try {
            
            res.render('productsRealTime', {
                showNav: true
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ViewsController()