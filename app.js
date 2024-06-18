const express=require("express");
const app=express();
const path=require("path");
const passport=require("passport");
const expressSession=require("express-session");
const indexRouter=require("./routes/index");
const userRouter=require("./routes/user");
const port=8000;



app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"hello"
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userRouter.serializeUser());
passport.deserializeUser(userRouter.deserializeUser());

app.use('/',indexRouter);

app.listen(port,()=>{
    console.log("app is running at port 8000");
})