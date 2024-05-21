const {  
    initServer 
} = require("./ecommerce/src/server.js")
const cluster = require("cluster")
const { cpus } = require("os")
const configObject = require("./ecommerce/src/config/config.js")
const { logger } = require("./ecommerce/src/middleware/logger.js")

    initServer()




