const { expression } = require('joi')
const db = require('../db')
// 获取文章分类列表
const getArticleCate = (req, res) => {
	const sql = 'select * from ev_articlesCate where is_delete <> 1 order by id asc'
	db.query(sql, (err, result) => {
		if (err) return res.cc(err)
		if (!result.length) return res.cc('获取分类列表失败!')
		res.cc('获取分类列表成功!', 0, result)
	})
}
// 添加分类
const addArticleCate = (req, res) => {
	const sql = 'select * from ev_articlesCate where name=? or alias=?'
	const info = req.body
	db.query(sql, [info.name, info.alias], (err, results) => {
		if (err) return res.cc(err)
		// 分类名称 和 分类别名 都被占用
		if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
		if (results.length === 1 && results[0].name === info.name && results[0].alias === info.alias)
			return res.cc('分类名称与别名被占用，请更换后重试！')
		// 分类名称 或 分类别名 被占用
		if (results.length === 1 && results[0].name === info.name) return res.cc('分类名称被占用，请更换后重试！')
		if (results.length === 1 && results[0].alias === info.alias) return res.cc('分类别名被占用，请更换后重试！')
		const sql = 'insert into ev_articlesCate set ?'
		db.query(sql, info, (err, result) => {
			if (err) return res.cc(err)
			if (result.affectedRows !== 1) return res.cc('添加分类失败!')
			res.cc('添加分类成功!', 0)
		})
	})
}
// 根据 id 删除分类
const deleteArticleCate = (req, res) => {
	const id = req.params?.id
	const sql = 'update ev_articlesCate set is_delete=1 where id=? and is_delete<>1'
	db.query(sql, id, (err, result) => {
		if (err) return res.cc(err)
		if (result.affectedRows !== 1) return res.cc('删除分类失败!')
		res.cc('删除成功!', 0)
	})
}
// 根据 id 获取文章分类列表
const getArticleCateById = (req, res) => {
	const id = req.params.id
	const sql = 'select * from ev_articlesCate where id=? and is_delete<>1'
	db.query(sql, id, (err, result) => {
		if (err) return res.cc(err)
		if (!result.length) return res.cc('没有该分类!')
		res.cc('获取该分类成功!', 0, result[0])
	})
}
// 根据 id 更新分类信息
const updateArticleCate = (req, res) => {
	const info = req.body
	const sql = 'select * from ev_articlesCate where name=? or alias=?'
	db.query(sql, [info.name, info.alias], (err, results) => {
		if (err) return res.cc(err)
		if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
		if (results.length === 1 && results[0].name === info.name && results[0].alias === info.alias)
			return res.cc('分类名称与别名被占用，请更换后重试！')
		// 分类名称 或 分类别名 被占用
		if (results.length === 1 && results[0].name === info.name) return res.cc('分类名称被占用，请更换后重试！')
		if (results.length === 1 && results[0].alias === info.alias) return res.cc('分类别名被占用，请更换后重试！')
		const sql = 'update ev_articlesCate set? where id=? and is_delete<>1'
		db.query(sql, [info, info.id], (err, result) => {
			if (err) return res.cc(err)
			if (result.affectedRows !== 1) return res.cc('更新分类信息失败')
			res.cc('更新分类信息成功', 0)
		})
	})
}
module.exports = {
	getArticleCate,
	addArticleCate,
	deleteArticleCate,
	getArticleCateById,
	updateArticleCate,
}
