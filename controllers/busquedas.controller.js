const {response} = require('express')


const getTodo = (req, resp = response) =>{

    const busqueda = req.params.busqueda

    resp.status(200).json({
        ok: false,
        msg: "busqueda total ->" + busqueda
    })

}

module.exports = { getTodo }