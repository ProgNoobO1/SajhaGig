export default function Login() {
    return (
        <div className="login-container w-full h-full flex fixed top-0 bottom-0 ">
            <div className="image-container max-w-screen-sm h-screen bg-blue-800 flex items-center pt-16 pb-16 pr-8 pl-8 ">
                {/* <div className=" w-[500px] h-[500px]rounded-full overflow-hidden  "> */}
                    <div className="circle-image w-[500px] h-[500px] rounded-full overflow-hidden  ">
                <img
                    src="images/login.png"
                    alt="Login Image"
                    className="w-full h-full object-cover bg-gray-300 "
                />
                </div>
                {/* </div> */}
             
                </div>  
                <div className="login-content flex flex-col justify-center items-center w-full h-screen p-8 bg-white">
                    <h1 className ="font-pecita">SajhaGig</h1>
                    <div>
                        <div className ="Text flex flex-col justify-center items-center mb-8"> 
                    <h2 className="text-[40px] font-bold mb-4">Welcome Back!</h2>
                    <h1 className="text-gray-400 text-[16px]">Log In Back To Your Account</h1>
                    <div className="email-password-container mt-6">
                        <div className="email-container flex flex-col mt-8 mb-4">
                            <label className ="text-[14px]">Email</label>
                            <input className="border w-[502px] h-[44px] rounded-md" placeholder="name@gmail.com ">
                            </input>
                        </div>
                        <div className="password-container flex flex-col mb-4">
                            <label className= "text-[14px]">Password</label>
                            <input className="border w-[502px] h-[44px] rounded-md" placeholder="Password🔐">
                            </input>
                        </div>
                        <div className="Fogetpassword flex justify-end">
                            <a href="#" className=" text-[14px] hover:underline hover:text-blue-800 ">Forget Password?</a>
                        </div>
                        <div className="login-button-container flex justify-center mt-8 ">
                            <button className ="LoginButton bg-blue-800 text-white w-[502px] h-[44px]
                            rounded-md hover:bg-blue-900 active:bg-blue-700 active:text-gray-200"> Log In</button>
                        </div>
                        <div className="register-link flex justify-center mt-4 ">
                            <p className="text-[12px]">Don't Have An Account?</p>
                            <a href="#" className="font-bold text-[12px] hover:underline hover:text-blue-800 ml-1 "> Register</a>

                        </div>

                    </div>
                    </div>
                    </div>
                   

                </div>
        
            
        </div>
    );
}
