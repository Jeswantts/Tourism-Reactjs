using Hotel.Context;
using Hotel.Interface;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Hotel.Service
{
    public class HotelRepo : IHotel
    {
        private readonly HotelContext _context;

        public HotelRepo(HotelContext context)
        {
            _context = context;
        }
        public async Task<Hotels> DeleteHotels(int id)
        {
            try
            {
                Hotels hot = await _context.hotels.FirstOrDefaultAsync(x => x.hotel_id == id);
                _context.hotels.Remove(hot);
                _context.SaveChanges();

                return hot;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Rooms> DeleteRoom(int id)
        {
            try
            {
                Rooms hot = await _context.rooms.FirstOrDefaultAsync(x => x.room_id == id);
                _context.rooms.Remove(hot);
                _context.SaveChanges();

                return hot;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<ICollection<Hotels>> GetHotels()
        {
            return await _context.hotels.ToListAsync();
        }

        public async Task<Hotels> GetHotelsId(int id)
        {
            try
            {
                return await _context.hotels.FirstOrDefaultAsync(a => a.hotel_id == id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<ICollection<Rooms>> GetRoom()
        {
            return await _context.rooms.ToListAsync();
        }

        public async Task<Rooms> GetRoomId(int id)
        {
            try
            {
                return await _context.rooms.FirstOrDefaultAsync(a => a.hotel_id == id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Hotels> PostHotels(Hotels hotel)
        {
            try
            {
                if (hotel.file != null)
                {
                    string path = Path.Combine(@"C:\Users\Suchitra\source\repos\Kanini-Tourism\Front-end\tourism\public\Agent", hotel.hotel_image);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await hotel.file.CopyToAsync(stream);
                    }
                }

                _context.hotels.Add(hotel);
                await _context.SaveChangesAsync();
                return hotel;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error creating hotel.", ex);
            }
        }

        public async Task<Rooms> PostRoom(Rooms room)
        {
            try
            {
                if (room.file != null)
                {
                    string path = Path.Combine(@"C:\Users\Suchitra\source\repos\Kanini-Tourism\Front-end\tourism\public\Agent", room.room_image);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        await room.file.CopyToAsync(stream);
                    }
                }

                _context.rooms.Add(room);
                await _context.SaveChangesAsync();
                return room;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error creating room.", ex);
            }
        }

    }
}
