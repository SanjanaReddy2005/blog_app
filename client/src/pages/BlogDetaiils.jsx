import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const BlogDetails = () => {
    const [blog,setBlog] = useState([])
    const [inputs,setInputs] = useState({
        title: "",
        description: "",
        image:""
    })
    const id = useParams().id
    const navigate = useNavigate()
    const getBlogDetails = async () =>{
        try{
            const {data} = await axios.get(`http://localhost:8000/api/v1/blog/singleBlog/${id}`)
            if(data?.success){
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getBlogDetails();
    },[id])
    console.log("Hi")
    console.log(blog)
    const handleChange = (e) => {
        setInputs(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value,
          
        }))
      }
      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(inputs)
        try{
          const {data} = await axios.put(`/api/v1/blog/updateBlog/${id}`,{
            title:inputs.title,
            description: inputs.description,
            image:inputs.image,
            user:id
          })
          if(data?.success){
            toast.success('Blog Updated');
            navigate('/myBlogs');
            
          }
        }catch(error){
          console.log(error);
        }
      }
    return (
        <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
            <div className="text-center my-3 font-bold text-4xl italic text-gray-400">
              <h1>Update your Blog</h1>
            </div>
            <div className="p-1 w-[80%] flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit} className="w-[80%] border rounded-lg bg-gray-300 shadow-lg hover:shadow-2xl">
                
                <div className="row flex flex-col">
                  <div className="my-2 col font-bold text-2xl italic text-center"> Title</div>
                  <div className="mx-auto col w-[80%]"><input type="text" className="border rounded-md p-2 w-[100%]" placeholder="title" name="title" value={inputs.title} onChange={handleChange} /></div>
                </div>
                <div className="row flex flex-col">
                  <div className="my-2 col font-bold text-2xl italic text-center">Description</div>
                  <div className="col mx-auto w-[80%]"><textarea type="text" className="border h-[300px] rounded-md w-[100%] p-2"  name="description" value={inputs.description} onChange={handleChange} /></div>
                </div>
                <div className="row">
                  <div className="my-2 col font-bold text-2xl italic text-center">Image</div>
                  <div className="col mx-auto w-[80%]"><input type="text" className="border p-2 rounded-md w-[100%]" placeholder="image" name="image" value={inputs.image} onChange={handleChange} /></div>
                </div>
                <div className="border rounded-lg text-white bg-black my-5 w-[80%] mx-auto flex flex-col justify-center items-center hover:shadow-2xl shadow-xl">
                  <button className="text-center p-1 w-[100%] text-white rounded-lg">Submit</button>
                </div>
                
                
              </form>
            </div>

        </div>
        

      </div>
      
    )
}