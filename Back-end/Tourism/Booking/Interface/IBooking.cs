using Booking.Models;

namespace Booking.Interface
{
    public interface IBooking
    {
        public Task<Passenger> GetById(int id);
        public Task<Passenger> Post(Passenger passenger);
        public Task<Passenger> DeleteById(int id);

        public Task<Bookings> GetBookingsById(int id);
        public Task<Bookings> PostBooking(Bookings bookings);
        public Task<Bookings> DeleteBooking(int id);
    }
}
