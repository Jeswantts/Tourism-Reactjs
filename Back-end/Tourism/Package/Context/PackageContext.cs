using Microsoft.EntityFrameworkCore;
using Package.Models;

namespace Package.Context
{
    public class PackageContext : DbContext
    {
        public DbSet<Location> locations { get; set; }
        public DbSet<Packages> packages { get; set; }
        public DbSet<Itinerary> itinerary { get; set; }
        public PackageContext(DbContextOptions<PackageContext> options) : base(options) { }
    }
}
