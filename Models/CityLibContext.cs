using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CityLib.Models
{
    public partial class CityLibContext : DbContext
    {
        public static string ConnectionString {get;set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }

        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<BookInfo> BookInfo { get; set; }
    }
}