import { Link, useNavigate } from "react-router-dom";
import config, { numberFormatter } from "../config";
import { Movie } from "../types/movie";
import { QueryParameters } from "../types/queryParameters";
import { Table, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import TopTenMovies from "./TopTenMovies";
import axios from "axios";

const MovieList = () => {
  const nav = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParameters, setQueryParameters] = useState<QueryParameters>({
    page: 1,
    pageSize: 5,
    descending: true,
    sortBy: "Views",
  });

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${config.baseApiUrl}/movies`, {
        params: { ...queryParameters },
      });
      setMovies(response.data.items);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setQueryParameters({ ...queryParameters, page: pageNumber });
  };

  const handleSortChange = (sortBy: string) => {
    const isDscending = queryParameters.sortBy === sortBy ? !queryParameters.descending : false;
    setQueryParameters({ ...queryParameters, sortBy: sortBy, descending: isDscending });
  };

  const totalPages = Math.ceil(totalRecords / queryParameters.pageSize);

  useEffect(() => {
    fetchMovies();
  }, [queryParameters]);

  return (
    <div>
      <TopTenMovies />
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">Top Movies</h5>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('Title')}>Title</th>
            <th onClick={() => handleSortChange('HoursViewed')}>Hours Viewed</th>
            <th onClick={() => handleSortChange('Views')}>Views</th>
            <th>Runtime</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id} onClick={() => nav(`/movie/${m.id}`)}>
              <td>{m.title}</td>
              <td>{m.hoursViewed.toLocaleString()}</td>
              <td>{numberFormatter.format(m.views)}</td>
              <td>{m.runtime}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link className="btn btn-primary float-start" to="/movie/add">
        Add
      </Link>
      <Pagination className="float-end" >
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={queryParameters.page === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(queryParameters.page - 1)}
          disabled={queryParameters.page === 1}
        />
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === queryParameters.page}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(queryParameters.page + 1)}
          disabled={queryParameters.page === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={queryParameters.page === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default MovieList;
