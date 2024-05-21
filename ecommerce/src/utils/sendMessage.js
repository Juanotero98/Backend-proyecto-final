const twilio = require('twilio')
const config = require('../config/config.js')

const cliente = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)

let user = {
    nombre: 'Juan Sebastian',
    apellido: 'Otero'
}

const sendMessages = async () =>  cliente.messages.create({
    body: `Gracias ${user.nombre} ${user.apellido} por la compra`,
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${ config.NUMBER_MIO }`
})

module.exports = {
    sendMessages
}