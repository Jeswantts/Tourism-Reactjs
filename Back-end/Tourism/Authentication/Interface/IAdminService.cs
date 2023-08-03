using Authentication.Models;

namespace Authentication.Interface
{
    public interface IAdminService
    {
        public Task<string> Login(Admin auth_DTO);
        public Task<Admin> GetAdmins(string email_id,string password);
        public Task<Image_Gallery> Image(Image_Gallery image_Gallery);
        public Task<ICollection<Image_Gallery>> GetAll();

    }
}
