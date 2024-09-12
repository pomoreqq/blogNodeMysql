const models = require('../models')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const Validator = require('fastest-validator')

function createUser(req,res) {

    const validate = new Validator()

    const createUserSchema = {
        name: {type: 'string',optional:false,max:'20'},
        email:{type: 'email', optional: false,max:'20'},
        password: {type:'string',optional: false,max: '20'}
    }

    const validateCreateUser = validate.validate(req.body,createUserSchema)


    if(validateCreateUser !== true) {
        return res.status(400).json({
            message: 'incorrect values',
            error: validateCreateUser
        })
    }

    models.User.findOne({where:{email:req.body.email}}).then(result => {
            if (result) {
                res.status(409).json({
                    message: 'Email already exist'
                })
            } else {
                bcrypt.genSalt(10,function(err,salt) {
                    bcrypt.hash(req.body.password,salt, function(err,hash) {
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        }
                    
                    
                        models.User.create(user).then(result => {
                            res.status(201).json({
                                message: 'User created sucessfully'
                            })
                        }).catch(error => {
                            res.status(500).json({
                                message: "registration went wrong"
                            })
                        })
                    })
                })

            }
    }).catch(error => {
        
    })

}
    
function loginUser(req, res){
    models.User.findOne({where:{email: req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        }else{
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

    



module.exports = {
    createUser: createUser,
    loginUser: loginUser
}