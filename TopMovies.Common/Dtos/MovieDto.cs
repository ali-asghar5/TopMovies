using System.ComponentModel.DataAnnotations;

namespace TopMovies.Common.Dtos
{
    public record MovieDto(int Id, 
        [property: Required] string Title,
        long HoursViewed, [property: Required] string Runtime, long Views, string? Poster);
}