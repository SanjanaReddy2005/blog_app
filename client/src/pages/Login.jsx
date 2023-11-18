import React from "react";
// import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import {useDispatch} from 'react-redux';
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
              const {data} = await axios.post("http://localhost:8000/api/v1/user/login",{email:inputs.email,password:inputs.password});
              if(data.success){
                localStorage.setItem("UserId",data?.user._id);
                dispatch(authActions.login())
                toast.success("User Login successfully");
                navigate("/")
              }
             }catch(error){
                console.log(error)
             }
        }
    console.log(inputs.name,inputs.email,inputs.password)
    return (
        <div className="flex justify-center m-20 align-middle items-center mx-1 ">
            <div className="register h-[300px] md:h-[400px] flex flex-col justify-center items-center w-[80%] sm:w-[50%] border p-3 rounded-lg shadow-xl hover:shadow-2xl  bg-gray-300" >
                <div className="flex flex-col">
                <div className="text-center font-bold text-3xl ">
                    Login
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex flex-col">
                        <label for="email" className="my-1" >Email</label>
                        <input className=" border rounded-md p-1 my-1" type={"email"} id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Email" required={true}/>
                    </div>
                    <div className="flex flex-col">
                        <label for="email" className="my-1" >Password</label>
                        <input className="border rounded-md p-1 my-1" type={"password"} id="password" name="password" value={inputs.password} onChange={handleChange} placeholder="password" required={true}/>
                    </div>
                    <div className="flex border rounded-md my-2 bg-black text-white hover:shadow-lg shadow-md">
                     <button className="w-[100%] text-center p-1" type="subimt">Submit</button>
                    </div>
                    <div className="flex">
                        <button className="text-center w-[100%] text-sm" onClick={()=> navigate("/register")}>Not Registerd ? Please register</button>
                    </div>
                </form>
                </div>
                
            </div>
        </div>

        
    );
};

export default Login;