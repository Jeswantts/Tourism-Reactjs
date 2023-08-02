using Microsoft.EntityFrameworkCore;
using Profile.Context;
using Profile.Interface;
using Profile.Models;

namespace Profile.Service
{
    public class AgentRepo : IAgent
    {
        private readonly ProfileContext _pContext;
        public AgentRepo(ProfileContext con)
        {
            _pContext = con;

        }
        public async Task<ICollection<Agent>> GetAgent()
        {
            var Agent = await _pContext.agent.ToListAsync();
            return Agent;
        }

        public async Task<Agent> PutAgent(Agent Agent)
        {
            _pContext.agent.Update(Agent);
            await _pContext.SaveChangesAsync();
            return Agent;
        }

        public async Task<Agent> PostAgent(Agent Agent)
        {
            _pContext.agent.Add(Agent);
            await _pContext.SaveChangesAsync();
            return Agent;
        }

        public async Task<Agent> DeleteAgent(int id)
        {
            try
            {
                Agent hot = await _pContext.agent.FindAsync(id);
                if (hot != null)
                {
                    _pContext.agent.Remove(hot);
                    await _pContext.SaveChangesAsync();
                }
                return hot;

            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Agent> GetAgentById(int customer_id)
        {
            var Agent = await _pContext.agent.FindAsync(customer_id);
            return Agent;
        }

        public async Task<Agent> GetAgent(string email_id)
        {
            return await _pContext.agent.FirstOrDefaultAsync(u => u.email_id == email_id);
        }

    }
}
