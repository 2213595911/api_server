const db = require('../db')
const bcrypt = require('bcryptjs')
const login = (req, res) => {
	res.send('login...')
}

const registry = (req, res) => {
	if (!req.body.username || !req.body.password) return res.send({ status: 1, message: '用户名或密码不能为空！' })
	const sql = 'select * from ev_users where username=?'
	const userInfo = req.body
	db.query(sql, userInfo.username, (err, result) => {
		if (err) return res.send({ status: 1, message: err.message })
		if (result.length) return res.send({ status: 1, message: '用户名已存在，请更换其他用户名' })
		// 使用 bcrypt 包对密码进行加密处理
		userInfo.password = bcrypt.hashSync(userInfo.password, 10)
		const sql = 'insert into ev_users set ?'
		db.query(sql, userInfo, (err, result) => {
			if (err) return res.send({ status: 1, message: err.message })
			if (result.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后重试' })
			res.send({ status: 0, message: '注册成功！' })
		})
	})
}

module.exports = {
	login,
	registry,
}
