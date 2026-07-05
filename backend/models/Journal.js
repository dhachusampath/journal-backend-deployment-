const mongoose = require('mongoose');


const journalSchema = new mongoose.Schema({


  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
  ,
  article:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Article"
  },
  title:{
    type:String,
    required:true,
    trim:true
  },
  content:{
    type:String,
    required:true,
  
  },
  mood:{
    type:String,
    default:"🙂"
  }
},{timestamps:true})

module.exports = mongoose.model("Journals",journalSchema);