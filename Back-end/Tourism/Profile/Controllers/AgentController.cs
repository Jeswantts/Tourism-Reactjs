using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Profile.Interface;
using Profile.Models;
using Profile.Models.DTO;

namespace Profile.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentController : ControllerBase
    {
        private readonly IAgentService _Service;

        public AgentController(IAgentService Service)
        {
            _Service = Service;
        }
        [HttpGet("Agent")]
        public async Task<ICollection<Agent>> GetAgent()
        {
            return await _Service.GetAgent();
        }

        [HttpDelete("Agent/{id}")]
        public async Task<Agent> DeleteAgent(int id)
        {
            return await _Service.DeleteAgent(id);
        }

        [HttpGet("Agent/filter/{customer_id}")]
        public async Task<Agent> GetAgentById(int customer_id)
        {
            return await _Service.GetAgentById(customer_id);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAgent(Register_DTO registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Register_DTO loginDTO = await _Service.RegisterAgent(registerDto);
                return Ok(loginDTO);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login/Authenticator")]
        public async Task<IActionResult> Login(Auth_DTO userLoginDTO)
        {
            if (ModelState.IsValid)
            {
                var token = await _Service.Login(userLoginDTO);

                if (!string.IsNullOrEmpty(token))
                {
                    return Ok(token);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("updateAgent/{id}")]
        public async Task<IActionResult> UpdateAgent(AgentProfile_DTO agentProfile_DTO, int id)
        {
            var updatedLoginDto = await _Service.UpdateAgent(agentProfile_DTO,id);

            if (updatedLoginDto == null)
            {
                return NotFound();
            }

            return Ok(updatedLoginDto);
        }

        [HttpPut("ChangePass/{id}")]
        public async Task<ActionResult<ChangePass_DTO>> ChangePassword(int id, ChangePasswordModel model)
        {
            var doctorDto = await _Service.ChangePassword(id, model.OldPassword, model.NewPassword);

            if (doctorDto == null)
            {
                return BadRequest("Invalid old password.");
            }

            return Ok(doctorDto);
        }

        [Authorize(Roles = "agent")]
        [HttpPut("Activation/{id}")]
        public async Task<IActionResult> ActivateAgent(int id, Activation_DTO activation_DTO)
        {
            try
            {
                Activation_DTO activate = await _Service.ActivateAgent(id, activation_DTO);
                return Ok(activate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during doctor activation: {ex.Message}");
            }
        }
    }
}
