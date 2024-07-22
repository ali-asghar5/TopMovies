using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using TopMovies.Common.Dtos;
using TopMovies.Data.Models;
using TopMovies.Data.Repositories.Interfaces;

namespace TopMovies.Data.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly TopMoviesDbContext _context;

        public MovieRepository(TopMoviesDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<Movie>> GetAllAsync(QueryParameters queryParameters)
        {
            var totalRecords = _context.Movies.Count();

            var moviesQuery = _context.Movies.AsQueryable();
            moviesQuery = queryParameters.SortBy switch
            {
                "Title" => queryParameters.Descending ? moviesQuery.OrderByDescending(i => i.Title) : moviesQuery.OrderBy(i => i.Title),
                "HoursViewed" => queryParameters.Descending ? moviesQuery.OrderByDescending(i => i.HoursViewed) : moviesQuery.OrderBy(i => i.HoursViewed),
                "Views" => queryParameters.Descending ? moviesQuery.OrderByDescending(i => i.Views) : moviesQuery.OrderBy(i => i.Views)
            };

            var movies = await moviesQuery.Skip(queryParameters.Page - 1).Take(queryParameters.PageSize).ToListAsync();

            return new PagedResult<Movie>
            {
                Items = movies,
                TotalRecords = totalRecords
            };
        }

        public async Task<List<Movie>> GetTopTenAsync()
        {
            return await _context.Movies
                .OrderByDescending(x => x.Views)
                .Take(10)
                .ToListAsync();
        }

        public async Task<MovieDto> AddAsync(MovieDto dto)
        {
            var newMovie = new Movie();
            DtoToEntity(dto, newMovie);
            _context.Movies.Add(newMovie);
            await _context.SaveChangesAsync();
            return EntityToDetailDto(newMovie);
        }

        public async Task<Movie?> GetAsync(int id)
        {
            var movie = await _context.Movies.SingleOrDefaultAsync(m => m.Id == id);
            if (movie == null)
                return null;

            return movie;
        }

        public async Task<MovieDto?> UpdateAsync(MovieDto dto)
        {
            var movie = await _context.Movies.FindAsync(dto.Id);
            if (movie == null)
                throw new ArgumentException($"Movie not found {dto.Id}.");

            DtoToEntity(dto, movie);

            _context.Entry(movie).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return EntityToDetailDto(movie);
        }

        public async Task DeleteAsync(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
                throw new ArgumentException($"Movie not found {id}.");

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
        }

        private static void DtoToEntity(MovieDto dto, Movie movie)
        {
            movie.Title = dto.Title;
            movie.HoursViewed = dto.HoursViewed;
            movie.Views = dto.Views;
            movie.Runtime = dto.Runtime;
            movie.Poster = dto.Poster;
        }

        private static MovieDto EntityToDetailDto(Movie m)
        {
            return new MovieDto(m.Id, m.Title, m.HoursViewed, m.Runtime, m.Views, m.Poster);
        }
    }
}
