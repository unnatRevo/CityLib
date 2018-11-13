using System;

namespace CityLib.Models
{
    public class BookInfo
    {
        public string isbn { get; set; }
        public string title { get; set; }
        public string publisherid { get; set; }
        public DateTime publicationdate { get; set; }
        public int authorid { get; set; }
    }
}