import { Movie } from "../types/movie";
import config from "../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Problem from "../types/problem";
import { PagedResult } from "../types/pagedResult";
import { QueryParameters } from "../types/queryParameters";

const useFetchAllMovies = (queryParameters: QueryParameters) => {
    return useQuery<PagedResult<Movie>, AxiosError>({
        queryKey: ["movies"],
        queryFn: () =>
            axios.get(`${config.baseApiUrl}/movies`, {params: { ...queryParameters }}).then((resp) => resp.data),
    });
}

const useFetchTop10Movies = () => {
    return useQuery<Movie[], AxiosError>({
        queryKey: ["topten"],
        queryFn: () =>
            axios.get(`${config.baseApiUrl}/movies/topten`).then((resp) => resp.data),
    });
}

const useAddMovie = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError<Problem>, Movie>({
        mutationFn: (m) => axios.put(`${config.baseApiUrl}/movies`, m),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["movies"]
            });
            nav("/");
        }
    });
}

const useFetchMovie = (id: number) => {
    return useQuery<Movie, AxiosError>({
        queryKey: ["movies", id],
        queryFn: () =>
            axios.get(`${config.baseApiUrl}/movie/${id}`).then((resp) => resp.data),
    });
}

const useUpdateMovie = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError<Problem>, Movie>({
        mutationFn: (m) => axios.post(`${config.baseApiUrl}/movies`, m),
        onSuccess: (_, movie) => {
            queryClient.invalidateQueries({
                queryKey: ["movies"]
            });
            nav(`/movie/${movie.id}`);
        }
    });
}

const useDeleteMovie = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError, Movie>({
        mutationFn: (h) => axios.delete(`${config.baseApiUrl}/movie/${h.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["movies"]
            });
            nav("/");
        }
    });
}

export default useFetchAllMovies;
export { useFetchTop10Movies, useAddMovie, useFetchMovie, useUpdateMovie, useDeleteMovie };