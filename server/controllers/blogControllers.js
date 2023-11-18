const  mongoose  = require("mongoose");
const blogModel = require("../models/Blog");
const userModel = require("../models/Users");

// get all blogs
exports.getAllBlogsController = async(req,res) => {
      try{
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
               success: false,
               message: "no blogs found"
            })
        }
        return res.status(201).send({
            blogsCount: blogs.length,
            success: true,
            message: "get all blogs",
            blogs
        })

      }catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "internal server issue while get all blogs",
            error
        })
      }
}

// create all blogs
exports.createBlogController = async(req,res) =>{
      try{
         const {title, description,image,user} = req.body;
         if(!title || !description || !image || !user){
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            })
         }
         const existingUser = await userModel.findById(user);
         if(!existingUser){
          return res.status(401).send({
            success: false,
            message: "unable to find user in the database"
          })
         }
         const newBlog = new blogModel({title,description,image,user});
         const session = await mongoose.startSession();
         session.startTransaction();
        //  await newBlog.save({session});
         existingUser.blogs.push(newBlog);
        //  await existingUser.save({session})
         session.commitTransaction();
         await newBlog.save();
         await existingUser.save();
         
         return res.status(200).send({
            success: true,
            message: "Your blog is created",
            newBlog
         })

      }catch(error){
        console.log(error);
           return res.status(500).send({
               success: false,
               message:"internal server error while creating a new blog",
               error
           })
      }
}


// update the blog
exports.updateBlogController = async(req,res) => {
        try{
            const {title, description, image, user} = req.body;
            console.log(title,description,image);
            const id = req.params.id;
            const blog = await blogModel.findByIdAndUpdate(id,{
              $set: req.body
            },{new:true});
            // await blog.save()
            console.log("hello")
            return res.status(200).send({
              success: true,
              message: "updated successfully",
              blog
            })
        }catch(error){
          console.log(error);
          return res.status(500).send({
            success: false,
            message: "internal server error while updating a blog",
            error
          })
        }
}

// get a single blog
exports.getBlogByIdController = async(req,res) => {
        try {
          const id = req.params.id;
          const blog = await blogModel.findById(id);

          if(!blog){
            return res.status(400).send({
              success: false,
              message: "Couldn't find the blog"
            })
          }
          return res.status(200).send({
            success:true,
            message: "Found Blog by id",
            blog
          })

        }catch(error){
          console.log(error);
          return res.status(500).send({
            success:false,
            message: "internal server error while getting single blog",
            error
          })
        }
}

// delete a blog
exports.deleteBlogController = async(req,res) => {
        try{
          const id = req.params.id;
          console.log("Hello")
          const blog = await blogModel.findById(id);
          if(!blog){
            return res.status(400).send({
              success: false,
              message: "couldnt't find the blog"
            })
          }
          console.log("Hi")
          const blogdelete = await blogModel.findByIdAndDelete(id);
          console.log("Hi")
          // if(blogdelete.user.blogs && blogdelete.user.blogs.pull(blogdelete)){
          //   console.log("Hello")
          //   await blogdelete.user.blogs.pull(blogdelete)
          // }
          // await blogdelete.user.save().then(savedBlog=>{
          //   console.log("Ho")
          // }).catch(error => {
          //   console.log(error)
          // });
          console.log("Hi")
          return res.status(200).send({
            success: true,
            message: "deleted successfully"
          })

        }catch(error){
          console.log(error)
          return res.status(500).send({
            success: false,
            message: "internal server error while deleting a blog",
            error
          })
        }
}

exports.userBlogController = async(req,res) => {
  try{
    const userBlogs = await userModel.findById(req.params.id).populate('blogs');
    if(!userBlogs){
      return res.status(404).send({
        success: false,
        message: "blogs not found with thos id"
      })
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlogs
    })

  }catch (error){
    console.log(error);
    return res.send(500).send({
      success: false,
      message: "internal server error while getting user-blog"
    })
  }
}
