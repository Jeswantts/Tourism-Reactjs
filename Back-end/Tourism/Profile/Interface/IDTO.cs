using Profile.Models.DTO;

namespace Profile.Interface
{
    public interface IDTO
    {
        public Task<Login_DTO> GetLoginById(int id);
        public Task<Login_DTO> PutLogin(Login_DTO Login_DTO, int id);

        public Task<Profile_DTO> GetProById(int id);

        public Task<Profile_DTO> PutPro(Profile_DTO Profile_DTO, int id);

        public Task<ChangePass_DTO> ChangePassword(int id, string oldPassword, string newPassword);
        public Task<ChangeImg_DTO> UpdateImage(int id, ChangeImg_DTO changeImg_DTO);
        public Task<ChangeImg_DTO> ViewImage(int id);
        public Task<Register_DTO> Register(Register_DTO register_DTO);

        public Task<string> Login(Auth_DTO auth_DTO);
    }
}
