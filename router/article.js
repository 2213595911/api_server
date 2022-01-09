const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const expressJoi = require('@escook/express-joi')
const upload = multer({dest: path.join(__dirname, '../uploads')})
const {
    addArticle,
    getArticleList,
    deleteArticleById,
    getArticleById,
    updateArticleById
} = require('../router_handler/article')
const {addArticleSchema, deleteArticleCateSchema, updateArticleSchema} = require("../schema/article");

// 添加文章
router.post('/add', upload.single('cover_img'), expressJoi(addArticleSchema), addArticle)
// 获取文章列表
router.get('/list', getArticleList)
// 根据 id 获取文章详情
router.get('/:id', expressJoi(deleteArticleCateSchema), getArticleById)
// 根据 id 删除文章
router.delete('/delete/:id', expressJoi(deleteArticleCateSchema), deleteArticleById)
// 根据 id 更新文章详情
router.put('/edit', upload.single('cover_img'), expressJoi(updateArticleSchema), updateArticleById)
module.exports = router