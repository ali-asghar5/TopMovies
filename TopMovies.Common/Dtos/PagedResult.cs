namespace TopMovies.Common.Dtos
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public int TotalRecords { get; set; }
    }
}
