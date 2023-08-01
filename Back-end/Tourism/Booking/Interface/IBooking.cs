using Booking.Models;

namespace Booking.Interface
{
    public interface IBooking
    {
        public Task<Passenger> GetById(int id);
        public Task<Passenger> Post(Passenger passenger);
        public Task<Passenger> DeleteById(int id);
    }
}
