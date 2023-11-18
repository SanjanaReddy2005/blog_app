import React from "react";
import { Navbar } from "./components/Navbar";
import { Route, Routes} from 'react-router-dom'
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserBlogs } from "./pages/UserBlogs";
import {CreateBlog} from "./pages/CreateBlog";
import {BlogDetails} from "./pages/BlogDetaiils"
import {Toaster} from 'react-hot-toast';
import {BlogPage} from './pages/BlogPage'


function App() {
  return (
    <div className="">
      <Navbar/>
      <Toaster />
      <Routes>
      
      <Route path="/"  element={<Blogs/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/myBlogs" element={<UserBlogs/>} />
      <Route path="/blogDetails/:id" element={<BlogDetails/>} />
      <Route path="/blogPage/:id" element={<BlogPage/>} />
      <Route path='/createBlog' element={<CreateBlog/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>

    </div>
    
   
  );
}

export default App;
