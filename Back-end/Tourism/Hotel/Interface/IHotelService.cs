using Hotel.Models;

namespace Hotel.Interface
{
    public interface IHotelService
    {
        public Task<ICollection<Hotels>> GetHotels();
        public Task<Hotels> GetHotelsId(int id);
        public Task<Hotels> PostHotels(Hotels hotel);
        public Task<Hotels> DeleteHotels(int id);
        public Task<List<Hotels>> GetHotelsFilteredByLoc(string location);

        public Task<ICollection<Rooms>> GetRoom();
        public Task<Rooms> GetRoomId(int id);
        public Task<Rooms> PostRoom(Rooms room);
        public Task<Rooms> DeleteRoom(int id);
    }
}
