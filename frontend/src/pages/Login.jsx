import React, { useState, useContext } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { serverUrl } = useContext(authDataContext);
    const { getCurrentUser } = useContext(userDataContext);
    const navigate = useNavigate();

    // 1. Email and Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.post(
                serverUrl + '/api/auth/login',
                { email, password },
                { withCredentials: true }
            );

            console.log("Login Result:", result.data);

            // ⭐ Token ko LocalStorage mein save karna sabse zaroori hai
            if (result.data.token) {
                localStorage.setItem('token', result.data.token);
                toast.success("User Login Successful");
                
                // User data fetch karne ke baad hi navigate karein
                await getCurrentUser();
                navigate("/");
            } else {
                toast.error("Token not received from server");
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "User Login Failed");
        } finally {
            setLoading(false);
        }
    };

    // 2. Google Login
    const googlelogin = async () => {
        setLoading(true);
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const userEmail = user.email;

            const result = await axios.post(
                serverUrl + "/api/auth/googlelogin",
                { name, email: userEmail },
                { withCredentials: true }
            );

            console.log("Google Login Result:", result.data);

            // ⭐ Google login ke waqt bhi token save karein
            if (result.data.token) {
                localStorage.setItem('token', result.data.token);
                toast.success("Google Login Successful");
                
                await getCurrentUser();
                navigate("/");
            }

        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            {/* Logo Section */}
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="Logo" />
                <h1 className='text-[22px] font-sans '>OneCart</h1>
            </div>

            {/* Header Text */}
            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Login Page</span>
                <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
            </div>

            {/* Login Card */}
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>
                <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                    
                    {/* Google Login Button */}
                    <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googlelogin}>
                        <img src={google} alt="google" className='w-[20px]' /> Login account with Google
                    </div>

                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>

                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                        <input 
                            type="email" 
                            className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                            placeholder='Email' 
                            required 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                        />
                        
                        <div className='w-[100%] relative'>
                            <input 
                                type={show ? "text" : "password"} 
                                className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
                                placeholder='Password' 
                                required 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                            />
                            <div className='absolute right-[5%] top-[30%] cursor-pointer'>
                                {show ? <IoEye onClick={() => setShow(!show)} size={20} /> : <IoEyeOutline onClick={() => setShow(!show)} size={20} />}
                            </div>
                        </div>

                        <button type="submit" className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
                            {loading ? <Loading /> : "Login"}
                        </button>

                        <p className='flex gap-[10px]'>You haven't any account? 
                            <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/signup")}>Create New Account</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;