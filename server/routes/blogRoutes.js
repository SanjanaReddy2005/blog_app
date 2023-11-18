const express = require("express");
const { getAllBlogsController,
        createBlogController,
        updateBlogController,
        getBlogByIdController,
        deleteBlogController, 
        userBlogController
      } = require("../controllers/blogControllers");

// Router Object
const Router = express.Router();


// routes
// all blogs || METHOD: GET
Router.get('/allBlogs',getAllBlogsController)

// create blog || METHOD: POST
Router.post('/createBlog',createBlogController)

//update Blog || METHOD: PUT
Router.put('/updateBlog/:id',updateBlogController)

// single Blog || METHOD: GET
Router.get('/singleBlog/:id',getBlogByIdController)

//delete Blog || METHOD: DELETE
Router.delete('/deleteBlog/:id',deleteBlogController)

//getsingleblogofuser || METHOD: GET
Router.get('/userBlogs/:id',userBlogController)
// export Router object
module.exports = Router