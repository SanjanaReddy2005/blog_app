import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const BlogPage = () => {
    const [blog,setBlog] = useState([])
    const id = useParams().id
    const getBlogDetails = async () =>{
        try{
            const {data} = await axios.get(`http://localhost:8000/api/v1/blog/singleBlog/${id}`)
            if(data?.success){
                setBlog(data?.blog);
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getBlogDetails()
    },[id])
    console.log(blog)
    return(
        <div className="flex flex-col">
            <div className="title text-center text-4xl italic text-gray-500 py-2">
                {blog.title}
            </div>
            <div className="my-5">
                {/* <div><img className="" src={blog.image} alt="image"/></div> */}
                <div className="h-[300px] overflow-hidden flex items-stretch"><img className="w-[75%] mx-auto" src={blog.image} alt="image" /></div>
            </div>
            <div className="mx-[12.5%] mt-4 flex flex-col">
                <div>{blog.description}</div>
            </div>
        </div>
    )
}