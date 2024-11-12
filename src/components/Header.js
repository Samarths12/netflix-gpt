import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
    
    const navigate = useNavigate();

    const user = useSelector((store) => store.user );

    const handleSignOut = () => {
        signOut(auth).then(() => {
            //Sign Out successful
            navigate("/")
        })
        .catch((error) => {
            //Error happened
            navigate("/error");
        })
    }
    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-40"
             src="https://cdn.prod.website-files.com/5ee732bebd9839b494ff27cd/5ee732bebd98393d75ff281d_580b57fcd9996e24bc43c529.png"
            alt="logo"/>

          {user && (  <div className="flex p-2">
                <img className="w-12 h-12 "
                 src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                alt="usericon" />

                <button onClick={handleSignOut} className="font-bold text-white ">(Sign Out)</button>
            </div> )}
        </div>
    )
};
export default Header;