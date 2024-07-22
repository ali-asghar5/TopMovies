import ValidationSummary from "../ValidationSummary";
import { useAddMovie } from "../hooks/MovieHooks"
import { Movie } from "../types/movie";
import MovieForm from "./MovieForm";

const MovieAdd = () => {
    const addMovieMutation = useAddMovie();

    const movie: Movie = {
        id: 0,
        title: "",
        hoursViewed: 0,
        runtime: "",
        views: 0,
        poster: null
    };
    return (
        <>
        {
            addMovieMutation.isError && (
                <ValidationSummary error={addMovieMutation.error}></ValidationSummary>
        )}
            <MovieForm
                movie={movie}
                submitted={(m) => addMovieMutation.mutate(m)}
            />
        </>
    );
}

export default MovieAdd;