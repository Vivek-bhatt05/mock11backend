const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel} = require("../Models/User.model")


const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email,password,phoneNo,profile,bio}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(err){
                console.log(err)
            }else{
                const user= new UserModel({name,email,password:hash,phoneNo,profile,bio})
                await user.save()
                res.send("Registered user")
            }
        });
    }catch(err){
        res.send("error in registering")
        console.log(err)
    }
}) 

userRouter.get("/register",async(req,res)=>{
    try{
       const users= await UserModel.find()
       res.send(users)
    }catch(err){
       console.log(err)
       res.send("Something Went Wrong")
    }
 })


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user= await UserModel.find({email})
        if(user.length>0){
            const hashedPass=user[0].password
            bcrypt.compare(password, hashedPass, (err, result)=>{
                if(result){
                    const token = jwt.sign({"userID":user[0]._id}, "masai");
                    res.send({"msg":"Login Successful","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            });
        }else{
            res.send("Wrong Credentials")
        }
    }
    catch(err){
        res.send("error in login")
        console.log(err)
    }
}) 




module.exports={
    userRouter
}
