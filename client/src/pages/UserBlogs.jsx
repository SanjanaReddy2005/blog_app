import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "../components/Cards";


export const UserBlogs = () => {
    const [blogs,setBlogs] = useState([]);

    const getUserBlogs = async() => {
        try{
            const id = localStorage.getItem("UserId")
            const {data} = await axios.get(`http://localhost:8000/api/v1/blog/userBlogs/${id}`)

       if(data?.success){
          setBlogs(data?.userBlogs.blogs);
          
       }

        }catch(error){
            console.log(error)
        }
        
       
    }

    useEffect(()=>{
        getUserBlogs();
    },[])
    console.log(blogs)
    const cardBlogs = blogs.map((item)=> 
         <Card title={item.title} id={item._id} isUser={true} description={item.description} image={item.image} createdAt={item.createdAt} />
    )

    console.log(cardBlogs)

    return(
        <>
        <div className="blogs grid-flow-row md:flex md:flex-row md:flex-wrap md:justify-evenly"> 
        {cardBlogs.length? cardBlogs : (<div className=" text-4xl italic text-gray-500 my-14">Sorry you haven't posted any Blogs </div>)}
            
        </div>
        </>
    )
}