using Authentication.Interface;
using Authentication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService adminService;
        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }
        [HttpGet("All")]
        public async Task<ICollection<Image_Gallery>> GetAll()
        {
            return await adminService.GetAll();
        }
        [HttpPost("Image")]
        public async Task<IActionResult> PostImage([FromForm]Image_Gallery imageGallery)
        {
            try
            {
                Image_Gallery img = await adminService.Image(imageGallery);
                return Ok(img);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during image update: {ex.Message}");
            }
        }
        [HttpPost("Login/Authentication")]
        public async Task<IActionResult> Authenticate(Admin admin)
        {
            if (ModelState.IsValid)
            {
                var token = await adminService.Login(admin);

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

    }
}
