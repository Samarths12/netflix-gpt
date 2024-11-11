import { useState } from "react";
import Header from "./Header";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return(
        <div>
            <Header />
            <div className="absolute">
                <img src="https://cdn.neowin.com/news/images/uploaded/2023/05/1683747988_background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.jpg"
                alt="login" />
            </div>
            <form className="w-3/12 bg-black p-12 absolute my-36 mx-auto right-0 left-0 text-white bg-opacity-80">

            <h1 className="font-bold text-3xl py-4"> {isSignInForm ? "Sign In" : "Sign Up"}</h1>

                <input type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />

                {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />}

                <input type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />

                <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already a user? Sign In Now"}</p>

            </form>
        </div>
    )
}
export default Login