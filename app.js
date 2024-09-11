const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const postsRoute = require('./routes/posts.router')


app.use(express.json())

app.use('/posts',postsRoute)

module.exports = app