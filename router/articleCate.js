const express = require('express')
const router = express.Router()
const {
    getArticleCate,
    addArticleCate,
    deleteArticleCate,
    getArticleCateById,
    updateArticleCate
} = require('../router_handler/articleCate')
const {addArticleCateSchema, deleteArticleCateSchema, updateArticleCateSchema} = require('../schema/article')
const expressJoi = require('@escook/express-joi')

router.get('/cates', getArticleCate)
router.get('/cates/:id', expressJoi(deleteArticleCateSchema), getArticleCateById)
router.post('/addcates', expressJoi(addArticleCateSchema), addArticleCate)
router.delete('/deletecate/:id', expressJoi(deleteArticleCateSchema), deleteArticleCate)
router.put('/updatecate', expressJoi(updateArticleCateSchema), updateArticleCate)
module.exports = router
