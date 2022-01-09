const joi = require('joi')
// 添加文章分类
const name = joi.string().required()
const alias = joi.string().alphanum().required()
exports.addArticleCateSchema = {
    body: {
        name,
        alias,
    },
}
// 删除文章分类
const id = joi.number().integer().required()
exports.deleteArticleCateSchema = {
    params: {
        id,
    },
}
// 根据 id 修改分类信息
exports.updateArticleCateSchema = {
    body: {
        id, name, alias
    }
}
// 添加文章
const title = joi.string().required()
const content = joi.string().allow().required()
const state = joi.string().valid('已发布', '草稿').required()
const cate_id = id
exports.addArticleSchema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}
// 根据 id 更新文章信息
exports.updateArticleSchema = {
    body: {
        id,
        title,
        cate_id,
        content,
        state,
    }
}