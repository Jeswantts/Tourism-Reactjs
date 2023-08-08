using Hotel.Context;
using Hotel.Interface;
using Hotel.Models;

namespace Hotel.Service
{
    public class HotelService : IHotelService
    {
        private readonly IHotel _repo;

        public HotelService(IHotel repo)
        {
            _repo = repo;
        }
        public async Task<Hotels> DeleteHotels(int id)
        {
            return await _repo.DeleteHotels(id);
        }

        public async Task<Rooms> DeleteRoom(int id)
        {
            return await _repo.DeleteRoom(id);
        }

        public async Task<ICollection<Hotels>> GetHotels()
        {
            return await _repo.GetHotels();
        }

        public async Task<List<Hotels>> GetHotelsFilteredByLoc(string location)
        {
            var hotels = await _repo.GetHotels();
            var filter = hotels.Where(h => RemoveSpaces(h.detailed_location.ToLower()).Contains((RemoveSpaces(location.ToLower()))));
            return filter.ToList();
        }
        private string RemoveSpaces(string input)
        {
            return new string(input.ToCharArray().Where(c => !char.IsWhiteSpace(c)).ToArray());
        }

        public async Task<Hotels> GetHotelsId(int id)
        {
            return await _repo.GetHotelsId(id);
        }

        public async Task<ICollection<Rooms>> GetRoom()
        {
            return await _repo.GetRoom();
        }

        public async Task<Rooms> GetRoomId(int id)
        {
            return await _repo.GetRoomId(id);
        }

        public async Task<Hotels> PostHotels(Hotels hotel)
        {
            return await _repo.PostHotels(hotel);
        }

        public async Task<Rooms> PostRoom(Rooms room)
        {
            return await _repo.PostRoom(room);
        }
    }
}
