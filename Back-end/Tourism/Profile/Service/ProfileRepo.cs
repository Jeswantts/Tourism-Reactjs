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
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProfileRepo(ProfileContext con, IWebHostEnvironment webHostEnvironment)
        {
            _pContext = con;
            _webHostEnvironment = webHostEnvironment;

        }
        public async Task<ICollection<Profiles>> GetProfile()
        {
            var Profile = await _pContext.profiles.ToListAsync();
            return Profile;
        }
        public Profiles PostProfile([FromForm] Profiles Profile, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyToAsync(stream);
            }

            Profile.image = fileName;

            _pContext.profiles.Add(Profile);
            _pContext.SaveChanges();

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
