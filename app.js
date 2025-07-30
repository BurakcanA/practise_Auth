const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const User = require('./models/user')
const bcrypt = require('bcrypt')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/Auth')
db.on('error', err => console.log(`Connection Failed: ${err}`))
db.once('open',() => console.log('Database Connected!'))

app.get('/secret', (req,res) => {
    res.send('This is SECRET')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req,res) => {
    const { username, password } = req.body.user
    const hashedpassword = await bcrypt.hash(password,12)
    await User.insertOne({username: username,password: hashedpassword}).then(data => {console.log(data)})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', async (req,res) => {
    const {username , password} = req.body.user
    const user = await User.findOne({username: username})
    const result = await bcrypt.compare(password, user.password)
    if(result)
    {
        res.send('Logged In')
    }else
    {
        res.send('Failed')
    }
    
})

app.listen('3000', (req,res) => {
    console.log('Website is open')
})