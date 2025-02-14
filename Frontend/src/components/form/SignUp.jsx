
const SignUp = ()=>{
    return(
        <div>
            <div>
                <h1>Create Account</h1>
            </div>
            <div>
                <label htmlFor="">FullName</label>
                <input type="text" />
                <label htmlFor="">Email</label>
                <input type="email" />
                <label htmlFor="">Password</label>
                <input type="password" />
            </div>
            <div>
                <button>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp