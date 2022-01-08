// 登录验证
const joi = require('joi')
const username = joi.string().alphanum().min(3).max(10).required()
const password = joi
	.string()
	.pattern(/^\S{6,12}$/)
	.required()

exports.userLoginSchema = {
	body: {
		username,
		password,
	},
}
// 修改用户信息验证
const id = joi.number().integer().required()
const nickname = joi.string()
const email = joi.string().email()
exports.changeUserInfoSchema = {
	body: {
		id,
		nickname,
		email,
	},
}
// 修改用户密码验证
const oldPwd = password
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)
exports.updatepwdSchema = {
	id,
	oldPwd,
	newPwd,
}
// 修改用户头像验证
const avatar = joi.string().dataUri().required()
exports.updateAvatarSchema = {
	body: {
		id,
		avatar,
	},
}
