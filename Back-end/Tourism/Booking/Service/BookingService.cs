using Booking.Context;
using Booking.Interface;
using Booking.Models;

namespace Booking.Service
{
    public class BookingService:IBooking,IBookService
    {
        private readonly IBooking repo;
        public BookingService(IBooking _repo)
        {
            repo = _repo;
        }

        public async Task<Bookings> DeleteBooking(int id)
        {
            return await repo.DeleteBooking(id);
        }

        public async Task<Passenger> DeleteById(int id)
        {
            return await repo.DeleteById(id);
        }

        public async Task<Bookings> GetBookingsById(int id)
        {
            return await repo.GetBookingsById(id);
        }

        public async Task<Passenger> GetById(int id)
        {
            return await repo.GetById(id);
        }

        public async Task<Passenger> Post(Passenger passenger)
        {
            return await repo.Post(passenger);
        }

        public async Task<Bookings> PostBooking(Bookings bookings)
        {
            return await repo.PostBooking(bookings);
        }
    }
}
