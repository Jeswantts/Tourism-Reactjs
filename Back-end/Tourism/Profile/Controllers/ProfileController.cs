using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Profile.Interface;
using Profile.Models;
using Profile.Models.DTO;

namespace Profile.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfile _profileRepo;
        private readonly IDTO _loginService;

        public ProfileController(IProfile profileRepo, IDTO loginService)
        {
            _profileRepo = profileRepo;
            _loginService = loginService;
        }

        [HttpGet("All")]
        public async Task<ICollection<Profiles>> GetProfile()
        {
            return await _profileRepo.GetProfile();
        }

        [HttpPost("All/reg")]
        public Profiles Post([FromForm] Profiles profile, IFormFile imageFile)
        {
            return _profileRepo.PostProfile(profile, imageFile);
        }

        [HttpPut("{Name}")]
        public Profiles? PutHotels(string Name, Profiles profile)
        {
            return _profileRepo.PutProfile(Name, profile);
        }

        [HttpDelete("{Name}")]
        public Profiles? DeleteProfile(string Name)
        {
            return _profileRepo.DeleteProfile(Name);
        }

        [HttpGet("filter/{customer_id}")]
        public async Task<Profiles> GetProfileById(int customer_id)
        {
            return await _profileRepo.GetProfileById(customer_id);
        }

        [HttpGet("login/{id}")]
        public async Task<ActionResult<Login_DTO>> GetLoginById(int id)
        {
            var loginDto = await _loginService.GetLoginById(id);

            if (loginDto == null)
            {
                return NotFound();
            }

            return Ok(loginDto);
        }

        [HttpGet("profile_dto/{id}")]
        public async Task<IActionResult> GetProById(int id)
        {
            var profileDto = await _loginService.GetProById(id);

            if (profileDto == null)
            {
                return NotFound();
            }

            return Ok(profileDto);
        }

        [HttpPut("login_dto/{id}")]
        public async Task<IActionResult> PutLogin(int id, Login_DTO dto)
        {
            var updatedLoginDto = await _loginService.PutLogin(dto, id);

            if (updatedLoginDto == null)
            {
                return NotFound();
            }

            return Ok(updatedLoginDto);
        }

        [HttpPut("profile_dto/{id}")]
        public async Task<IActionResult> PutPro(int id, Profile_DTO dto)
        {
            var updatedLoginDto = await _loginService.PutPro(dto, id);

            if (updatedLoginDto == null)
            {
                return NotFound();
            }

            return Ok(updatedLoginDto);
        }

        [HttpPut("ChangePass/{id}")]
        public async Task<ActionResult<ChangePass_DTO>> ChangePassword(int id, ChangePasswordModel model)
        {
            var doctorDto = await _loginService.ChangePassword(id, model.OldPassword, model.NewPassword);

            if (doctorDto == null)
            {
                // Doctor not found or old password is incorrect
                return BadRequest("Invalid old password.");
            }

            return Ok(doctorDto);
        }

        [HttpPut("updateimage/{id}")]
        public async Task<IActionResult> UpdateImage(int id, [FromForm] ChangeImg_DTO changeImg_DTO)
        {
            try
            {
                ChangeImg_DTO updatedImage = await _loginService.UpdateImage(id, changeImg_DTO);
                return Ok(updatedImage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during image update: {ex.Message}");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Register_DTO registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Register_DTO loginDTO = await _loginService.Register(registerDto);
                return Ok(loginDTO);
            }
            catch (ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("view_image/{id}")]
        public async Task<IActionResult> ViewImage(int id)
        {
            var profileDto = await _loginService.ViewImage(id);

            if (profileDto == null)
            {
                return NotFound();
            }

            return Ok(profileDto);
        }
    }
}

