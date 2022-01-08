const mysql = require('../db')
const bcrypt = require('bcryptjs')
const { salt } = require('../config')
// 获取用户基本信息
const userInfo = (req, res) => {
	const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
	mysql.query(sql, req.user.id, (err, result) => {
		if (err) return res.cc(err)
		res.cc('获取用户基本信息成功！', 0, result[0])
	})
}
// 修改用户基本信息
const changeUserInfo = (req, res) => {
	const info = req.body
	const sql = 'update ev_users set? where id=?'
	mysql.query(sql, [info, info.id], (err, result) => {
		if (err) return res.cc(err)
		if (result.affectedRows !== 1) return res.cc('修改用户信息失败!')
		res.cc('修改用户信息成功!', 0)
	})
}
// 修改用户密码
const updatepwd = (req, res) => {
	const info = req.body
	const sql = 'select * from ev_users where id=?'
	mysql.query(sql, info.id, (err, result) => {
		if (err) return res.cc(err)
		if (!result.length) return res.cc('用户不存在!')
		// 判断输入的旧密码与数据库中的密码是否相同
		const valid = bcrypt.compareSync(info.oldPwd, result[0].password)
		if (!valid) return res.cc('旧密码错误!')

		const sql = 'update ev_users set password=? where id=?'
		mysql.query(sql, [bcrypt.hashSync(info.newPwd, salt), info.id], (err, result) => {
			if (err) return res.cc(err)
			if (result.affectedRows !== 1) return res.cc('更新用户密码失败!')
			res.cc('更新用户密码成功!', 0)
		})
	})
}
// 修改用户头像
const updateAvatar = (req, res) => {
	const info = req.body
	const sql = 'update ev_users set user_pic=? where id=?'
	mysql.query(sql, [info.avatar, info.id], (err, result) => {
		if (err) return res.cc(err)
		if (result[0].affectedRows !== 1) return res.cc('修改用户头像失败!')
		res.cc('修改用户头像成功!', 0)
	})
}
module.exports = {
	userInfo,
	changeUserInfo,
	updatepwd,
	updateAvatar,
}
