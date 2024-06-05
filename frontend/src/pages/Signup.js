
import {useState} from 'react'

export default function Signup() {
    const [email,setEmai] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()



    const submit = async()=>{
        const response = await fetch('api/user/signup',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        
        const json = await response.json()
        // console.log(json)    

        if(response.ok){
            console.log(json)
        }else{
            setError(json.error)
        }
    }

    return ( <div className="flex flex-col w-2/6 bg-slate-600 rounded justify-around p-6 mx-auto my-40">
    <h2 className=" text-2xl font-bold teko">Welcome to Project manager</h2>
    <div className="flex flex-col my-4">
    <label htmlFor="" className="">Email</label>
    <input type="text"  className="rounded border-2 border-slate-800 text-slate-900 p-1" onChange={(e)=>setEmai(e.target.value)}/>
    </div>
    <div className="flex flex-col my-4">
    <label htmlFor="">Password</label>
    <input type="password" className="rounded border-2 border-slate-800 text-slate-900 p-1" onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <a href="/login" className="text-sm underline">Already have an account signup?</a>
    <button className="bg-slate-800 w-fit py-2 px-8 rounded mx-auto mt-4" onClick={submit}>Login</button>
    {error && <div className='mt-2 text-sm text-red-500 '>{error}</div>}
</div> );
}