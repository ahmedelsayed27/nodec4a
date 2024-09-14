const express = require("express");
const mongoose = require("mongoose");
const BlogModel = require("./Models/blog");



const app = express();
const port = process.env.PORT || 3001;

// middle ware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/all", (req, res) => {
    BlogModel.find()
    .then(result =>{
      res.render("all",{posts:result});
    })
    .catch(err=>console.log(err))
});

app.get("/add",(req,res) =>{
  res.render("add");
  });

app.post("/add",(req,res) =>{
  const  Blog = new BlogModel({
  title:req.body.title,
  snippt:req.body.snippt,  
  body:req.body.body,
  })
  Blog.save()
  .then(result=>{
    res.redirect("/all")
  })
  .catch(err=>console.log(err))
  });
app.delete("/delete/:id",(req,res) =>{
  BlogModel.findByIdAndDelete(req.params.id).then(result =>{
    console.log(req.params.id); 
  })
});


app.get("/edit/:id",(req,res) =>{
  BlogModel.findById(req.params.id)
  .then(result =>{
    res.render("edit" , {obj:result})
  })
  .catch(err=>console.log(err))
});
app.put("/edit/:id",(req,res) =>{
  console.log(req.body);
  BlogModel.updateOne({_id:req.params.id }, req.body) 
  .then(result =>{
    res.render("all")
  })
  .catch(err=>console.log(err))
});

mongoose
  .connect(
    "mongodb+srv://ahmedelsayed27:qET9yZIihwwUP2Oz@cluster0.6pqez.mongodb.net/customers"
    ,{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
