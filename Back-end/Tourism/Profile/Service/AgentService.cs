using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Profile.Interface;
using Profile.Models;
using Profile.Models.DTO;
using Profile.Models.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Security.Claims;
using System.Text;

namespace Profile.Service
{
    public class AgentService : IAgentService,IAgent
    {
        private readonly IAgent repo;
        private readonly IConfiguration _configuration;
        public AgentService(IAgent _repo, IConfiguration configuration)
        {
            repo = _repo;
            _configuration = configuration;
        }
        public async Task<ICollection<Agent>> GetAgent()
        {
            return await repo.GetAgent();
        }

        public async Task<Agent> PutAgent(Agent Agent)
        {
            return await repo.PutAgent(Agent);
        }

        public async Task<Agent> PostAgent(Agent Agent)
        {
            return await repo.PostAgent(Agent);
        }

        public async Task<Agent> DeleteAgent(int id)
        {
            return await repo.DeleteAgent(id);
        }

        public async Task<Agent> GetAgentById(int customer_id)
        {
            return await repo.GetAgentById(customer_id);
        }

        public async Task<Register_DTO> RegisterAgent(Register_DTO register_DTO)
        {
            if (register_DTO.role == "agent")
            {
                var agent = new Agent
                {
                    customer_id = register_DTO.customer_id,
                    email_id = register_DTO.email_id,
                    password = PasswordHasher.HashPassword(register_DTO.password),
                };

                await repo.PostAgent(agent);

                var loginDTO = new Register_DTO
                {
                    customer_id = agent.customer_id,
                    email_id = agent.email_id,
                    password = agent.password,
                    role = register_DTO.role // Preserve the role in the returned DTO
                };

                return loginDTO;
            }
            else
            {
                throw new ArgumentException("Invalid role.");
            }
        }

        public async Task<AgentProfile_DTO> UpdateAgent(AgentProfile_DTO agentProfile_DTO, int id)
        {
            Agent agent = await repo.GetAgentById(id);

            agent.email_id = agentProfile_DTO.email_id;
            agent.agent_name = agentProfile_DTO.agent_name;
            agent.agent_mobile = agentProfile_DTO.agent_mobile;
            agent.agency_name = agentProfile_DTO.agency_name;

            await repo.PutAgent(agent);

            var loginDTO = new AgentProfile_DTO
            {
                customer_id = agent.customer_id,
                email_id = agent.email_id,
                agency_name = agent.agency_name,
                agent_mobile= agent.agent_mobile,
                agent_name = agent.agent_name,
            };

            return loginDTO;
        }

        public async Task<Activation_DTO> ActivateAgent(int id,Activation_DTO activation_DTO)
        {
            Agent agent = await repo.GetAgentById(id);
            agent.status = activation_DTO.status;
            await repo.PutAgent(agent);
            return activation_DTO;
        }

        public async Task<ChangePass_DTO> ChangePassword(int id, string oldPassword, string newPassword)
        {
            Agent agent = await repo.GetAgentById(id);


            bool isOldPasswordCorrect = PasswordHasher.VerifyPassword(oldPassword, agent.password);
            if (!isOldPasswordCorrect)
            {
                return null;
            }
            string newHashedPassword = PasswordHasher.HashPassword(newPassword);
            agent.password = newHashedPassword;
            await repo.PutAgent(agent);

            return new ChangePass_DTO
            {
                customer_id = agent.customer_id,
                Password = newPassword,
                HashedPassword = newHashedPassword
            };
        }

        public async Task<string> Login(Auth_DTO auth_DTO)
        {
            if (auth_DTO != null && !string.IsNullOrEmpty(auth_DTO.email_id) && !string.IsNullOrEmpty(auth_DTO.password))
            {
                var user = await GetAgent(auth_DTO.email_id);
                if (user != null && PasswordHasher.VerifyPassword(auth_DTO.password, user.password))
                {
                    var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("email_id", user.email_id),
                    new Claim("UserId", user.customer_id.ToString()),
                    new Claim(ClaimTypes.Role, "agent")

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

        public async Task<Agent> GetAgent(string email_id)
        {
            return await repo.GetAgent(email_id);
        }
    }
}
