const express = require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const PORT=8080
app.listen(PORT,()=>{
    console.log('Server is running on port $(PORT)..')
})
const mongoose=require('mongoose')

const  DB='mongodb+srv://abhaygan:abhay911@cluster0.x39xzny.mongodb.net/MyDb'
mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(()=>{
    console.log('Database connected...')
})
const PhoneBook=require('./model/PhoneBook.js')
app.post('/add-phone',async (req,res)=>{
    const phoneNumber=new PhoneBook(req.body)
    try{
        await phoneNumber.save()
        res.status(201).json({
            status:'Success',
            headers:{
                'Authorization':'',
                'Content-type':'',

            },
            data:{
                phoneNumber
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message:err
        })

    }

})
app.get('/get-phone',async(req,res)=>{
    const phoneNumbers=await PhoneBook.find({})
    try{
        res.status(200).json({
            status:'Sucess',
            data:{phoneNumbers
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message:err
        })
    }
})