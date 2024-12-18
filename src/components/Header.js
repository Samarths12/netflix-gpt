import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser} from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USERICON } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import {changeLanguage } from "../utils/configSlice";

const Header = () => {

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const user = useSelector((store) => store.user );

    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            //Sign Out successful
          
        })
        .catch((error) => {
            //Error happened
            navigate("/error");
        })
    };


    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if(user) {
                //User is signed in
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));

                navigate("/browse");


            }

            else{
                //user is signed out
                dispatch(removeUser());

                navigate("/");
            }
        });


        //Unsubscribe will be called when component unsubscribe
        return () => unsubscribe();
    }, []);


    const handleGptSearch = () => {
        //Toggle GPT Search

        dispatch(toggleGptSearchView());

    }


    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }


    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-40"
             src={LOGO}
            alt="logo"/>

          {user && (  <div className="flex p-2">

            {showGptSearch && (

            <select className="p-2 my-4 mx-4 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>

            )}


            <button
             className="p-2 my-4 mx-4 bg-purple-800 text-white rounded-lg" onClick={handleGptSearch}>

                {showGptSearch ? "HomePage" : "GPT Search"}

                </button>
                <img className="w-12 h-12 "
                 src={USERICON}
                alt="usericon" />

                <button onClick={handleSignOut} className="font-bold text-white ">(Sign Out)</button>
            </div> )}
        </div>
    )
};
export default Header;