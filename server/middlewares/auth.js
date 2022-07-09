const jwt = require('jsonwebtoken');
const Account = require('../database/models/accounts')
const auth =async(req,res,next)=>{
    console.log("arnab saha middleware!");
    try {
        const token=req.cookies.jwt
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
        const user =await Account.findOne({_id:verifyUser._id,"tokens.token":token})
        if(!user){
            throw new Error("user Not Found")
        }
        req.token=token
        req.user=user
        req.userId=user._id
        next()
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided!!")
        console.log(error);
    }
}
module.exports=auth