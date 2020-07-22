const express = require('express')
const path = require('path')
const hbs = require('express-hbs');



const app = express()


const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(path.join(__dirname,'/public')))
app.use('/bootstrap',express.static(`${__dirname}/node_modules/bootstrap/dist`))
// app.use('/popper',express.static(`${__dirname}/node_modules/popper/dist`))
app.use('/font-awesome',express.static(`${__dirname}/node_modules/font-awesome`))
app.use('/aos',express.static(`${__dirname}/node_modules/aos/dist`))
app.use('/jquery',express.static(`${__dirname}/node_modules/express-jquery/vendor`))

app.use(require('express-jquery')('/jquery.js'))

// send index index.html(hbs)
app.get('/',(req,res)=>{
    res.render('index',{title:'Мед'})
})


const { Telegraf } = require('telegraf')


const bot = new Telegraf('866085644:AAHtzlzzmH26SIj-JmRGZGjVeojeonfLSJE')
app.post('/sended',(req,res)=>{
    // console.log(req)
    bot.telegram.sendMessage('-1001476017876',`З сайта продажа меду.\n Ім'я: ${req.body.name}.\n Номер телефону: ${req.body.phone}`)
    res.render('sended',{title:'Успіх',name : req.body.name,phone:req.body.phone})
    // res.redirect('/sended')
})

app.engine('hbs',hbs.express4({
    ext:'.hbs',
    defaultLayout : __dirname +'/views/layouts/layout',
    partialsDir : __dirname + '/views/partials'
}))


app.set('view engine','hbs')
app.set('views',__dirname +'/views')


app.listen(process.env.PORT || 5000,()=>{
    console.log('started')
})