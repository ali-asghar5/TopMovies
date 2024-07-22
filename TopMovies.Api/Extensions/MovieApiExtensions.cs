using Microsoft.AspNetCore.Mvc;
using MiniValidation;
using TopMovies.Common.Dtos;
using TopMovies.Data.Models;
using TopMovies.Data.Repositories.Interfaces;

namespace TopMovies.Api.Extensions
{
    public static class MovieApiExtensions
    {
        private const string baseRoute = "/api/v1/movies";
        public static void MapMovieEndpoints(this WebApplication app)
        {
            app.MapGet(baseRoute, async ([AsParameters] QueryParameters queryParameters, IMovieRepository repo) =>
            {
                return await repo.GetAllAsync(queryParameters);
            }).Produces<PagedResult<Movie>>(StatusCodes.Status200OK);

            app.MapGet($"{baseRoute}/topten", async (IMovieRepository repo) =>
            {
                return await repo.GetTopTenAsync();
            }).Produces<List<Movie>>(StatusCodes.Status200OK);

            app.MapGet("/api/v1/movie/{movieId:int}", async (int movieId, IMovieRepository repo) =>
            {
                var movie = await repo.GetAsync(movieId);
                if (movie == null)
                    return Results.Problem($"Movie with ID {movieId} not found.", statusCode: 404);
                return Results.Ok(movie);
            }).ProducesProblem(404).Produces<Movie>(StatusCodes.Status200OK);

            app.MapPut(baseRoute, async ([FromBody] MovieDto dto, IMovieRepository repo) =>
            {
                if (!MiniValidator.TryValidate(dto, out var errors))
                    return Results.ValidationProblem(errors);
                var newMovie = await repo.AddAsync(dto);
                return Results.Created($"/movie/{newMovie.Id}", newMovie);
            }).ProducesValidationProblem().Produces<MovieDto>(StatusCodes.Status201Created);

            app.MapPost(baseRoute, async ([FromBody] MovieDto dto, IMovieRepository repo) =>
            {
                if (!MiniValidator.TryValidate(dto, out var errors))
                    return Results.ValidationProblem(errors);
                if (await repo.GetAsync(dto.Id) == null)
                    return Results.Problem($"Movie with Id {dto.Id} not found", statusCode: 404);
                var updatedMovie = await repo.UpdateAsync(dto);
                return Results.Ok(updatedMovie);
            }).ProducesValidationProblem().ProducesProblem(404).Produces<MovieDto>(StatusCodes.Status200OK);

            app.MapDelete("/api/v1/movie/{movieId:int}", async (int movieId, IMovieRepository repo) =>
            {
                if (await repo.GetAsync(movieId) == null)
                    return Results.Problem($"Movie with Id {movieId} not found", statusCode: 404);
                await repo.DeleteAsync(movieId);
                return Results.Ok();
            }).ProducesProblem(404).Produces(StatusCodes.Status200OK);
        }
    }
}
