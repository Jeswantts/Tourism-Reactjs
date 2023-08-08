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

        public async Task<Bookings> DeleteBooking(int id)
        {
            var booking = await context.bookings.FindAsync(id);

            if (booking != null)
            {
                context.bookings.Remove(booking);
                await context.SaveChangesAsync();
            }

            return booking;
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

        public async Task<Bookings> GetBookingsById(int id)
        {
            var booking = await context.bookings.FindAsync(id);
            return booking;
        }

        public async Task<Passenger> GetById(int id)
        {
            var passenger = await context.passengers.FindAsync(id);
            return passenger;
        }

        public async Task<List<Passenger>> Post(List<Passenger> passenger)
        {
            context.passengers.AddRange(passenger);
            await context.SaveChangesAsync();
            return passenger;
        }

        public async Task<Bookings> PostBooking(Bookings bookings)
        {
            context.bookings.Add(bookings);
            await context.SaveChangesAsync();
            return bookings;
        }

        public async Task<Payment> PostPayment(Payment payment)
        {
            context.payment.Add(payment);
            await context.SaveChangesAsync();
            return payment;
        }

        public async Task<Bookings> PutBooking(Bookings bookings)
        {
            context.bookings.Update(bookings);
            await context.SaveChangesAsync();
            return bookings;
        }
    }
}
