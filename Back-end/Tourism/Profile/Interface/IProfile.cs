using Microsoft.AspNetCore.Mvc;
using Profile.Models;

namespace Profile.Interface
{
    public interface IProfile
    {
        public Task<ICollection<Profiles>> GetProfile();

        public Task<Profiles> PutProfile(Profiles Profiles);

        public Task<Profiles> PostProfile(Profiles Profiles);

        public Task<Profiles> DeleteProfile(int id);

        public Task<Profiles> GetProfileById(int customer_id);

        public Task<Profiles> GetUser(string email_id);
    }
}
