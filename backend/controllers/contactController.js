const Contact = require('../models/Contact');


exports.createContact = async(req,res,next) =>{


  try{
   const{name,email,subject,message} = req.body;

      if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required.",
      });
    }


   const contact = new Contact({
    name,
    email,
    subject,
    message
   });

   await contact.save();

   res.status(200).json(contact);
  } 
  catch(err){
   res.status(404).json({message:"Creating contact failed"})
  }
}

exports.getContact = async(req,res) =>{

  try{
   const contact = await Contact.find().sort({createdAt: -1});
      return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  }
  catch(err){
  res.status(404).json({message:"Getting contact failed"})
  }
}