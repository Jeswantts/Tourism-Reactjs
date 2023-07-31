using Microsoft.EntityFrameworkCore;
using Profile.Models;

namespace Profile.Context
{
    public class ProfileContext : DbContext
    {
        public DbSet<Profiles> profiles { get; set; }

        public ProfileContext(DbContextOptions<ProfileContext> options) : base(options) { }
    }
}
