
const {Router} = require("express");
const {userModel} = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const userController = Router()

userController.post("/signup", async(req, res) => {

    const {name, email, password} = req.body

    bcrypt.genSalt(7, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {

            if(err){
                res.json("Signup failed");
            }

            const user = new userModel({
                name,
                email,
                password : hash
            })

            try{
                await user.save()
                res.json("Signup Done")
            }
            catch( err){
                res.json("Signup again")
            }
        })
    })
})

userController.post("/login", async(req, res) => {
    const {email, password} = req.body

    const user = userModel.findOne({email})
    const hash = user.password

    hash && bcrypt.compare(password, hash, function(err, res) {

        if(err){
            res.json("Login failed")
        }

        const token = jwt.sign({ userId : user._id}, process.env.JWT_SECRET);
        res.json({"msg" : "Login Successful", token,  user})
    })
})

module.exports = {
    userController
}