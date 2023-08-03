using Authentication.Models;

namespace Authentication.Interface
{
    public interface IAdmin
    {
        public Task<ICollection<Image_Gallery>> GetAll();
        public Task<Admin> GetAdmins(string email_id,string password);
        public Task<Image_Gallery> Image(Image_Gallery image_Gallery);

    }
}
