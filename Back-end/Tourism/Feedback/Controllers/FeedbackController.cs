using Feedback.Interface;
using Feedback.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Feedback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedService service;
        public FeedbackController(IFeedService _service)
        {
            service = _service;
        }

        [HttpPost("Rating")]
        public async Task<IActionResult> PostRating(Rating rating)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList();
                return new BadRequestObjectResult(errors);
            }

            try
            {
                var rate = await service.PostRating(rating);
                return Ok(rate);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };
            }
        }
        [HttpGet("average/{packageId}")]
        public async Task<ActionResult<decimal>> GetAverageRating(int packageId)
        {
            decimal averageRating = await service.GetAverageRating(packageId);

            return Ok(averageRating);
        }

    }
}
