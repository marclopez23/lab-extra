const express = require('express');  
const hbs = require('hbs');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/Users.model');

const MONGODB_URI = 'mongodb://localhost:27017/users';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(self => { console.log(`Connected to the database: "${self.connection.name}"`) });

app.use( express.json() );      
app.use(express.urlencoded({     
  extended: true
})); 


app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/singin", (req, res) => {
    res.render("singin")
})

app.post("/registro-completo", (req, res) => {
    try {
        const { mail, pass, repetida } = req.body;
        let newUser;
        const isCorrect = (pass === repetida);
        if (mail && isCorrect) {
            newUser = new User({
                correo: mail,
                pass: pass
            })
            console.log(newUser)
            res.render("registro-completo")
        }
        else {
            throw new Error("Revisa los campos");
        }
    }
    catch (e) {
        console.log(e)
        res.render("error")
    }
})

app.post("/sesion-iniciada", (req, res) => {
    res.render("sesion-iniciada")
})






app.listen(3000, () => console.log("is runing"))