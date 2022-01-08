const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const articleCateRouter = require('./router/articleCate')
const joi = require('joi')
const expressJWT = require('express-jwt')
const { jwtSecretKey } = require('./config')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
// 定义返回数据中间件
app.use((req, res, next) => {
	res.cc = (err, status = 1, data) => {
		res.send({
			status,
			msg: err instanceof Error ? err.message : err,
			data,
		})
	}
	next()
})
app.use(expressJWT({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))
app.use('/api', userRouter)
app.use('/my', userInfoRouter)
app.use('/my/article', articleCateRouter)
app.use((err, req, res, next) => {
	// 判断是否是属于验证的错误
	if (err instanceof joi.ValidationError) return res.cc(err)
	if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
	res.cc(err)
})
app.listen(3007, () => {
	console.log('api server running at http://127.0.0.1:3007')
})
