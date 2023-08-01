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
        public Profiles PutProfile(string Name, Profiles Profile)
        {
            try
            {
                _pContext.Entry(Profile).State = EntityState.Modified;
                _pContext.SaveChangesAsync();
                return Profile;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Profiles DeleteProfile(string Name)
        {
            try
            {
                Profiles hot = _pContext.profiles.FirstOrDefault(x => x.name == Name);


                _pContext.profiles.Remove(hot);
                _pContext.SaveChanges();

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
    }
}
