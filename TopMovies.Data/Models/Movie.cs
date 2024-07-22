namespace TopMovies.Data.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public long HoursViewed { get; set; }
        public string? Runtime { get; set; }
        public long Views { get; set; }
        public string? Poster { get; set; }
    }
}
