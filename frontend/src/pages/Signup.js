const Signup = () => {
    return ( <div className="flex flex-col w-2/6 bg-slate-600 rounded justify-around p-6 mx-auto my-40">
    <h2 className=" text-2xl font-bold teko">Welcome to Project manager</h2>
    <div className="flex flex-col my-4">
    <label htmlFor="" className="">Email</label>
    <input type="text" name="" id="" className="rounded border-2 border-slate-800 text-slate-900 p-1"/>
    </div>
    <div className="flex flex-col my-4">
    <label htmlFor="">Password</label>
    <input type="password" name="" id="" className="rounded border-2 border-slate-800 text-slate-900 p-1"/>
    </div>
    <a href="/login" className="text-sm underline">Already have an account signup?</a>
    <button className="bg-slate-800 w-fit py-2 px-8 rounded mx-auto mt-4">Login</button>
</div> );
}
 
export default Signup;