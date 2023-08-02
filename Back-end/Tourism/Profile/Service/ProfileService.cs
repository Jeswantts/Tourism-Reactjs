using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Profile.Context;
using Profile.Interface;
using Profile.Models;
using Profile.Models.DTO;
using Profile.Models.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Security.Claims;
using System.Text;

namespace My_Profile.Service
{
    public class ProfileService : IProService, IProfile
    {
        private readonly IProfile repo;
        private readonly IConfiguration _configuration;
        public ProfileService(IProfile _repo, IConfiguration configuration)
        {
            repo = _repo;
            _configuration = configuration;
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


            await repo.PutProfile(profile);
            var loginDTO = new Login_DTO
            {
                mobile_number = profile.mobile_number,
                email_id = profile.email_id
            };

            return loginDTO;
        }

        public async Task<Profile_DTO> GetProById(int id)
        {
            Profiles profile = await repo.GetProfileById(id);

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

            await repo.PutProfile(profile);

            var loginDTO = new Profile_DTO
            {
                name = profile.name, 
                dob = profile.dob,
                gender = profile.gender, 
                marital_status = profile.marital_status, 
                customer_id = profile.customer_id
            };

            return loginDTO;
        }



        public async Task<ChangePass_DTO> ChangePassword(int id, string oldPassword, string newPassword)
        {
            Profiles profile = await repo.GetProfileById(id);


            bool isOldPasswordCorrect = PasswordHasher.VerifyPassword(oldPassword, profile.password);
            if (!isOldPasswordCorrect)
            {
                return null;
            }
            string newHashedPassword = PasswordHasher.HashPassword(newPassword);
            profile.password = newHashedPassword;
            await repo.PutProfile(profile);

            return new ChangePass_DTO
            {
                customer_id = profile.customer_id,
                Password = newPassword,
                HashedPassword = newHashedPassword
            };

        }

        public async Task<ChangeImg_DTO> UpdateImage(int id, ChangeImg_DTO changeImg_DTO)
        {
            Profiles profile = await repo.GetProfileById(id);

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
            await repo.PutProfile(profile);
            return changeImg_DTO;
        }

        public async Task<Register_DTO> RegisterUser(Register_DTO register_DTO)
        {
            if (register_DTO.role == "user")
            {
                var profile = new Profiles
                {
                    customer_id = register_DTO.customer_id,
                    email_id = register_DTO.email_id,
                    password = PasswordHasher.HashPassword(register_DTO.password),
                };

                await repo.PostProfile(profile);

                var loginDTO = new Register_DTO
                {
                    customer_id = profile.customer_id,
                    email_id = profile.email_id,
                    password = profile.password,
                    role = register_DTO.role // Preserve the role in the returned DTO
                };

                return loginDTO;
            }
            else
            {
                throw new ArgumentException("Invalid role.");
            }
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


        public async Task<string> Login(Auth_DTO auth_DTO)
        {
            if (auth_DTO != null && !string.IsNullOrEmpty(auth_DTO.email_id) && !string.IsNullOrEmpty(auth_DTO.password))
            {
                var user = await GetUser(auth_DTO.email_id);
                if (user != null && PasswordHasher.VerifyPassword(auth_DTO.password, user.password))
                {
                    var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("email_id", user.email_id),
                    new Claim("UserId", user.customer_id.ToString()),
                    new Claim(ClaimTypes.Role, "user")

                };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:TokenExpirationMinutes"])),
                        signingCredentials: signIn);

                    return new JwtSecurityTokenHandler().WriteToken(token);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<Profiles> GetUser(string email_id)
        {
            return await repo.GetUser(email_id);
        }

        public async Task<ICollection<Profiles>> GetProfile()
        {
            return await repo.GetProfile();
        }

        public  async Task<Profiles> PutProfile(Profiles Profiles)
        {
            return await repo.PutProfile(Profiles);
        }

        public async Task<Profiles> DeleteProfile(int id)
        {
            return await repo.DeleteProfile(id);
        }

        public async Task<Profiles> GetProfileById(int customer_id)
        {
            return await repo.GetProfileById(customer_id);
        }

        public async Task<Profiles> PostProfile(Profiles Profiles)
        {
            return await repo.PostProfile(Profiles);
        }

        
    }
}
