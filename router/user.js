const express = require('express')
const router = express.Router()
const { login, registry } = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { userLoginSchema } = require('../schema/user')

router.post('/registry', expressJoi(userLoginSchema), registry)
router.post('/login', expressJoi(userLoginSchema), login)

module.exports = router
