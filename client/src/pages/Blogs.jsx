import React, { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import {Card} from '../components/Cards'
// import { useNavigate } froxm "react-router-dom";


const Blogs = () => {
    const [blogs,setBlogs] = useState([]);
    // const navigate = useNavigate();
   
    const getAllBlogs = async() => {
        try{
          const {data} = await axios.get('http://localhost:8000/api/v1/blog/allBlogs')
          
          if(data?.success){
            setBlogs(data?.blogs)
          }
          
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{

        getAllBlogs();
        
    },[])

    console.log(blogs)
    // const handleUsername = (users) => {
    //     return 
    // }
    const id = localStorage.getItem("UserId")
    console.log(id)

    // const array = blogs.map((item)=>
    //    <div>{id === item.user._id ? "true" : "false"}</div>
    // )
    

    const cardBlog = blogs.map((item)=>
        <Card  username={item?.user?.username} id={item?._id} isUser={id === item?.user?._id ? true : false} title={item?.title} description={item?.description} image={item?.image} createdAt={item?.createdAt} />
    )
    return (
        <>
        <div className="blogs grid-flow-row md:flex md:flex-row md:flex-wrap md:justify-evenly"> 
        
        {/* <Card username={"hello"}  title={"title"} description={"Hello world"} image={"https://i0.wp.com/picjumbo.com/wp-content/uploads/fantasy-fall-nature-scenery-with-small-house-and-a-tree-free-photo.jpg?w=600&quality=80"} createdAt={"2005-19-02"} /> */}
            {cardBlog}
        </div>
        </>
    );
};

export default Blogs;