import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'

const Register = () => {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    ) 
//   useEffect(()=>{
//       console.log("Here")
//   },[inputs])
   
        const handleChange = (e) => {
            // console.log("hi")
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
                [e.target.email]:e.target.value,
                [e.target.password]: e.target.value

            }))
            // console.log(inputs.name,inputs.email,inputs.password)
        }

        const handleSubmit = async(e) => {
             e.preventDefault()
             try{
              const {data} = await axios.post("http://localhost:8000/api/v1/user/register",{username:inputs.name,email:inputs.email,password:inputs.password});
              if(data.success){
                toast.success("User Registered successfully");
                navigate("/login")
              }
             }catch(error){
                console.log(error)
             }
        }
    console.log(inputs.name,inputs.email,inputs.password)
    return (
        <>
        <div className="register grid-flow-row h-full flex flex-col justify-center items-center my-24 p-3" >
            <div className="w-[80%] h-[300px] md:h-[400px] flex flex-col sm:w-[50%] p-5 rounded-lg justify-center items-center bg-gray-300 shadow-xl hover:shadow-2xl">
                <div className="flex flex-col">
                    <div className="text-center text-2xl italic font-bold">
                       Registeration
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="grid-flow-row h-full flex flex-col">
                            <div className="flex flex-col my-1">
                                <label className="my-1" for="name">Username</label>
                                <input type={"text"} id="name" name="name" value={inputs.name} onChange={handleChange} className="border p-1 mb-1 rounded-lg" placeholder="username" required={true}/>
                            </div>
                            <div className="flex flex-col my-1">
                                <label for="email">Email</label>
                                <input type={"email"} id="email" name="email" value={inputs.email} onChange={handleChange} className="border p-1 mb-1 rounded-lg" placeholder="email" required={true}/>
                            </div>
                            <div className="flex flex-col my-1">
                                <label for="password">Password</label>
                                <input type={"password"} id="password" name="password" value={inputs.password} onChange={handleChange} className="border p-1 mb-1 rounded-lg" placeholder="password" required={true}/>
                            </div>
                            <div className="flex rounded-md my-2 bg-black text-white hover:shadow-lg shadow-md">
                                <button className="w-[100%] text-center p-1" type="subimt">Submit</button>
                            </div>
                            <div className="flex">
                                <button className="text-center w-[100%] text-sm" onClick={()=> navigate("/login")}>already registered ? Please Login</button>
                            </div>
                        </form>
                    </div>
                </div> 
            </div>

           
        </div>
        </>
    );
};

export default Register;