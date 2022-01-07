const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRouter)

app.listen(3007, () => {
	console.log('api server running at http://127.0.0.1:3007')
})
