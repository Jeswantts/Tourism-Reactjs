using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Context
{
    public class HotelContext:DbContext
    {
        public DbSet<Hotels> hotels { get; set; }

        public DbSet<Rooms> rooms { get; set; }


        public HotelContext(DbContextOptions<HotelContext> options) : base(options) { }
    }
}
