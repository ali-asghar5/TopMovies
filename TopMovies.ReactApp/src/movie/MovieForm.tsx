import { useState } from "react";
import { Movie } from "../types/movie";
import toBase64 from "../toBase64";
import defaultImage from "./defaultPhoto";

type Args = {
    movie: Movie;
    submitted: (movie: Movie) => void;
}

const MovieForm = ({ movie, submitted }: Args) => {
    const [movieState, setMovieState] = useState({ ...movie });

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        submitted(movieState);
      };
    
      const onFileSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
      ): Promise<void> => {
        e.preventDefault();
        e.target.files &&
          e.target.files[0] &&
          setMovieState({
            ...movieState,
            poster: await toBase64(e.target.files[0]),
          });
      };

    return (
        <form className="mt-2">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={movieState.title}
                    onChange={(e) =>
                        setMovieState({ ...movieState, title: e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="hoursViewed">Hours Viewed</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Hours Viewed"
                    value={movieState.hoursViewed}
                    onChange={(e) =>
                        setMovieState({ ...movieState, hoursViewed: +e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="views">Views</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Views"
                    value={movieState.views}
                    onChange={(e) =>
                        setMovieState({ ...movieState, views: +e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="runtime">Runtime</label>
                <input
                    type="time"
                    className="form-control"
                    placeholder="Runtime"
                    value={movieState.runtime}
                    onChange={(e) =>
                        setMovieState({ ...movieState, runtime: e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="image">Poster</label>
                <input
                    id="image"
                    type="file"
                    className="form-control"
                    onChange={onFileSelected}
                />
            </div>
            <div className="mt-2">
                <img src={movieState.poster ?? defaultImage}></img>
            </div>
            <button
                className="btn btn-primary mt-2"
                
                onClick={onSubmit}
            >
                Submit
            </button>
        </form>
    );
}

export default MovieForm;