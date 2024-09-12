const express = require('express')
const bodyParser = require('body-parser')
const commentsRoute = require('./routes/comments.router')
const app = express();

const postsRoute = require('./routes/posts.router')
const userRoute = require('./routes/user.router')

app.use(express.json())

app.use('/posts',postsRoute)
app.use('/comments',commentsRoute)
app.use('/users',userRoute)


module.exports = app