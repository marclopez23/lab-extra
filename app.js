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
    //const isLoged = localStorage.getItem(login)
    if(isLoged) res.render("sesion-iniciada")
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/singin", (req, res) => {
    res.render("singin")
})

app.post("/registro-completo", async (req, res) => {
    try {
        const { mail, pass, repetida, name } = req.body;
        let newUser;
        const isCorrect = (pass === repetida);
        if (mail && isCorrect) {
            newUser = {
                nombre: name,
                correo: mail,
                pass: pass
            }
            const proces = await User.create(newUser)
            res.render("registro-completo")
        }
        else {
            throw new Error("Revisa los campos");
        }
    }
    catch (e) {
        res.render("error", {e})
    }
})

app.post("/sesion-iniciada", async (req, res) => {
    try {
        const { mail, pass:contrasena} = req.body;
        const getUser = await User.find({ correo: mail })
        const [{ correo, pass, nombre }] = getUser;
        const mailOk = mail === correo;
        const passOk = contrasena === pass;
        console.log(getUser)
        if (mailOk && passOk) {
            //localStorage.setItem(login, true);
            res.render("sesion-iniciada", {nombre} )
        }
        else throw new Error("Los datos de acceso no són correctos");
    }
    catch (e) {
      console.log(e)
      res.render("error", {e})  
    }
    
})






app.listen(3000, () => console.log("is runing"))