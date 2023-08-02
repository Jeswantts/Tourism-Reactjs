using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profile.Context;
using Profile.Interface;
using Profile.Models;

namespace My_Profile.Service
{
    public class ProfileRepo : IProfile
    {
        private readonly ProfileContext _pContext;
        public ProfileRepo(ProfileContext con)
        {
            _pContext = con;

        }
        public async Task<ICollection<Profiles>> GetProfile()
        {
            var Profile = await _pContext.profiles.ToListAsync();
            return Profile;
        }

        public async Task<Profiles> DeleteProfile(int id)
        {
            try
            {
                Profiles hot = await _pContext.profiles.FindAsync(id);
                if (hot != null)
                {
                    _pContext.profiles.Remove(hot);
                    await _pContext.SaveChangesAsync();
                }
                return hot;

            }
            catch (Exception)
            {
                return null;
            }

        }
        public async Task<Profiles> GetProfileById(int customer_id)
        {
            var Profile = await _pContext.profiles.FindAsync(customer_id);
            return Profile;
        }

        public async Task<Profiles> GetUser(string email_id)
        {
            return await _pContext.profiles.FirstOrDefaultAsync(u => u.email_id == email_id);
        }

        public async Task<Profiles> PostProfile(Profiles Profiles)
        {
            _pContext.profiles.Add(Profiles);
            await _pContext.SaveChangesAsync();
            return Profiles;
        }

        public async Task<Profiles> PutProfile(Profiles Profiles)
        {
            _pContext.profiles.Update(Profiles);
            await _pContext.SaveChangesAsync();
            return Profiles;
        }
    }
}
