import { useState } from "react";
import {FaBars} from 'react-icons/fa';
import {MdClose} from 'react-icons/md';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


export const Navbar = () => {
    let isLogin = useSelector(state => state.isLogin);
    isLogin = isLogin || localStorage.getItem("UserId");
    const navigate = useNavigate()
    console.log(isLogin)
    const [menu,setMenu] = useState(true);
    const dispatch = useDispatch()

    const handleLogout = () => {
        try{
          dispatch(authActions.logout());
          localStorage.clear();
          toast.success('Logout Succesfully')
           navigate('/login')
        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
        <div className="Navbar shadow-2xl sticky mt-0 w-[100%]">
            <div className=" bg-black text-white flex flex-col sm:flex-row sm:justify-between py-auto">
                <div className="flex flex-row justify-between z-50">
                <div className="logo my-3 ml-4 font-bold text-2xl italic">My Blog App</div>
                {/* {menu ? (<div onClick={handelMenu()} className=" sm:hidden my-auto mr-3"><FaBars/></div>) : (<div onClick={handelMenu()} className=" sm:hidden my-auto mr-3"><FaCross/></div>)} */}
                {menu && (<div onClick={()=>{
                    setMenu(!menu)
                }} className=" sm:hidden my-auto mr-3"><FaBars/></div>)}
                {!menu && (<div onClick={()=>{
                    setMenu(!menu)
                }} className=" sm:hidden my-auto mr-3"><MdClose/></div>)}
                </div>
                 {!menu && (<div className="sm:hidden links my-auto z-0">
                    <ul className=" list-none  flex-col sm:flex sm:mx-4 sm:space-x-3 sm:flex-row font-sans">
                        {isLogin && (<>
                            <Link to="/blogs"><li className=" flex justify-center items-center my-auto text-slate-200 hover:text-white"><button>BLOGS</button></li></Link>
                            <Link to="/myBlogs"><li className=" flex justify-center items-center my-auto text-slate-200 hover:text-white"><button>MY BLOGS</button></li></Link>
                            <Link to="/createBlog"><li className=" flex justify-center items-center my-auto text-slate-200 hover:text-white"><button>CREATE BLOG</button></li></Link>
                        </>)}
                        {
                            !isLogin && (<>
                              <Link to="/login"><li className=" flex justify-center items-center text-slate-200 hover:text-white " ><button>LOGIN</button></li></Link>
                              <Link to="/register"><li className=" flex justify-center items-center text-slate-200 hover:text-white"><button>REGISTER</button></li></Link>
                            </>)
                        }
                        
                        {isLogin && (<>
                            <li className=" flex justify-center items-center text-slate-200 hover:text-white"><button>LOGOUT</button></li>
                        </>)}
                    </ul>
                 </div>)}
                 {isLogin && (<>
                    <div className="hidden sm:flex my-auto space-x-3 flex-row">
                     <ul className=" list-none flex-col sm:flex sm:mx-4 sm:space-x-3 sm:flex-row font-sans">
                        <Link to="/blogs"><li className=" flex justify-center items-center my-auto text-slate-200 hover:text-white text-sm"><button>BLOGS</button></li></Link>
                        <Link to="/myBlogs"><li className=" flex justify-center items-center my-auto text-slate-200 hover:text-white text-sm"><button>MY BLOGS</button></li></Link>
                        <Link to="/createBlog"><li className=" flex justify-center items-center my-auto text-slate-200 hover:text-white text-sm"><button>CREATE BLOG</button></li></Link>
                     </ul>
                 </div>
                 </>)}
                
                 <div className="hidden sm:flex links my-auto z-0">
                    <ul className=" list-none  flex-col sm:flex sm:mx-4 sm:space-x-3 sm:flex-row font-sans">
                        {!isLogin && (<>
                        <Link to="/login" exact activeClassName="active" ><li className=" flex justify-center items-center active:text-sky-500 active:border-sky-500 active:bg-white hover:border-sky-500 hover:text-sky-500 hover:bg-white hover:rounded-full px-4 py-[0.1rem]" ><button>LOGIN</button></li></Link>
                        <Link to="/register" activeClassName="active"><li className=" flex justify-center items-center active:text-sky-500 active:border-sky-500 active:bg-white hover:border-sky-500 hover:text-sky-500 hover:bg-white hover:rounded-full px-4 py-[0.1rem]" ><button>REGISTER</button></li></Link>
                        
                        </>)}
                       
                        {isLogin && (
                            <>
                               <li className=" flex justify-center items-center"><button onClick={handleLogout}>LOGOUT</button></li>
                            </>
                        )}
                        
                    </ul>
                 </div>
            </div>

        </div>
        </>
    )
}