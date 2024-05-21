const { Router } = require('express')
const { ParametrosController: { getSearchWord, definirParams } } = require('../controllers/parametros.controller')

const router = Router()

// SE PRUEBA LA RUTA CON EL USO DE PARAMETROS //

router.param('word', definirParams)


router.get('/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)', getSearchWord)


router.get('*', async (req, res)=>{
    res.status(404).json({
        mensaje: 'ruta no encontrada'
    })
})

module.exports = router