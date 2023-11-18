import React from "react";
import {FaUser,FaTrash,FaEdit} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector} from "react-redux/es/hooks/useSelector";

export const Card = ({title,username,description,createdAt,image,id,isUser}) => {
    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/blogDetails/${id}`)
    }
    let isLogin = useSelector(state => state.isLogin)
    isLogin = isLogin || localStorage.getItem("UserId")
    const handleDelete = async() => {
        try{
            const {data} = await axios.delete(`/api/v1/blog/deleteBlog/${id}`)
            console.log(data)
            if(data?.success){
                alert('Blog Deleted')
                // navigate('/createBlog')
                window.location.reload()
            }
        }catch(error){
            console.log(error)
        }
    }
    console.log("isLogin: ",isLogin)
    const handleDisplay = () => {
        navigate(`/blogPage/${id}`)
    }
    return (
        <div className=" flex justify-around items-center my-6 ">
        <div className="border w-[400px] rounded-xl h-[350px] shadow-lg  hover:shadow-2xl">
            <div className="flex flex-row  bg-black text-white rounded-t-xl">
               <div className="my-auto mx-3 border rounded-full p-2">
                <FaUser />
               </div>
               <div className="row flex w-full flex-row justify-between pr-4">
               <div className="col flex flex-col my-2">
               <div className="text-sm">{username}</div>
               <div className=" text-xs">{createdAt}</div>
               
               </div>
               {isUser && isLogin &&  (<div className="col flex flex-row my-auto"><div className="mr-1"><FaEdit onClick={handleEdit}/></div> <div className="ml-1"><FaTrash onClick={handleDelete}/></div> </div>)}
              

               </div>
               

               
            </div>
            <div onClick={handleDisplay} className=" cursor-pointer">
            <div className="h-[200px] overflow-hidden flex items-stretch"><img className="w-[100%]" src={image} alt="image" /></div>
          <div className=" mx-4 title italic my-2 text-bold">{title}</div>
          <div className=" pt-2 px-4 pb-4 text-xs truncate ">
             {description}
          </div>

            </div>
            
        </div>
        </div>
        
    )
}

