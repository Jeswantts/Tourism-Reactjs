using Booking.Context;
using Booking.Interface;
using Booking.Models;
using Booking.Models.DTO;
using Profile.Models.DTO;
using Profile.Models;

namespace Booking.Service
{
    public class BookingService : IBookService
    {
        private readonly IBooking repo;
        public BookingService(IBooking _repo)
        {
            repo = _repo;
        }

        public async Task<BookingStatus_DTO> ChangeStatus(int id, BookingStatus_DTO status)
        {

            Bookings book = await repo.GetBookingsById(id);
            book.status = status.status;
            await repo.PutBooking(book);
            return status;
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

        public async Task<List<Passenger>> Post(List<Passenger> passenger)
        {
            return await repo.Post(passenger);
        }

        public async Task<Bookings> PostBooking(Bookings bookings)
        {
            return await repo.PostBooking(bookings);
        }

        public async Task<Payment> PostPayment(Payment payment)
        {
            return await repo.PostPayment(payment);
        }

        public async Task<Bookings> PutBooking(Bookings bookings)
        {
            return await repo.PutBooking(bookings);
        }
    }
}
