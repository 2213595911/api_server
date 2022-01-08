const db = require('../db')
const bcrypt = require('bcryptjs')
const mysql = require('../db')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, salt } = require('../config')
// 注册
const registry = (req, res) => {
	if (!req.body.username || !req.body.password) return res.cc('用户名或密码不能为空！')
	const sql = 'select * from ev_users where username=?'
	const userInfo = req.body
	db.query(sql, userInfo.username, (err, result) => {
		if (err) return res.cc(err)
		if (result.length) return res.cc('用户名已存在，请更换其他用户名')
		// 使用 bcrypt 包对密码进行加密处理
		userInfo.password = bcrypt.hashSync(userInfo.password, salt)
		const sql = 'insert into ev_users set ?'
		db.query(sql, userInfo, (err, result) => {
			if (err) return res.cc(err)
			if (result.affectedRows !== 1) return res.cc('注册用户失败，请稍后重试')
			res.cc('注册成功！', 0)
		})
	})
}
// 登录
const login = (req, res) => {
	const userInfo = req.body
	const sql = 'select * from ev_users where username=?'
	mysql.query(sql, userInfo.username, (err, result) => {
		if (err) return res.cc(err)
		if (!result.length) return res.cc('用户名不存在！')
		const valid = bcrypt.compareSync(userInfo.password, result[0].password)
		if (valid) {
			const token = jwt.sign({ ...result[0], password: '', user_pic: '' }, jwtSecretKey, { expiresIn: '6h' })
			res.cc('登陆成功', 0, { token: `Bearer ${token}` })
		} else {
			res.cc('登录密码错误,请尝试修改密码!')
		}
	})
}
module.exports = {
	login,
	registry,
}
