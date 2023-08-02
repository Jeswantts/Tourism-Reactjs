using Profile.Models;
using Profile.Models.DTO;

namespace Profile.Interface
{
    public interface IAgentService
    {
        public Task<ICollection<Agent>> GetAgent();

        public Task<Agent> PutAgent(Agent Agent);

        public Task<Agent> PostAgent(Agent Agent);

        public Task<Agent> DeleteAgent(int id);

        public Task<Agent> GetAgentById(int customer_id);

        public Task<Register_DTO> RegisterAgent(Register_DTO register_DTO);
        public Task<AgentProfile_DTO> UpdateAgent(AgentProfile_DTO agentProfile_DTO,int id);
        public Task<Activation_DTO> ActivateAgent(int id,Activation_DTO activation_DTO);
        public Task<ChangePass_DTO> ChangePassword(int id, string oldPassword, string newPassword);
        public Task<string> Login(Auth_DTO auth_DTO);
        public Task<Agent> GetAgent(string email_id);

    }
}
