const express=require("express");
const router=express.Router();
const userModel=require("./user");
const postModel=require("./post");
const passport=require("passport");
const upload=require("./multer");

const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get('/',(req,res)=>{
   res.render("register",{nav:false});
})
router.get('/login',(req,res)=>{
    res.render("index",{nav:false});
 })
 router.get('/add',async(req,res)=>{
    const user= await userModel.findOne({username:req.session.passport.user});
    res.render("add",{nav:true});
 })
 router.get("/profile",isLoggedIn,async(req,res,next)=>{
    const user= await userModel.findOne({username:req.session.passport.user})
        .populate("posts");
    res.render("profile",{
        user,nav:true
    })
})
router.get("/feed",isLoggedIn,async(req,res,next)=>{
    const user= await userModel.findOne({username:req.session.passport.user})
    const posts =await postModel.find().populate("user")
    res.render("feed",{
        user,nav:true,posts
    })
})
router.get("/show/post",isLoggedIn,async(req,res,next)=>{
    const user= await userModel.findOne({username:req.session.passport.user})
        .populate("posts");
    res.render("show",{
        user,nav:true
    })
})
router.post("/createpost",isLoggedIn,upload.single("postimage"),async(req,res,next)=>{
    const user= await userModel.findOne({username:req.session.passport.user})
 const postdata= await postModel.create({
    user:user._id,
    title:req.body.title,
    description:req.body.description,
    image:req.file.filename,
  });
  user.posts.push(postdata._id);
  await user.save();
  res.redirect("/profile");
});

router.post("/fileupload",isLoggedIn,upload.single("images"),async(req,res,next)=>{
    const user= await userModel.findOne({username:req.session.passport.user});
    user.dp=req.file.filename;
    await user.save();
    res.redirect("/profile");
})


router.post("/register",(req,res)=>{
    const {email,username,fullname}=req.body;
    const userData=new userModel({email,username,fullname});

    userModel.register(userData,req.body.password)
    .then(function(){
        passport.authenticate("local")(req,res,function(){
            res.redirect("/profile");
        })
    })

})



router.post("/login",passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/" 
}),
function(req,res,next){
});

router.get("/logout",function(req,res){
    req.logout(function(err){
        if (err) {return next(err);}
        res.redirect("/");
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    res.redirect("/")
}
  
module.exports=router;
