
 const express = require("express")
const {PostModel} = require("../model/post.model")
const {auth} = require("../middleware/auth")
var jwt = require('jsonwebtoken');
 const PostRouter = express.Router()
 
 PostRouter.post("/add",auth,async(req,res)=> {
   const data = req.body
   try {
      const book = new PostModel(data)
      await book.save()
      res.status(200).json({msg:"Post added", addedPost:data})
   } catch (error) {
    res.status(400).json({err:error.message})
   }
 })

PostRouter.get("/",auth, async(req,res)=> {
  try {
    const data = await PostModel.find({authorID:req.body.authorID})
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({err:error.message})
  }
})


PostRouter.patch("/update/:id",auth, async(req,res)=> {
const {id} = req.params;
const post = await PostModel.findOne({_id:id})
try {
  if(req.body.authorID!==post.authorID){
    res.status(200).json({msg:"you are mot authorized to do this action"})
  }else{
    await PostModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).json({msg:"Post has been updated"})
  }
} catch (error) {
  res.status(400).json({err:error.message})
  
}
})

PostRouter.delete("/delete/:id",auth, async(req,res)=> {
  const {id} = req.params;
const book = await PostModel.findOne({_id:id})

  try {
    if(req.body.authorID!==book.authorID){
      res.status(200).json({msg:"you are mot authorized to do this action"})
    }else{
      await PostModel.findByIdAndDelete({_id:id})
      res.status(200).json({msg:"Post has been deleted"})
    }
  } catch (error) {
    res.status(400).json({err:error.message})
  }
})
 module.exports = {
    PostRouter
 }


