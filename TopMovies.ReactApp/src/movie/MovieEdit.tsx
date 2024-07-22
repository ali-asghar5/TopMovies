import { useParams } from "react-router-dom";
import { useFetchMovie, useUpdateMovie } from "../hooks/MovieHooks";
import ApiStatus from "../ApiStatus";
import MovieForm from "./MovieForm";
import ValidationSummary from "../ValidationSummary";

const MovieEdit = () => {
    const { id } = useParams();
    if (!id) throw Error("Need a movie id");
    const movieId = parseInt(id);

    const { data, status, isSuccess } = useFetchMovie(movieId);
    const updateMovieMutation = useUpdateMovie();

    if(!isSuccess) return <ApiStatus status={status} />

    return (
        <>
            {
                updateMovieMutation.isError && (
                    <ValidationSummary error={updateMovieMutation.error}></ValidationSummary>
                )}
            <MovieForm
                movie={data}
                submitted={h => updateMovieMutation.mutate(h)}
            />
        </>
    );
    
};

export default MovieEdit;