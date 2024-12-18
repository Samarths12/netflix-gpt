import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const [errorMessage, seterrorMessage] = useState(null);

    

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
                    displayName: name.current.value, photoURL: {USER_AVATAR}
                }).then(() => {
                    //Profile updated

                    const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));


                   
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
                <img src={BG_URL}
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