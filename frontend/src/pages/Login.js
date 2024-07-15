import { useState } from "react";
import { useSignin } from "../hooks/useSignin";

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassowrd] =  useState('')

    const {signin,isLoading,error} = useSignin()
    const submit = async()=>{
        await signin(email,password)
    }
    return ( 
        <div className="w-screen h-screen flex justify-center items-center bg-img">
            <div className="flex flex-col w-4/12 h-3/5 bg-slate-800 rounded-lg justify-between p-6 mx-auto my-40">
        <h2 className=" text-2xl font-bold teko text-center">Welcome to <span className="bg-slate-200 p-1 text-black rounded">Project manager</span></h2>
        <div className="flex flex-col">
        <label htmlFor="" className="">Email</label>
        <input type="text" name="" placeholder="example@mail.com" id="email" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="">Password</label>
        <input type="password" placeholder="xxxxxxx" name="" id="pass" className="mb-2 rounded border-2 border-slate-800 text-slate-900 p-1" value={password} onChange={(e)=>setPassowrd(e.target.value)}/>
        <a href="/signup" className="text-sm underline">Dont have an account signup?</a>
        </div>
        <button className="bg-slate-600 w-full py-2 px-8 rounded mx-auto mt-4 text-white font-bold hover:bg-slate-200 hover:text-black transition-all" onClick={submit} disabled={isLoading}>Login</button>
        {error && <div className='mt-2 text-sm text-red-500 '>{error}</div>}
    </div>
        </div>
);
}
 
export default Login;