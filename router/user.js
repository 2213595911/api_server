const express = require('express')
const router = express.Router()
const { login, registry } = require('../router_handler/user')

router.post('/login', login)
router.post('/registry', registry)

module.exports = router
