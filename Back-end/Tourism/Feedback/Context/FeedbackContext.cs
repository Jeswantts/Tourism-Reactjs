using Feedback.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Context
{
    public class FeedbackContext:DbContext
    {
        public DbSet<Rating> rating { get; set; }
        public DbSet<Hotel_Rating> hrating { get; set; }

        public FeedbackContext(DbContextOptions<FeedbackContext> options) : base(options) { }
    }
}
