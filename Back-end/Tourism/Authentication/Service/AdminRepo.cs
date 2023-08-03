using Authentication.Context;
using Authentication.Interface;
using Authentication.Models;
using Authentication.Models.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Service
{
    public class AdminRepo:IAdmin
    {
        private readonly AdminContext _pContext;
        public AdminRepo(AdminContext con)
        {
            _pContext = con;

        }
        public async Task<ICollection<Image_Gallery>> GetAll()
        {
            var galleries = await _pContext.gallery.ToListAsync();
            return galleries;
        }

        public async Task<Admin> GetAdmins(string email_id, string password)
        {
            return await _pContext.admin.FirstOrDefaultAsync(u => u.email_id == email_id && u.password == password);
        }

        public async Task<Image_Gallery> Image(Image_Gallery image_Gallery)
        {
            string imagePath = Path.Combine(@"C:\Users\Suchitra\source\repos\ka23-tripswel\front-end-react\passenger\public\Img", image_Gallery.image);
            using (Stream stream = new FileStream(imagePath, FileMode.Create))
            {
                await image_Gallery.file.CopyToAsync(stream);
            }

            await _pContext.gallery.AddAsync(image_Gallery);
            await _pContext.SaveChangesAsync();

            return image_Gallery;
        }


    }
}
