const express = require('express')
const router = express.Router()
var fetchuser=require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const Note=require('../models/Note')



// ROUTE 1: Get All The Notes Using :GET"/api/notes/getnotes" .login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
  try {
    const notes= await Note.find({user:req.user.id})
      res.json(notes)

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }
  })   



  // ROUTE 2: Add a new Note Using :POST"/api/notes/addnote" .login required
router.post('/addnote',fetchuser,[
  body('title','Enter a valid title').isLength({min:3}),
   body('description','Enter a valid description ').isLength({min:5}),  
],async(req,res)=>{
  try { 
    const {title,description,tag}= req.body;
     // If there is an error, return Bad request and error
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }
      const note=new Note({
        title,description,tag,user:req.user.id
      })
      const savednote= await note.save()
      res.json(savednote)
  }
   catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }
})   


  // ROUTE 3: Update an existing Note Using :PUT"/api/notes/updatenote" .login required
  router.put('/updatenote/:id',fetchuser,async(req,res)=>{
const { title,description,tag}=req.body;
try {
// create a newNote object
const newNote={};
if (title){newNote.title=title}
if (description){newNote.description=description}
if (tag){newNote.tag=tag}

// Find the note to be updated and update it
let note=await Note.findById(req.params.id)
if(!note){return res.status(404).send("Note Found")}

// {note.user.toString()}give this user id
if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed")
}
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
     res.json({note})
}
catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error")
}
 })


  // ROUTE 4: Delete an existing Note Using :DELETE"/api/notes/deletenote" .login  required
  router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
try {
// Find the note to be delet and delete it
let note=await Note.findById(req.params.id)
if(!note){return res.status(404).send("Note Found")}

// Allow deletion only if user owns it Note
// {note.user.toString()}give this user id
if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed")
}
    note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Success":"Note has been deleted",note: note})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
    }
     })
      

module.exports= router