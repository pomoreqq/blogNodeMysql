const models = require('../models');
const Validator = require('fastest-validator')


function savePost(req,res) {

    const validate = new Validator()

    const schemaSavePost = {
        title: {type:'string',optional:false,max:'100'},
        content: {type:'string',optional: false, max: '500'},
        categoryId: {type: 'number', optional: false}
    }
    
    const validateSavePost = validate.validate(req.body,schemaSavePost)


    if (validateSavePost !== true) {
        return res.status(400).json({
            message: 'Validation for savePost failed',
            error: validateSavePost
        })
    }

    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }

    models.Post.create(post).then(result => {
        res.status(201).json({
            message: 'Post created succesful',
            post: result
        })
    }).catch(error => {
        res.status(500).json({
            message: 'Smthing went wrong',
            post: error
        })
    })
}


function showPost(req,res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if(result) {
            res.status(200).json({
                result: result
            })
        } else {
            res.status(400).json({
                message: 'cannot find post'
            })
        }
        
    }).catch( error => {
        res.status(500).json({
            message: 'something wen wrong',
            post: error
        })
    })
}

function allPosts(req,res) {
    models.Post.findAll().then(result => {
        res.status(200).json({
            message: 'all posts loaded',
            posts: result
        } )
    }).catch(e=> {
        res.status(500).json({
            message: 'something went wrong',
            error: error,
        })
    })
}


function updatePost(req,res) {


    const validate = new Validator()

    const schemaUpdatePost = {
        title: {type:'string',optional:true,max:'100'},
        content: {type:'string',optional: true, max: '500'},
        categoryId: {type: 'number', optional: true}
    }
    
    const validateUpdatePost = validate.validate(req.body,schemaUpdatePost)


    if (validateUpdatePost !== true) {
        return res.status(400).json({
            message: 'Validation for savePost failed',
            error: validateUpdatePost

        })
    }



    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
    }

    const userId = 1

    models.Post.update(updatedPost, {where: {id:id, userId: userId}}).then(result => {
        res.status(200).json({
            message: 'post sucesful updated',
            result: updatePost
        })
    }).catch(error=> {
        res.status(500).json({
            message: 'someting went wrong',
            error: error
        })
    })
}

function deletePost(req,res) {
    const id = req.params.id
    const userId = 1
    models.Post.destroy({where:{id:id, userId: userId}}).then(result=>{
        res.status(200).json({
            message: 'post deleted'
        })
    }).catch(e=>{
        res.status(500).json({
            message:'something went wrong'
        })
    })
}


module.exports = {
    savePost: savePost,
    showPost: showPost,
    allPosts: allPosts,
    updatePost: updatePost,
    deletePost: deletePost
}