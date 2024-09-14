const mogoose  = require('mongoose');
var Schema    = mogoose.Schema;
//create schema for blog  posts
const  BlogPostsSchema   = new Schema({
    title:{
        type:String,
        required:true
    },
    snippt:{
        type: String,
        required:true
    },
    body :{
       type: String,
       required:true
    }},
    {timestamps:true})
    

    // blog modal
    const  BlogModel=mogoose.model("Blog",BlogPostsSchema);

    module.exports= BlogModel