import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const [errorMessage, seterrorMessage] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    const handleButtonClick = () => {
        //Validate the form data from validate.js

       const message = checkValidData(email.current.value, password.current.value);
       seterrorMessage(message);
       


       if(message) return;

        //else create a new user 
        //do signIn/signUp

        if(!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then((userCredential) => {
                //Signed In
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                }).then(() => {
                    //Profile updated

                    const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));


                    navigate("/browse");
                })
                .catch((error) => {
                    //error occurred
                    seterrorMessage(error.message);
                })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrorMessage(errorCode + "-" + errorMessage);
            });
        }  else {
            //Sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value).then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrorMessage(errorCode + "-" + errorMessage);
            });
        }

       


    }

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
            <form onSubmit={(e) => e.preventDefault()}  className="w-3/12 bg-black p-12 absolute my-36 mx-auto right-0 left-0 text-white bg-opacity-80">

            <h1 className="font-bold text-3xl py-4"> {isSignInForm ? "Sign In" : "Sign Up"}</h1>

                <input ref={email}
                type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />

                {!isSignInForm && <input 
                type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />}

                <input ref={password}
                 type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />


                 <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>

                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already a user? Sign In Now"}</p>

            </form>
        </div>
    )
}
export default Login