const { cartModel } = require("./models/cart.model.js")

class CartDaoMongo{    
    constructor(){
        this.Cart = cartModel
    }

    async get(){
        try {
            return await this.Cart.find()
            
        } catch (error) {
            return  new Error(error)
        }
    }
    
    async getBy(cid){
        try {            
            const res = await this.Cart.findOne({_id: cid}).lean()
            
            return res
        } catch (error) {
            return new Error(error)
        }
    }

    //AGREGAR ITEM //
    async create(userEmail){
        try {                
            return await this.Cart.create({ userEmail, products: [] })
        } catch (err) {
           return new Error('Error creating cart'+err);
        }
    }

    async update(cid, product){        
        try {
            const updatedCart = await this.Cart.findOneAndUpdate(
                { _id: cid, 'products.product': product.id },
                { $inc: { 'products.$.quantity': product.quantity } },
                { new: true }
            )
          
            if (updatedCart) {
                // SI EL PRODUCTO YA ESTA DENTRO DEL CARRITO SOLO SE MODIFICIA SU CANTIDAD //
                return updatedCart
            }
          
            // SI EL PRODUCTO NO ESTA EN EL CARRITO ESTE SE AGREGA CON UNA CANTIDAD MINIMA DE 1 //
            const newProductInCart = await this.Cart.findOneAndUpdate(
                { _id: cid },
                { $push: { products: { product: product.id, quantity: product.quantity } } },
                { new: true, upsert: true }
            )
          
            return newProductInCart
        } catch (error) {
            return new Error('Error adding product to cart'+error)
        }

    }

    // BORRAR ITEM DEL CARRITO //
    async deleteItem(cid, pid){
        try {
            return await this.Cart.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            )
        } catch (error) {
            return new Error('Error deleting product from cart'+error)
        }
    }

    // VACIAR EL CARRITO //
    async delete(cid){
        try {
            
            return await this.Cart.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
            )
        } catch (error) {
            return new Error('Error deleting cart'+ error)
        }
    }

}

module.exports = CartDaoMongo
