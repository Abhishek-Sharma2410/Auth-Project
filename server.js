let mysql2 = require("mysql2");
let express = require("express");
let app = express();
let path = require("path");
let PORT = 8080;

let connection = mysql2.createConnection({
    host:"localhost",
    user:"root",
    database: "login",
    password: "Abhishek@1234*#"
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.render("home.ejs");
});

app.post('/signup', (req, res)=>{
    let {name, email, password} = req.body;
    let data = [[name, email, password]];
    let q = `insert into user (name, email, password) values ?`;
    connection.query(q, [data], (err, result)=>{
        if(err) {
            console.log(err);
            return;
        }    
        console.log(result);
    });    
    res.render("login.ejs");
});

app.get('/login', (req, res)=>{
    res.render("login.ejs");
})

app.post('/auth', (req, res)=>{
    let {email, password} = req.body;
    let q = `select name from user where email = ? AND password = ?`;
    connection.query(q, [email, password], (err, result)=>{
        if(err){
            console.log(err);
            return;
        }
        if(result.length==0){
            res.render("error.ejs");
        }
        let userName = result[0].name;
        let user = userName.charAt(0);
        res.render("userInfo.ejs", {user2 : result[0], user});
    })
});

app.listen(PORT, ()=>{
    console.log(`server is listening at port:${PORT}`);
});