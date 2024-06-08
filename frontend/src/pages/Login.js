import { useState } from "react";
import { useSignin } from "../hooks/useSignin";

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassowrd] =  useState('')

    const {signin,isLoading,error} = useSignin()
    const submit = async()=>{
        await signin(email,password)
    }
    return ( <div className="flex flex-col w-2/6 bg-slate-600 rounded justify-around p-6 mx-auto my-40">
        <h2 className=" text-2xl font-bold teko">Welcome to Project manager</h2>
        <div className="flex flex-col my-4">
        <label htmlFor="" className="">Email</label>
        <input type="text" name="" id="email" className="rounded border-2 border-slate-800 text-slate-900 p-1" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col my-4">
        <label htmlFor="">Password</label>
        <input type="password" name="" id="pass" className="rounded border-2 border-slate-800 text-slate-900 p-1" value={password} onChange={(e)=>setPassowrd(e.target.value)}/>
        </div>
        <a href="/signup" className="text-sm underline">Dont have an account signup?</a>
        <button className="bg-slate-800 w-fit py-2 px-8 rounded mx-auto mt-4" onClick={submit} disabled={isLoading}>Login</button>
        {error && <div className='mt-2 text-sm text-red-500 '>{error}</div>}
    </div> );
}
 
export default Login;