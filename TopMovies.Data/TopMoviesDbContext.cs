using Microsoft.EntityFrameworkCore;
using TopMovies.Data.Models;

namespace TopMovies.Data
{
    public class TopMoviesDbContext : DbContext
    {
        public TopMoviesDbContext(DbContextOptions<TopMoviesDbContext> o) : base(o) { }

        public DbSet<Movie> Movies => Set<Movie>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedData.Seed(builder);
        }
    }
}
