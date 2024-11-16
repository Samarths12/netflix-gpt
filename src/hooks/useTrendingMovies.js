import { useEffect } from "react";
import { addTrendingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";


const useTrendingMovies = () => {

    
    //Fetch data from tmdb api and update the stores
    const dispatch = useDispatch();

    const getTrendingMovies = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/trending/movie?page=1",
            API_OPTIONS 
        );

        const json = await data.json();
        

        dispatch(addTrendingMovies(json.results));
    };


    useEffect(() => {
        getTrendingMovies();
    }, [])
}

export default useTrendingMovies;