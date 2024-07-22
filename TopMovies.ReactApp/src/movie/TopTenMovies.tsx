import ApiStatus from "../ApiStatus";
import { numberFormatter } from "../config";
import { useFetchTop10Movies } from "../hooks/MovieHooks";
import { Movie } from "../types/movie";
import { Carousel } from "react-bootstrap";
import './index.css'
import defaultPhoto from "./defaultPhoto";

const TopTenMovies = () => {
    const { data, status, isSuccess } = useFetchTop10Movies();

    if (!isSuccess)
        return <ApiStatus status={status} />
    
    return (
    <div className="row mb-4 justify-content-center">
          <Carousel>
            {data &&
              data.map((h: Movie, index: number) => (
                <Carousel.Item key={h.id} className="bg-dark bg-gradient">
                  <div className="flex justify-content-center">
                    <img
                        src={`/images/${++index}.png`}
                        alt="Film Rating" className="w-25"
                      />
                    <img src={h.poster ?? defaultPhoto} alt={h.title} className="w-75" />
                  </div>
                  <Carousel.Caption className="custom-caption">
                    <h4>{h.title}</h4>
                    <p>{numberFormatter.format(h.views)} views this week.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
    );
};

export default TopTenMovies;