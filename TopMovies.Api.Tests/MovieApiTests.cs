using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System.Net;
using System.Net.Http.Json;
using TopMovies.Common.Dtos;
using TopMovies.Data.Models;

namespace TopMovies.Api.Tests
{
    public class MovieApiTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public MovieApiTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAllMovies_ReturnsPagedResult()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("/api/v1/movies");

            response.EnsureSuccessStatusCode();
            var movies = await response.Content.ReadFromJsonAsync<PagedResult<Movie>>();
            Assert.NotNull(movies);
        }

        [Fact]
        public async Task GetTopTenMovies_ReturnsListOfMovies()
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync("/api/v1/movies/topten");

            response.EnsureSuccessStatusCode();
            var movies = await response.Content.ReadFromJsonAsync<List<Movie>>();
            Assert.NotNull(movies);
        }

        [Fact]
        public async Task GetMovieById_ReturnsMovie()
        {
            var client = _factory.CreateClient();
            int movieId = 1;

            var response = await client.GetAsync($"/api/v1/movie/{movieId}");

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                var problemDetails = await response.Content.ReadFromJsonAsync<ProblemDetails>();
                Assert.Equal("Movie with ID 1 not found.", problemDetails.Detail);
            }
            else
            {
                response.EnsureSuccessStatusCode();
                var movie = await response.Content.ReadFromJsonAsync<Movie>();
                Assert.NotNull(movie);
            }
        }

        [Fact]
        public async Task AddMovie_ReturnsCreatedMovie()
        {
            var client = _factory.CreateClient();
            var newMovie = new MovieDto(0, "Oceans 11", 7000000, "01:20", 7000000, string.Empty);

            var response = await client.PutAsJsonAsync("/api/v1/movies", newMovie);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var movie = await response.Content.ReadFromJsonAsync<Movie>();
            Assert.NotNull(movie);
        }

        [Fact]
        public async Task UpdateMovie_ReturnsUpdatedMovie()
        {
            var client = _factory.CreateClient();
            var updateMovie = new MovieDto(11, "Oceans 11", 7000000, "01:20", 7000000, string.Empty);

            var response = await client.PostAsJsonAsync("/api/v1/movies", updateMovie);

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                var problemDetails = await response.Content.ReadFromJsonAsync<ProblemDetails>();
                Assert.Equal($"Movie with Id {updateMovie.Id} not found", problemDetails.Detail);
            }
            else
            {
                response.EnsureSuccessStatusCode();
                var movie = await response.Content.ReadFromJsonAsync<Movie>();
                Assert.NotNull(movie);
            }
        }

        [Fact]
        public async Task DeleteMovie_ReturnsOk()
        {
            var client = _factory.CreateClient();
            int movieId = 11;

            var response = await client.DeleteAsync($"/api/v1/movie/{movieId}");

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                var problemDetails = await response.Content.ReadFromJsonAsync<ProblemDetails>();
                Assert.Equal($"Movie with Id {movieId} not found", problemDetails.Detail);
            }
            else
            {
                response.EnsureSuccessStatusCode();
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }
        }
    }
}