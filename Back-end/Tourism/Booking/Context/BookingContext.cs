using Microsoft.EntityFrameworkCore;
using Booking.Models;

namespace Booking.Context
{
    public class BookingContext : DbContext
    {
        public DbSet<Passenger> passengers { get; set; }
        public DbSet<Bookings> bookings { get; set; }
        public DbSet<Payment> payment { get; set; }
        public BookingContext(DbContextOptions<BookingContext> options) : base(options) { }
    }
}
