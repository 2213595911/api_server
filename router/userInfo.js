const express = require('express')
const router = express.Router()
const { userInfo, changeUserInfo, updatepwd, updateAvatar } = require('../router_handler/userInfo')
const expressJoi = require('@escook/express-joi')
const { changeUserInfoSchema, updatepwdSchema, updateAvatarSchema } = require('../schema/user')
const Joi = require('joi')

// 获取用户基本信息
router.get('/userinfo', userInfo)
// 修改用户基本信息
router.post('/userinfo', expressJoi(changeUserInfoSchema), changeUserInfo)
// 修改用户密码
router.post('/updatepwd', expressJoi(updatepwdSchema), updatepwd)
// 修改用户头像
router.post('/update/avatar', expressJoi(updateAvatarSchema), updateAvatar)
module.exports = router
