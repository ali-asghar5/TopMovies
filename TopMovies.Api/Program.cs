using Microsoft.EntityFrameworkCore;
using TopMovies.Api.Extensions;
using TopMovies.Data;
using TopMovies.Data.Repositories;
using TopMovies.Data.Repositories.Interfaces;

namespace TopMovies.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<TopMoviesDbContext>(o =>
            {
                var filePath = Path.Join(Environment.CurrentDirectory, builder.Configuration.GetConnectionString("TopMovies"));
                // If directory doesn't exists, create it.
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                o.UseSqlite($"DataSource={Path.Join(Environment.CurrentDirectory, builder.Configuration.GetConnectionString("TopMovies") ??
                    throw new InvalidOperationException("Database connection string not found."))}");
                o.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            // Add services to the container.
            builder.Services.AddScoped<IMovieRepository, MovieRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                app.ApplyMigrations();
            }

            app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed(origin => true));

            app.UseHttpsRedirection();

            app.MapMovieEndpoints();
            app.UseRouting();
            app.UseAuthorization();
            app.MapDefaultControllerRoute();

            app.Run();
        }
    }
}
