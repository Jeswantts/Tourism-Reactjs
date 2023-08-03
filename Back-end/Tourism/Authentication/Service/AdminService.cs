using Authentication.Interface;
using Authentication.Models;
using Authentication.Models.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication.Service
{
    public class AdminService : IAdmin, IAdminService
    {
        private readonly IAdmin repo;
        private readonly IConfiguration _configuration;
        public AdminService(IAdmin _repo, IConfiguration configuration)
        {
            repo = _repo;
            _configuration = configuration;
        }
        public async Task<Admin> GetAdmins(string email_id,string password)
        {
            return await repo.GetAdmins(email_id,password);
        }

        public async Task<ICollection<Image_Gallery>> GetAll()
        {
            return await repo.GetAll();
        }

        public async Task<Image_Gallery> Image(Image_Gallery image_Gallery)
        {
            return await repo.Image(image_Gallery);
        }

        public async Task<string> Login(Admin auth_DTO)
        {
            if (auth_DTO != null && !string.IsNullOrEmpty(auth_DTO.email_id) && !string.IsNullOrEmpty(auth_DTO.password))
            {
                var admin = await GetAdmins(auth_DTO.email_id, auth_DTO.password);
                if (admin != null)
                {
                    var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("email_id", admin.email_id),
                    new Claim("AdminId", admin.id.ToString()),
                    new Claim(ClaimTypes.Role, "admin")

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

    }
}
