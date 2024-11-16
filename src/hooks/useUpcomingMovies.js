import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";


const useUpcomingMovies = () => {

    
    //Fetch data from tmdb api and update the stores
    const dispatch = useDispatch();

    const getUpcomingMovies = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/upcoming?page=1",
            API_OPTIONS 
        );

        const json = await data.json();
        

        dispatch(addUpcomingMovies(json.results));
    };


    useEffect(() => {
        getUpcomingMovies();
    }, [])
}

export default useUpcomingMovies;