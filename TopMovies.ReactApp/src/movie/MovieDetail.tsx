import { Link, useParams } from "react-router-dom";
import ApiStatus from "../ApiStatus";
import { numberFormatter } from "../config";
import { useDeleteMovie, useFetchMovie } from "../hooks/MovieHooks";
import defaultPhoto from "./defaultPhoto";

const MovieDetail = () => {
    const { id } = useParams();
    if (!id) throw Error("Movie id not found");
    const movieId = parseInt(id);

    const { data, status, isSuccess } = useFetchMovie(movieId);
    const deleteMovieMutation = useDeleteMovie();

    if (!isSuccess) return <ApiStatus status={status} />
    if (!data) return <div>Movie not found</div>

    return (
        <div className="row">
            <div className="col-6">
                <div className="row">
                    <img className="img-fluid" src={data.poster ? data.poster : defaultPhoto} alt="Movie poster" />
                </div>
                <div className="row mt-3">
                    <div className="col-2">
                        <Link
                            className="btn btn-primary w-100"
                            to={`/movie/edit/${data.id}`}
                        >
                            Edit
                        </Link>
                    </div>
                    <div className="col-2">
                        <button
                            className="btn btn-danger w-100"
                            onClick={() => {
                                if (window.confirm("Are you sure?"))
                                    deleteMovieMutation.mutate(data);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="row mt-2">
                    <h3 className="col-12">{data.title}</h3>
                </div>
                <div className="row">
                    <h5 className="col-12">{data.hoursViewed.toLocaleString()} hours viewed.</h5>
                </div>
                <div className="row">
                    <h5 className="themeFontColor col-12">
                        {numberFormatter.format(data.views)} views.
                    </h5>
                </div>
                <div className="row">
                <h5 className="col-12">{data.runtime} runtime.</h5>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;