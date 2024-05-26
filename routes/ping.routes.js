/*
    path : "api/ping"
*/

const {Router} = require('express')

const router = Router();

router.get('/', (req, resp) => 
    {
        resp.send("pong, server back andando")
    })

module.exports = router