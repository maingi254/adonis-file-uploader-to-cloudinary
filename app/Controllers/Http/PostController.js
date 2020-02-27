'use strict'
const Post=use('App/Models/Post')
const  cloudinary=use('App/services/cloudinaryservice.js')

class PostController {
  async index({response}){
    const post= await Post.all()
    return response.status(200).json({
      post
    })
  }

  async create({response,request}){
    const {title,body}=request.all()
    const file=request.file('image')

    try {
      const cloudinaryResponse= await cloudinary.v2.uploader.upload(file.tmpPath,{
        folder:'postsapp'
      })
      let post=new Post()
      post.title=title
      post.body=body
      post.image_url=cloudinaryResponse.secure_url;
      await post.save()
      return response.status(200)
    } catch (e) {
      return response.status(500).json({
        message:'Error uploading  image'
      })

    }
  }
}

module.exports = PostController
