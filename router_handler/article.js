const db = require("../db")
const path = require('path')
// 添加文章
const addArticle = (req, res) => {
    console.log(req.file)
    if (!req.file || req.file.fieldname !== 'cover_img') res.cc('文章封面必须上传!')
    // req.user 数据是通过 jwt 解析token 得到的
    const body = {
        ...req.body,
        cover_img: path.join(__dirname, '../uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    const sql = 'insert into ev_articles set?'
    db.query(sql, body, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('添加文章失败!')
        res.cc('添加文章成功!', 0)
    })
}
// 获取文章列表
const getArticleList = (req, res) => {
    const sql = 'select * from ev_articles where is_delete<>1'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        if (!result.length) return res.cc('获取文章列表失败!')
        res.cc('获取文章列表成功!', 0, result)
    })
}
// 根据 id 删除文章数据
const deleteArticleById = (req, res) => {
    const id = req.params.id
    const sql = 'update ev_articles set is_delete = 1 where id=?'
    db.query(sql, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('删除文章失败!')
        res.cc('删除文章成功!')
    })
}
// 根据 id 获取文章详情
const getArticleById = (req, res) => {
    const id = req.params.id
    const sql = 'select * from ev_articles where id=? and is_delete<>1'
    db.query(sql, id, (err, result) => {
        if (err) return res.cc(err)
        if (!result.length) return res.cc('没有该文章!')
        res.cc('获取该文章成功', 0, result)
    })
}
// 根据 id 更新文章
const updateArticleById = (req, res) => {
    const sql = 'update ev_articles set? where id=?'
    const info = req.body
    db.query(sql, [info, info.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('更新文章信息失败!')
        res.cc('更新文章信息成功!', 0)
    })
}
module.exports = {
    addArticle,
    getArticleList,
    deleteArticleById,
    getArticleById,
    updateArticleById
}