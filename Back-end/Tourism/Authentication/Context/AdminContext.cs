using Authentication.Models;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Context
{
    public class AdminContext:DbContext
    {
        public DbSet<Admin> admin { get; set; }

        public DbSet<Image_Gallery> gallery { get; set; }

        public AdminContext(DbContextOptions<AdminContext> options) : base(options) { }
    }
}
