using Hotel.Interface;
using Hotel.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _service;
        public HotelController(IHotelService service)
        {
            _service = service;
        }
        [HttpGet("Hotels")]
        public async Task<ICollection<Hotels>> GetAll()
        {
            return await _service.GetHotels();
        }
        [HttpGet("Hotel/{id}")]
        public async Task<Hotels> GetHotelById(int id)
        {
            return await _service.GetHotelsId(id);
        }
        [HttpPost("PostHotels")]
        public async Task<IActionResult> PostHotel([FromForm]Hotels hotels)
        {
            if (hotels == null)
            {
                return BadRequest();
            }
            else
            {
                var hotel = await _service.PostHotels(hotels);
                return Ok(hotel);
            }
        }
        [HttpDelete("DeleteHotel/{id}")]
        public async Task<Hotels> DeleteHotel(int id)
        {
            return await _service.DeleteHotels(id);
        }


        [HttpGet("Rooms")]
        public async Task<ICollection<Rooms>> GetAllRooms()
        {
            return await _service.GetRoom();
        }
        [HttpGet("Room/{id}")]
        public async Task<Rooms> GetRoomsById(int id)
        {
            return await _service.GetRoomId(id);
        }
        [HttpPost("PostRoom")]
        public async Task<IActionResult> PostRooms([FromForm]Rooms rooms)
        {
            if (rooms == null)
            {
                return BadRequest();
            }
            else
            {
                var room = await _service.PostRoom(rooms);
                return Ok(room);
            }
        }
        [HttpDelete("DeleteRoom/{id}")]
        public async Task<Rooms> DeleteRooms(int id)
        {
            return await _service.DeleteRoom(id);
        }
        [HttpGet("Hotels/filterbyloc/{location}")]
        public async Task<List<Hotels>> GetHotelsFilteredByLoc(string location)
        {
            return await _service.GetHotelsFilteredByLoc(location);
        }

    }
}
