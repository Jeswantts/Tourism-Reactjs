using Microsoft.EntityFrameworkCore;
using Profile.Context;
using Profile.Interface;
using Profile.Models;
using Profile.Models.DTO;
using Profile.Models.Helpers;
using System.Numerics;

namespace My_Profile.Service
{
    public class ProfileService : IDTO
    {
        private readonly IProfile repo;
        private readonly ProfileContext context;
        public ProfileService(IProfile _repo, ProfileContext context)
        {
            repo = _repo;
            this.context = context;
        }
        public async Task<Login_DTO> GetLoginById(int id)
        {
            var profile = await repo.GetProfileById(id);

            var loginDTO = new Login_DTO
            {
                mobile_number = profile.mobile_number,
                email_id = profile.email_id,
                customer_id = profile.customer_id
            };

            return loginDTO;
        }

        public async Task<Login_DTO> PutLogin(Login_DTO dto, int id)
        {

            var profile = await repo.GetProfileById(id);

            if (dto.mobile_number != null)
                profile.mobile_number = dto.mobile_number;
            if (dto.email_id != null)
                profile.email_id = dto.email_id;


            await context.SaveChangesAsync();
            var loginDTO = new Login_DTO
            {
                mobile_number = profile.mobile_number,
                email_id = profile.email_id
            };

            return loginDTO;
        }

        public async Task<Profile_DTO> GetProById(int id)
        {
            Profiles profile = await context.profiles.FindAsync(id);

            if (profile == null)
            {
                return null;
            }

            var profileDTO = new Profile_DTO
            {
                name = profile.name,
                dob = profile.dob,
                gender = profile.gender,
                marital_status = profile.marital_status,
                customer_id = profile.customer_id
            };

            return profileDTO;
        }



        public async Task<Profile_DTO> PutPro(Profile_DTO dto, int id)
        {
            Profiles profile = await repo.GetProfileById(id);


                profile.name = dto.name;
                profile.dob = dto.dob;
                profile.gender = dto.gender;
                profile.marital_status = dto.marital_status;

                await context.SaveChangesAsync();

            var loginDTO = new Profile_DTO
            {
                name = profile.name, 
                dob = profile.dob,
                gender = profile.gender, 
                marital_status = profile.marital_status, 
            };

            return loginDTO;
        }



        public async Task<ChangePass_DTO> ChangePassword(int id, string oldPassword, string newPassword)
        {
            Profiles profile = await context.profiles.FindAsync(id);


            bool isOldPasswordCorrect = PasswordHasher.VerifyPassword(oldPassword, profile.password);
            if (!isOldPasswordCorrect)
            {
                return null;
            }
            string newHashedPassword = PasswordHasher.HashPassword(newPassword);
            profile.password = newHashedPassword;
            await context.SaveChangesAsync();

            return new ChangePass_DTO
            {
                customer_id = profile.customer_id,
                Password = newPassword,
                HashedPassword = newHashedPassword
            };

        }

        public async Task<ChangeImg_DTO> UpdateImage(int id, ChangeImg_DTO changeImg_DTO)
        {
            Profiles profile = await context.profiles.FindAsync(id);

            if (!string.IsNullOrEmpty(profile.image))
            {
                string oldImagePath = Path.Combine(@"C:\Users\Suchitra\source\repos\ka23-tripswel\front-end-react\passenger\public\Img", profile.image);
                if (File.Exists(oldImagePath))
                {
                    File.Delete(oldImagePath);
                }
            }

            string imagePath = Path.Combine(@"C:\Users\Suchitra\source\repos\ka23-tripswel\front-end-react\passenger\public\Img", changeImg_DTO.image);
            using (Stream stream = new FileStream(imagePath, FileMode.Create))
            {
                await changeImg_DTO.file.CopyToAsync(stream);
            }

            profile.image = changeImg_DTO.image;
            await context.SaveChangesAsync();
            return changeImg_DTO;
        }

        public async Task<Register_DTO> Register(Register_DTO register_DTO)
        {
            var profile = new Profiles
            {
                customer_id = register_DTO.customer_id,
                email_id = register_DTO.email_id,
                password = PasswordHasher.HashPassword(register_DTO.password),
            };

            context.profiles.Add(profile);
            await context.SaveChangesAsync();

            var loginDTO = new Register_DTO
            {
                customer_id = profile.customer_id,
                email_id = profile.email_id,
                password = profile.password
            };
            return loginDTO;
        }

        public async Task<ChangeImg_DTO> ViewImage(int id)
        {
            Profiles profile = await repo.GetProfileById(id);
            if (profile == null)
            {
                return null;
            }

            var profileDTO = new ChangeImg_DTO
            {
                customer_id = profile.customer_id,
                image = profile.image
            };

            return profileDTO;
        }

    }
}
