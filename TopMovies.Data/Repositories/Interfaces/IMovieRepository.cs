using TopMovies.Common.Dtos;
using TopMovies.Data.Models;

namespace TopMovies.Data.Repositories.Interfaces
{
    public interface IMovieRepository
    {
        Task<PagedResult<Movie>> GetAllAsync(QueryParameters queryParameters);
        Task<List<Movie>> GetTopTenAsync();
        Task<MovieDto> AddAsync(MovieDto newMovie);
        Task<Movie?> GetAsync(int id);
        Task<MovieDto?> UpdateAsync(MovieDto dto);
        Task DeleteAsync(int id);
    }
}
