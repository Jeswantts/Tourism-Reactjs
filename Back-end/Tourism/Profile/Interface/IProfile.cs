using Microsoft.AspNetCore.Mvc;
using Profile.Models;

namespace Profile.Interface
{
    public interface IProfile
    {
        public Task<ICollection<Profiles>> GetProfile();

        public Profiles PutProfile(string Name, Profiles Profiles);
        public Profiles DeleteProfile(string Name);

        public Task<Profiles> GetProfileById(int customer_id);
    }
}
