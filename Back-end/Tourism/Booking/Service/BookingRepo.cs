using Booking.Context;
using Booking.Interface;
using Booking.Models;

namespace Booking.Service
{
    public class BookingRepo : IBooking
    {
        private readonly BookingContext context;
        public BookingRepo(BookingContext _context)
        {
            context = _context;
        }
        public async Task<Passenger> DeleteById(int id)
        {
            var passenger = await context.passengers.FindAsync(id);

            if (passenger != null)
            {
                context.passengers.Remove(passenger);
                await context.SaveChangesAsync();
            }

            return passenger;
        }

        public async Task<Passenger> GetById(int id)
        {
            var passenger = await context.passengers.FindAsync(id);
            return passenger;
        }

        public async Task<Passenger> Post(Passenger passenger)
        {
            context.passengers.Add(passenger);
            await context.SaveChangesAsync();
            return passenger;
        }
    }
}
