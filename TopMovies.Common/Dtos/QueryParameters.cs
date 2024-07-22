namespace TopMovies.Common.Dtos
{
    public record QueryParameters(int Page = 1, int PageSize = 5, string SortBy = "Views", bool Descending = true);
}
