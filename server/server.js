const express = require('express')
require("./database/connection")
const auth = require("./middlewares/auth")
const Account = require('./database/models/accounts');
const bcrypt = require("bcryptjs")
const cookieParser = require('cookie-parser');


const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

//! routes
app.get('/' , (req , res)=>{
    res.send('hello from home page :)')
})
app.get('/about' , auth,(req , res)=>{
    res.send(req.user)
})
app.get('/contact' , auth,(req , res)=>{
    res.send(req.user)
})
app.get('/signup' , (req , res)=>{
    res.send('hello from signup page :)')
})
app.get('/signin' , (req , res)=>{
    res.send('hello from signin page :)')
})
app.post('/signup' , (req , res)=>{
        let result;
    (async function(){
        try {
        if(!req.body.name||!req.body.email||!req.body.password||!req.body.confirmPassword||!req.body.username||!req.body.gender){
        return res.status(422).json({error:"plz filled the field properly!"})
        }
        const userExist = await Account.findOne({$or:[{email:req.body.email},{username:req.body.username}]})
        if(userExist){
            return res.status(422).json({error:"email or username already Exist!!"})
        }
        const password=req.body.password
        const cpassword=req.body.confirmPassword
        if(password===cpassword){
            const user = new Account({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword,
                gender:req.body.gender,
                username:req.body.username
            })
            result = await user.save()
            res.status(201).json({message:"user registerd sucessfullY!!"})

        }else{
            res.send("passwords are not matching!")
        }
       } catch (error) {
          res.status(400).send(error)
       }
    })()
})
app.post('/signin' , (req , res)=>{
    let result;
    (async function(){
       try {
        const username=req.body.username
        const password=req.body.password
        if(!username||!password){
            return res.status(422).json({error:"plz filled the field properly!"})
        }
        result= await Account.findOne({username})
        const token = await result.generateAuthToken()
        const isMatch= await bcrypt.compare(password,result.password)
        if(result && isMatch){
            res.cookie("jwt",token,{httpOnly:true})
            res.status(201).send(result)
        }else{
            res.send("invalid credientials!!")
        }
            } catch (error) {
                res.status(400).send(error)
       }
    })()
})
app.post('/contact' , auth,(req , res)=>{
    let result;
    (async function(){
       try {
        const {name,email,message}=req.body
        if(!name||!email||!message){
            return res.json({error:"please fill the contact form!!"})
        }
        result= await Account.findOne({_id:req.userId})
        if(result){
            const userMessage = await result.addMessage(name,email,message)
            await result.save()
            res.status(201).json({message:"contact message sent successfully!!!"})
          }
        } catch (error) {
                res.status(400).send(error)
       }
    })()
})
app.get('/logout',auth, async(req, res) => {
    console.log("hafsdjkhgfhasj");
    try {
        req.user.tokens=req.user.tokens.filter((e)=>{
            return e.token!==req.token
        })
        res.clearCookie("jwt")
        await req.user.save()
        res.status(201).send("log out")
    } catch (error) {
        res.status(500).send(error)
    }
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))