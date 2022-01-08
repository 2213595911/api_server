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
