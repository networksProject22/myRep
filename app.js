var express = require('express');
var path = require('path');
var fs = require('fs');
var alert = require("alert");
var session = require('express-session');
const { stringify } = require('querystring');
const { isNull } = require('util');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var d=["annapurna","bali","inca","paris","rome","santorini"];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        resave:true,
        saveUninitialized:true,
        secret:"secret"
    })
)

app.get('/', function(req, res){
 res.render('login');
});

app.get('/errorLogin', function(req, res){
    res.render('errorLogin');
   });


app.post('/', function(req,res){
    var username = req.body.username;
    var pass = req.body.password;
   if(username=="admin" && pass =="admin")
   {req.session.user = "admin";
    req.session.save();
    res.redirect('/home');}
   else
            res.redirect('errorLogin');
});

app.post('/errorLogin', function(req,res){
    var username = req.body.username;
    var pass = req.body.password;
   if(username=="admin" && pass =="admin")
   {req.session.user = "admin";
    req.session.save();
    res.redirect('/home');}
   else
        res.redirect('errorLogin');
           
});

app.get('/registration', function(req, res){
    res.render('registration');
   });

app.post('/register', function(req, res){
    var username = req.body.username;
    var pass = req.body.password;
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection("myCollection").findOne({username:username},function(err,result){
        if(err) throw err;
        if(result == null){
            db.collection("myCollection").insertOne({username:username,password:pass,togo:[]})
            res.redirect('/');
        }
        else{
            alert("username is already used");
        }
    });
    });
   });

app.get('/home', function(req, res){
    if(req.session.user )
    res.render('home');
    else
    res.redirect('/');
});

app.get('/wanttogo', function(req, res){
    if(req.session.user )
    res.render('wanttogo',{destToGo:req.session.user.togo});
    else
    res.redirect('/');
    
   });

app.get('/hiking', function(req, res){
    if(req.session.user )
    res.render('hiking');
    else
    res.redirect('/');
   });

app.get('/cities', function(req, res){
    if(req.session.user )
    res.render('cities');
    else
    res.redirect('/');
    
   });

app.get('/islands', function(req, res){
    if(req.session.user )
    res.render('islands');
    else
    res.redirect('/');
    
   });

app.get('/inca', function(req, res){
    if(req.session.user )
    res.render('inca');
    else
    res.redirect('/');
    
   });

app.get('/rome', function(req, res){
    if(req.session.user )
    res.render('rome');
    else
    res.redirect('/');
   });

app.get('/searchresults', function(req, res){
    if(req.session.user )
    res.render('searchresults');
    else
    res.redirect('/');
   });

app.get('/santorini', function(req, res){
    if(req.session.user )
    res.render('santorini');
    else
    res.redirect('/');
   });

app.get('/bali', function(req, res){
    if(req.session.user )
    res.render('bali');
    else
    res.redirect('/');
   });

app.get('/annapurna', function(req, res){
    if(req.session.user )
    res.render('annapurna');
    else
    res.redirect('/');
   });

app.get('/paris', function (req,res){
    if(req.session.user )
    res.render('paris');
    else
    res.redirect('/');
    });
app.post('/search', function (req,res){
    var s = req.body.Search;
    var i=0;
    var temp = [];
    if(s.length>0){
    while(i<d.length){
        if(d[i].toLowerCase().includes(s.toLowerCase())){
            temp.push(d[i]);
        }
        i++;
}}
    res.render('searchresults',{temp});
    

    
});


app.post('/annapurna', function (req,res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
        if(err) throw err;
        var db = client.db('myDB');
        if(req.session.user.togo.includes("annapurna")){
            alert("already there");
        }else{
            req.session.user.togo.push("annapurna");
            req.session.save();
            db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{togo:req.session.user.togo}});
            res.redirect("/annapurna");
        }
        
            
    })
});

app.post('/bali', function (req,res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
        if(err) throw err;
        var db = client.db('myDB');
        if(req.session.user.togo.includes("bali")){
            alert("already there");
        }else{
            req.session.user.togo.push("bali");
            req.session.save();
            db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{togo:req.session.user.togo}});
            res.redirect("/bali");
        }
        
            
    })
});

app.post('/inca', function (req,res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
        if(err) throw err;
        var db = client.db('myDB');
        if(req.session.user.togo.includes("inca")){
            alert("already there");
        }else{
            req.session.user.togo.push("inca");
            req.session.save();
            db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{togo:req.session.user.togo}});
            res.redirect("/inca");
        }
        
            
    })
});

app.post('/paris', function (req,res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
        if(err) throw err;
        var db = client.db('myDB');
        if(req.session.user.togo.includes("paris")){
            alert("already there");
        }else{
            req.session.user.togo.push("paris");
            req.session.save();
            db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{togo:req.session.user.togo}});
            res.redirect("/paris");
        }
        
            
    })
});

app.post('/rome', function (req,res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
        if(err) throw err;
        var db = client.db('myDB');
        if(req.session.user.togo.includes("rome")){
            alert("already there");
        }else{
            req.session.user.togo.push("rome");
            req.session.save();
            db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{togo:req.session.user.togo}});
            res.redirect("/rome");
        }
        
            
    })
});

app.post('/santorini', function (req,res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client){
        if(err) throw err;
        var db = client.db('myDB');
        if(req.session.user.togo.includes("santorini")){
            alert("already there");
        }else{
            req.session.user.togo.push("santorini");
            req.session.save();
            db.collection("myCollection").updateOne({username:req.session.user.username},{$set:{togo:req.session.user.togo}});
            res.redirect("/santorini");
        }
        
            
    })
});


if(process.env.PORT){
    app.listen(process.env.PORT, function() {console.log('Server started')});
}
else{
    app.listen(3000,function() {console.log('Server started on port 3000')});
}

