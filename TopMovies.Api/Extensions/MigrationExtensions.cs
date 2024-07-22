using TopMovies.Data;

namespace TopMovies.Api.Extensions
{
    public static class MigrationExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.CreateScope();

            using TopMoviesDbContext context = scope.ServiceProvider.GetRequiredService<TopMoviesDbContext>();
            context.Database.EnsureCreated();
        }
    }
}
