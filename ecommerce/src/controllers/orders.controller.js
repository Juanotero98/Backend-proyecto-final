const { orderService } = require("../services")

class OrdersController {
    async getOrders(req, res){
        try {
            let orders = await orderService.getOrders()
            res.status(200).send(orders)
        } catch (error) {
            console.log(error)
        }
    }
    async getOrder(req,res){
        const {oid} = req.params
        const order = await orderService.getOrder(oid)
        res.status(200).send(order)
    }

    async createOrder(req, res){
        const { cid } = req.params
        const cart = await cartService.getCart(cid);
    
        if (!cart) {
            return res.status(401).json({
                status: 'error',
                message: 'Cart not found'
            })
        }
    
        // ARRAY CON ID DE PRODUCTOS QUE NO SE PUDIERON COMPRAR //
        const productsNotPurchased = [];
    
        // SE COMPRUEBA LA DISPONIBILDAD DE CADA PRODUCTO DENTRO DEL CARRITO //
        for (const item of cart.products) {
            const product = item.product;
            const quantity = item.quantity;
            const stock = await productService.getProductStock(product._id);
        
            if (quantity > stock) {
                // SI LLEGA A FALTAR STOCK EN ALGUN PRODUCTO EL ID DE ESTE SE AGREGARA AL ARRAY //
                productsNotPurchased.push(product._id);
            } else {
                // SI HAY SUFICIENTE STOCK SE RESTA LA CANTIDAD COMPRADA DE LA CANTIDAD TOTAL //
                await productService.updateProductStock(product._id, stock - quantity);
            }
        }
    
            // SE CREA TOCKET DE COMPRA CON DATOS CORRESPONDIENTES //
        const ticket = await ticketService.createTicket({
            user: req.user,
            products: cart.products,
            totalPrice: cart.totalPrice
        });
    
        // EN CASO DE HABER PRODUCTOS NO COMPRADOS SE ACTUALIZARA EL CARRITO PARA QUITARLOS //
        if (productsNotPurchased.length > 0) {
            await cartService.updateCartProducts(cid, cart.products.filter(item => !productsNotPurchased.includes(item.product._id)));
        } else {
            // SI LA COMPRA FUE EXITOSA SE VACIA EL CARRITO //
            await cartService.emptyCart(cid);
        }
    
        res.status(200).json({
            status: 'success',
            message: 'Purchase completed successfully',
            productsNotPurchased,
            ticket
        });
    }
   
    updateOrder(){}
    deleteOrder(){}
}

module.exports = new OrdersController()